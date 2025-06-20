import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, startIcon, endIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-secondary-400 dark:text-secondary-500">
                {startIcon}
              </div>
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full rounded-lg border border-secondary-300 dark:border-secondary-600 
              bg-white dark:bg-secondary-800 px-3 py-2 text-secondary-900 dark:text-secondary-100
              placeholder-secondary-400 dark:placeholder-secondary-500
              focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none
              transition-colors duration-200
              ${startIcon ? 'pl-10' : ''}
              ${endIcon ? 'pr-10' : ''}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="text-secondary-400 dark:text-secondary-500">
                {endIcon}
              </div>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';