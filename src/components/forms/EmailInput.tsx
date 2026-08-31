import React from 'react';
import { Mail } from 'lucide-react';
import { TextInput, TextInputProps } from './TextInput';

export interface EmailInputProps extends Omit<TextInputProps, 'type' | 'leftIcon'> {
  icon?: React.ReactNode;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label = 'Email Address',
  placeholder = 'name@domain.com',
  autoComplete = 'email',
  icon = <Mail className="w-4 h-4" />,
  ...rest
}) => {
  return (
    <TextInput
      type="email"
      inputMode="email"
      label={label}
      placeholder={placeholder}
      autoComplete={autoComplete}
      leftIcon={icon}
      {...rest}
    />
  );
};
