export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  iconLink?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  starred?: boolean;
  trashed?: boolean;
  owners?: Array<{ displayName: string; emailAddress: string; photoLink?: string }>;
}

export interface DriveStorageQuota {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
}

export interface DriveAboutInfo {
  user?: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
  storageQuota?: DriveStorageQuota;
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3';

/**
 * Fetch Google Drive storage quota and user profile info
 */
export async function fetchDriveAbout(accessToken: string): Promise<DriveAboutInfo> {
  const res = await fetch(`${DRIVE_API_BASE}/about?fields=user,storageQuota`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error?.message || `Failed to fetch Drive about information: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Fetch files list from Google Drive
 */
export async function fetchDriveFiles(
  accessToken: string,
  options: {
    query?: string;
    folderId?: string;
    filterType?: 'all' | 'folders' | 'receipts' | 'photos' | 'starred';
    pageSize?: number;
  } = {}
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> {
  const { query, folderId, filterType = 'all', pageSize = 30 } = options;

  const queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (query && query.trim()) {
    const escaped = query.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  if (filterType === 'folders') {
    queryParts.push("mimeType = 'application/vnd.google-apps.folder'");
  } else if (filterType === 'receipts') {
    queryParts.push("(mimeType = 'application/pdf' or mimeType = 'text/plain' or mimeType = 'text/html' or name contains 'Receipt' or name contains 'Invoice' or name contains 'Butler')");
  } else if (filterType === 'photos') {
    queryParts.push("(mimeType contains 'image/')");
  } else if (filterType === 'starred') {
    queryParts.push('starred = true');
  }

  const q = queryParts.join(' and ');
  const fields = 'nextPageToken,files(id,name,mimeType,size,modifiedTime,iconLink,thumbnailLink,webViewLink,webContentLink,starred,trashed,owners)';
  const url = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error?.message || `Failed to list files from Google Drive: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Upload a raw file to Google Drive using multipart upload
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File,
  options: {
    folderId?: string;
    customName?: string;
    description?: string;
  } = {}
): Promise<DriveFileItem> {
  const metadata: any = {
    name: options.customName || file.name,
    mimeType: file.type || 'application/octet-stream',
    description: options.description || 'Uploaded via Mr. Butler Imperial Valet Platform',
  };

  if (options.folderId) {
    metadata.parents = [options.folderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileReader = new FileReader();
  const fileData = await new Promise<ArrayBuffer>((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });

  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' });
  const fileBlob = new Blob([fileData], { type: file.type || 'application/octet-stream' });

  const multipartBody = new Blob([
    delimiter,
    'Content-Type: application/json; charset=UTF-8\r\n\r\n',
    metadataBlob,
    delimiter,
    `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
    fileBlob,
    closeDelimiter,
  ]);

  const res = await fetch(`${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,size,modifiedTime,webViewLink,webContentLink`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Upload to Google Drive failed: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFileItem> {
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    description: 'Mr. Butler Valet Archive Directory',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch(`${DRIVE_API_BASE}/files?fields=id,name,mimeType,modifiedTime,webViewLink`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create folder in Google Drive: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Generate and save a Mr. Butler Valet Receipt & Garment Inspection Certificate to Drive
 */
export async function exportValetReceiptToDrive(
  accessToken: string,
  bookingDetails: {
    orderId: string;
    serviceTitle: string;
    clientName: string;
    scheduledTime: string;
    totalAmount: string;
    items?: Array<{ name: string; quantity: number; price: number }>;
  }
): Promise<DriveFileItem> {
  const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mr. Butler Imperial Valet - Receipt & Care Certificate</title>
  <style>
    body { font-family: 'Manrope', system-ui, -apple-system, sans-serif; background: #FAF9F6; color: #1e293b; padding: 40px; }
    .title, h1, h2 { font-family: 'Libre Caslon Text', Georgia, serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border: 1px solid #CCA730; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { text-align: center; border-bottom: 2px solid #00444D; padding-bottom: 20px; }
    .gold-badge { display: inline-block; background: #FFE088; color: #241A00; padding: 4px 12px; font-size: 11px; font-weight: bold; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; }
    .title { color: #00444D; font-size: 24px; margin: 12px 0 4px 0; }
    .order-tag { font-family: monospace; font-size: 14px; color: #CCA730; font-weight: bold; }
    .details { margin: 24px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13px; }
    .label { color: #64748b; }
    .value { font-weight: bold; color: #00444D; }
    .total-row { display: flex; justify-content: space-between; padding: 16px 0; font-size: 18px; font-weight: bold; color: #00444D; border-top: 2px solid #00444D; margin-top: 16px; }
    .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="gold-badge">Imperial White-Glove Care</span>
      <h1 class="title">MR. BUTLER VALET SERVICES</h1>
      <div class="order-tag">Booking Pass #${bookingDetails.orderId}</div>
    </div>
    <div class="details">
      <div class="row"><span class="label">Client:</span><span class="value">${bookingDetails.clientName}</span></div>
      <div class="row"><span class="label">Service Category:</span><span class="value">${bookingDetails.serviceTitle}</span></div>
      <div class="row"><span class="label">Valet Window:</span><span class="value">${bookingDetails.scheduledTime}</span></div>
      <div class="row"><span class="label">Inspection Guarantee:</span><span class="value">100% Master Garment SLA</span></div>
      <div class="row"><span class="label">Archive Date:</span><span class="value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
      
      <div class="total-row">
        <span>Total Settled</span>
        <span>${bookingDetails.totalAmount}</span>
      </div>
    </div>
    <div class="footer">
      This official care voucher has been archived directly to your Google Drive account by Mr. Butler Imperial Valet Concierge.<br>
      © 2026 Mr. Butler Valet. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;

  const fileName = `MrButler_Receipt_${bookingDetails.orderId}.html`;
  const fileBlob = new Blob([receiptHtml], { type: 'text/html' });
  const virtualFile = new File([fileBlob], fileName, { type: 'text/html' });

  return uploadFileToDrive(accessToken, virtualFile, {
    customName: fileName,
    description: `Official Mr. Butler Care Voucher & Booking Pass for ${bookingDetails.orderId}`
  });
}

/**
 * Delete a file from Google Drive (Mandatory user confirmation required prior to calling)
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to delete file from Google Drive: ${res.statusText}`);
  }
}

/**
 * Star / Unstar a file in Google Drive
 */
export async function toggleStarDriveFile(
  accessToken: string,
  fileId: string,
  starred: boolean
): Promise<DriveFileItem> {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}?fields=id,starred`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ starred }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to update star state: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Format bytes to readable string (e.g. 15.4 MB, 1.2 GB)
 */
export function formatBytes(bytes?: string | number, decimals = 1): string {
  if (!bytes) return '0 B';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(num) / Math.log(k));
  return parseFloat((num / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
