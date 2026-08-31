import React, { useState, useEffect, useRef } from 'react';
import { 
  HardDrive, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Star, 
  ExternalLink, 
  Download, 
  Trash2, 
  FolderPlus, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Grid, 
  List, 
  Layers, 
  Sparkles,
  ShieldCheck,
  FileCheck,
  UserCheck,
  LogOut,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logoutFromGoogle, 
  getAccessToken 
} from '../../services/firebaseAuth';
import { 
  fetchDriveFiles, 
  fetchDriveAbout, 
  uploadFileToDrive, 
  createDriveFolder, 
  exportValetReceiptToDrive, 
  deleteDriveFile, 
  toggleStarDriveFile, 
  formatBytes,
  DriveFileItem, 
  DriveAboutInfo 
} from '../../services/googleDriveService';
import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../ui/Modal';
import { PrimaryButton, SecondaryButton } from '../ui/Buttons';

export interface ScreenGoogleDriveProps {
  onNavigate?: (screen: any) => void;
}

export const ScreenGoogleDrive: React.FC<ScreenGoogleDriveProps> = ({ onNavigate }) => {
  const { notify } = useNotifications();

  // Auth States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(true);

  // Drive Data States
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [aboutInfo, setAboutInfo] = useState<DriveAboutInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // UI / Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'folders' | 'receipts' | 'photos' | 'starred'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Action States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // File Upload State
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Destructive Delete Confirmation Modal State (MANDATORY REQUIREMENT)
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Quick Receipt Export State
  const [isExportingReceipt, setIsExportingReceipt] = useState(false);

  // Initialize Auth on component mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          setAccessToken(token);
          setNeedsAuth(false);
        } else {
          // Firebase authenticated, but needs Google OAuth token
          setNeedsAuth(true);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch Drive Files when token or filter changes
  useEffect(() => {
    if (accessToken) {
      loadDriveData(accessToken, activeFilter, searchQuery);
    }
  }, [accessToken, activeFilter]);

  const loadDriveData = async (token: string, filter: typeof activeFilter, query: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Fetch files & storage quota in parallel
      const [filesRes, aboutRes] = await Promise.allSettled([
        fetchDriveFiles(token, { filterType: filter, query }),
        fetchDriveAbout(token)
      ]);

      if (filesRes.status === 'fulfilled') {
        setFiles(filesRes.value.files || []);
      } else {
        throw new Error(filesRes.reason?.message || 'Could not fetch Google Drive files.');
      }

      if (aboutRes.status === 'fulfilled') {
        setAboutInfo(aboutRes.value);
      }
    } catch (err: any) {
      console.error('Drive loading error:', err);
      setErrorMessage(err.message || 'Error communicating with Google Drive API.');
      notify({
        category: 'system',
        title: 'Google Drive Connection',
        message: err.message || 'Failed to sync files with Google Drive.',
        priority: 'urgent'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setCurrentUser(authResult.user);
        setAccessToken(authResult.accessToken);
        setNeedsAuth(false);
        notify({
          category: 'success',
          title: 'Google Drive Connected',
          message: `Connected as ${authResult.user.displayName || authResult.user.email}. Drive archive synced.`,
          priority: 'normal'
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Failed to authenticate with Google.');
      notify({
        category: 'system',
        title: 'Sign-in Failed',
        message: 'Could not complete Google authentication.',
        priority: 'urgent'
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  // Google Sign-Out Handler
  const handleSignOut = async () => {
    await logoutFromGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setFiles([]);
    setAboutInfo(null);
    setNeedsAuth(true);
    notify({
      category: 'info',
      title: 'Google Disconnected',
      message: 'You have signed out of Google Drive.',
      priority: 'normal'
    });
  };

  // Search Handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadDriveData(accessToken, activeFilter, searchQuery);
    }
  };

  // File Upload Handler
  const handleFileUpload = async () => {
    if (!selectedUploadFile || !accessToken) return;
    setIsUploading(true);
    try {
      const uploadedItem = await uploadFileToDrive(accessToken, selectedUploadFile);
      setIsUploadModalOpen(false);
      setSelectedUploadFile(null);
      notify({
        category: 'success',
        title: 'File Uploaded to Drive',
        message: `"${uploadedItem.name}" was successfully stored in your Google Drive.`,
        priority: 'normal'
      });
      loadDriveData(accessToken, activeFilter, searchQuery);
    } catch (err: any) {
      notify({
        category: 'system',
        title: 'Upload Error',
        message: err.message || 'Could not upload file to Google Drive.',
        priority: 'urgent'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Create Folder Handler
  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !accessToken) return;
    setIsCreatingFolder(true);
    try {
      const folder = await createDriveFolder(accessToken, newFolderName.trim());
      setIsCreateFolderModalOpen(false);
      setNewFolderName('');
      notify({
        category: 'success',
        title: 'Valet Folder Created',
        message: `Folder "${folder.name}" created in Google Drive.`,
        priority: 'normal'
      });
      loadDriveData(accessToken, activeFilter, searchQuery);
    } catch (err: any) {
      notify({
        category: 'system',
        title: 'Folder Creation Failed',
        message: err.message || 'Could not create folder in Google Drive.',
        priority: 'urgent'
      });
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Export Sample Valet Receipt to Drive
  const handleExportSampleReceipt = async () => {
    if (!accessToken) return;
    setIsExportingReceipt(true);
    try {
      const orderId = `MB-${Math.floor(10000 + Math.random() * 90000)}`;
      const receipt = await exportValetReceiptToDrive(accessToken, {
        orderId,
        serviceTitle: 'Bespoke Garment & Silk Tuxedo Valet',
        clientName: currentUser?.displayName || 'Imperial Valet Guest',
        scheduledTime: 'Today, 04:30 PM - 05:30 PM',
        totalAmount: '$145.00'
      });
      notify({
        category: 'payment_update',
        title: 'Receipt Archived to Drive',
        message: `Created "${receipt.name}" in Google Drive with white-glove certificate.`,
        priority: 'normal'
      });
      loadDriveData(accessToken, activeFilter, searchQuery);
    } catch (err: any) {
      notify({
        category: 'system',
        title: 'Export Error',
        message: err.message || 'Failed to archive receipt to Google Drive.',
        priority: 'urgent'
      });
    } finally {
      setIsExportingReceipt(false);
    }
  };

  // Toggle Star Status Handler
  const handleToggleStar = async (file: DriveFileItem) => {
    if (!accessToken) return;
    const nextState = !file.starred;
    try {
      await toggleStarDriveFile(accessToken, file.id, nextState);
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, starred: nextState } : f));
      notify({
        category: 'info',
        title: nextState ? 'File Starred' : 'File Unstarred',
        message: `"${file.name}" was ${nextState ? 'added to' : 'removed from'} Starred files.`,
        priority: 'normal'
      });
    } catch (err: any) {
      notify({
        category: 'system',
        title: 'Star Update Failed',
        message: err.message || 'Could not update star status.',
        priority: 'urgent'
      });
    }
  };

  // Confirmed Delete Operation (MANDATORY REQUIREMENT with accessible modal)
  const handleConfirmDelete = async () => {
    if (!fileToDelete || !accessToken) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, fileToDelete.id);
      const deletedName = fileToDelete.name;
      setFiles(prev => prev.filter(f => f.id !== fileToDelete.id));
      setFileToDelete(null);
      notify({
        category: 'success',
        title: 'File Deleted from Drive',
        message: `"${deletedName}" was removed from your Google Drive.`,
        priority: 'normal'
      });
    } catch (err: any) {
      notify({
        category: 'system',
        title: 'Deletion Failed',
        message: err.message || 'Could not delete file from Google Drive.',
        priority: 'urgent'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Helpers to render file type icons
  const getFileIcon = (mimeType: string, isFolder: boolean) => {
    if (isFolder || mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-amber-500 flex-shrink-0" />;
    }
    if (mimeType.includes('image')) {
      return <ImageIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />;
    }
    if (mimeType.includes('pdf') || mimeType.includes('html') || mimeType.includes('text')) {
      return <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
    }
    return <HardDrive className="w-5 h-5 text-[#00444D] dark:text-[#ABEDFA] flex-shrink-0" />;
  };

  // Calculate storage usage percentage
  const usageBytes = aboutInfo?.storageQuota?.usage ? parseInt(aboutInfo.storageQuota.usage, 10) : 0;
  const limitBytes = aboutInfo?.storageQuota?.limit ? parseInt(aboutInfo.storageQuota.limit, 10) : 0;
  const usagePercent = limitBytes > 0 ? Math.min(100, Math.round((usageBytes / limitBytes) * 100)) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00363D] via-[#00444D] to-[#0D5D68] text-white p-6 sm:p-8 shadow-md border border-[#CCA730]/40">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#CCA730]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[#FFE088] text-xs font-bold uppercase tracking-wider">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Google Drive Cloud Archive</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Mr. Butler Valet Vault & Documents
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Securely store, organize, and access garment inspection reports, bespoke certificates, order receipts, and customer documents synced live with your Google Drive.
            </p>
          </div>

          {/* Account Status Badge / Sign-in CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {currentUser && accessToken ? (
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'Google User'} 
                    className="w-10 h-10 rounded-full border-2 border-[#FFE088]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#00444D] text-[#FFE088] font-bold flex items-center justify-center border border-[#FFE088]">
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span>{currentUser.displayName || 'Authenticated User'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFE088]" />
                  </div>
                  <span className="text-[11px] text-slate-300 block truncate max-w-[160px]">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Disconnect Google Drive"
                  className="ml-2 p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-200 hover:text-rose-200 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Official Sign in with Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="gsi-material-button inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] border border-slate-200 cursor-pointer disabled:opacity-60"
                >
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span>{isSigningIn ? 'Connecting to Google Drive...' : 'Sign in with Google'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Storage Quota & Connectivity Summary Widget (When connected) */}
      {accessToken && aboutInfo?.storageQuota && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Drive Quota Used</span>
              <div className="text-xl font-bold font-mono text-[#00444D] dark:text-[#ABEDFA] mt-0.5">
                {formatBytes(aboutInfo.storageQuota.usage)}
              </div>
              <span className="text-[11px] text-slate-500">
                {aboutInfo.storageQuota.limit ? `of ${formatBytes(aboutInfo.storageQuota.limit)} total` : 'Google One Plan'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-[#00444D] dark:text-[#ABEDFA] flex items-center justify-center font-bold font-mono text-xs">
              {usagePercent}%
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Files In Active View</span>
              <div className="text-xl font-bold font-mono text-[#00444D] dark:text-white mt-0.5">
                {files.length} Items
              </div>
              <span className="text-[11px] text-slate-500">
                Sorted by most recently modified
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#CCA730] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Valet Vault Sync</span>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
                <span>Live REST v3</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Full OAuth Token Authorization
              </span>
            </div>
            <button
              onClick={() => loadDriveData(accessToken, activeFilter, searchQuery)}
              disabled={isLoading}
              title="Refresh Google Drive files"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#00444D] dark:text-white transition cursor-pointer"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Main Drive Controls & Content Area */}
      {needsAuth || !accessToken ? (
        <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#EFF4FF] dark:bg-slate-800 text-[#00444D] dark:text-[#ABEDFA] mx-auto flex items-center justify-center">
            <HardDrive className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#00444D] dark:text-white">
              Connect Your Google Drive Account
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Sign in with your Google account to grant Mr. Butler permission to store receipts, care certificates, and garment inspection documents directly in your Google Drive.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="gsi-material-button inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-[#00444D] hover:bg-[#0D5D68] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <div className="w-5 h-5 flex-shrink-0 bg-white rounded-full p-0.5">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span>{isSigningIn ? 'Opening Google Auth...' : 'Authorize Google Drive Access'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Action Toolbar: Search, Filters & Action CTAs */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files by name in Google Drive..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00444D]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      if (accessToken) loadDriveData(accessToken, activeFilter, '');
                    }}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Action Buttons: Upload, New Folder, Generate Receipt, Grid/List view */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#00444D] hover:bg-[#0D5D68] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>

                <button
                  onClick={() => setIsCreateFolderModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-amber-500" />
                  <span>New Folder</span>
                </button>

                <button
                  onClick={handleExportSampleReceipt}
                  disabled={isExportingReceipt}
                  className="px-3.5 py-2 rounded-xl bg-[#FFE088] hover:bg-[#F2D479] text-[#241A00] text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isExportingReceipt ? 'Archiving...' : 'Archive Valet Receipt'}</span>
                </button>

                {/* View Switcher */}
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 p-0.5 ml-auto sm:ml-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid View"
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-slate-750 text-[#00444D] dark:text-[#ABEDFA] shadow-xs'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-slate-750 text-[#00444D] dark:text-[#ABEDFA] shadow-xs'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {[
                { id: 'all', label: 'All Files', icon: Layers },
                { id: 'receipts', label: 'Receipts & Documents', icon: FileText },
                { id: 'photos', label: 'Inspection Photos', icon: ImageIcon },
                { id: 'folders', label: 'Folders', icon: Folder },
                { id: 'starred', label: 'Starred', icon: Star },
              ].map((chip) => {
                const Icon = chip.icon;
                const isActive = activeFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveFilter(chip.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      isActive
                        ? 'bg-[#00444D] text-[#FFE088] shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Files Grid / List View */}
          {isLoading ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <RefreshCw className="w-8 h-8 text-[#00444D] dark:text-[#FFE088] animate-spin mx-auto" />
              <h4 className="font-bold text-sm text-[#00444D] dark:text-white">Querying Google Drive API v3...</h4>
              <p className="text-xs text-slate-400">Retrieving metadata and file records from your Google Cloud repository.</p>
            </div>
          ) : errorMessage ? (
            <div className="p-8 text-center rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3 text-rose-800 dark:text-rose-300">
              <AlertTriangle className="w-8 h-8 mx-auto text-rose-600 dark:text-rose-400" />
              <h4 className="font-bold text-sm">Google Drive Request Error</h4>
              <p className="text-xs max-w-md mx-auto">{errorMessage}</p>
              <button
                onClick={() => accessToken && loadDriveData(accessToken, activeFilter, searchQuery)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : files.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Folder className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-[#00444D] dark:text-white">No files found matching criteria</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {searchQuery ? `No files match "${searchQuery}".` : 'Your Google Drive has no items in this filter view.'}
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#00444D] text-white text-xs font-bold hover:bg-[#0D5D68] transition cursor-pointer"
                >
                  Upload a File
                </button>
                <button
                  onClick={handleExportSampleReceipt}
                  className="px-4 py-2 rounded-xl bg-[#FFE088] text-[#241A00] text-xs font-bold hover:bg-[#F2D479] transition cursor-pointer"
                >
                  Archive Sample Receipt
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((file) => {
                const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                return (
                  <div
                    key={file.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#00444D] hover:shadow-sm transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Icon + Star button */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {getFileIcon(file.mimeType, isFolder)}
                        </div>
                        <button
                          onClick={() => handleToggleStar(file)}
                          title={file.starred ? 'Unstar file' : 'Star file'}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            file.starred
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${file.starred ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>

                      {/* File Name & Type */}
                      <h4 
                        title={file.name}
                        className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate mt-1"
                      >
                        {file.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {isFolder ? 'Folder' : formatBytes(file.size)} • {new Date(file.modifiedTime).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Bottom Action Tray */}
                    <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-1">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[#00444D] dark:text-[#ABEDFA] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {file.webContentLink && (
                          <a
                            href={file.webContentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[#00444D] dark:text-[#ABEDFA] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Download File"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Explicit User Confirmation required before destructive delete */}
                      <button
                        onClick={() => setFileToDelete(file)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                        title="Delete File from Google Drive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Layout */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-850 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Last Modified</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {files.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      return (
                        <tr key={file.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.mimeType, isFolder)}
                              <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
                                {file.name}
                              </span>
                              {file.starred && <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400">
                            {isFolder ? 'Folder' : formatBytes(file.size)}
                          </td>
                          <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                            {new Date(file.modifiedTime).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-[#00444D] dark:text-[#ABEDFA] hover:bg-slate-100 dark:hover:bg-slate-800"
                                  title="Open in Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => handleToggleStar(file)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                title="Star file"
                              >
                                <Star className={`w-3.5 h-3.5 ${file.starred ? 'fill-amber-500 text-amber-500' : ''}`} />
                              </button>
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                                title="Delete file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
       * MODAL 1: Upload File Modal
       * ------------------------------------------------------------- */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setSelectedUploadFile(null);
        }}
        title="Upload File to Google Drive"
        subtitle="Store documents, care invoices, or garment photographs directly in your Drive"
        footer={
          <>
            <SecondaryButton 
              onClick={() => {
                setIsUploadModalOpen(false);
                setSelectedUploadFile(null);
              }}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              disabled={!selectedUploadFile || isUploading}
              isLoading={isUploading}
              onClick={handleFileUpload}
            >
              Upload to Drive
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedUploadFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#00444D] dark:hover:border-[#ABEDFA] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-850/50 space-y-2"
          >
            <Upload className="w-8 h-8 text-[#00444D] dark:text-[#ABEDFA] mx-auto" />
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {selectedUploadFile ? selectedUploadFile.name : 'Click to select a file from your device'}
            </div>
            <p className="text-[11px] text-slate-400">
              {selectedUploadFile 
                ? `${formatBytes(selectedUploadFile.size)} • Ready to upload`
                : 'Supports PDF receipts, garment photos, documents, and spreadsheets.'}
            </p>
          </div>
        </div>
      </Modal>

      {/* -------------------------------------------------------------
       * MODAL 2: Create Folder Modal
       * ------------------------------------------------------------- */}
      <Modal
        isOpen={isCreateFolderModalOpen}
        onClose={() => {
          setIsCreateFolderModalOpen(false);
          setNewFolderName('');
        }}
        title="Create New Valet Folder"
        subtitle="Organize your customer files and archives in Google Drive"
        footer={
          <>
            <SecondaryButton onClick={() => setIsCreateFolderModalOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              disabled={!newFolderName.trim() || isCreatingFolder}
              isLoading={isCreatingFolder}
              onClick={handleCreateFolder}
            >
              Create Folder
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            Folder Name
          </label>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="e.g. Mr Butler Valet Invoices 2026"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#00444D]"
            autoFocus
          />
        </div>
      </Modal>

      {/* -------------------------------------------------------------
       * MODAL 3: MANDATORY USER CONFIRMATION FOR DESTRUCTIVE DELETE
       * (Mandatory guideline: clear dialog with item description and explicit confirmation)
       * ------------------------------------------------------------- */}
      <Modal
        isOpen={!!fileToDelete}
        onClose={() => setFileToDelete(null)}
        title="Confirm Deletion from Google Drive"
        subtitle="This action will permanently delete this item from your Google Drive account."
        footer={
          <>
            <SecondaryButton onClick={() => setFileToDelete(null)} disabled={isDeleting}>
              Cancel
            </SecondaryButton>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete from Drive'}
            </button>
          </>
        }
      >
        {fileToDelete && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900 dark:text-rose-200 space-y-1">
                <span className="font-bold block">Are you sure you want to delete this file?</span>
                <p>
                  You are about to delete <strong className="font-mono">{fileToDelete.name}</strong> ({formatBytes(fileToDelete.size)}) from your connected Google Drive account.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
