'use client';

import { Button } from '@/components/ui/button';

export function ChangePassword() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="current-password">
              Current password
            </label>
            <button className="text-xs text-primary font-bold hover:underline mb-1">Forgot password?</button>
          </div>
          <input 
            id="current-password"
            type="password" 
            placeholder="Enter current password" 
            className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" 
          />
        </div>
      </div>

      <div className="h-px bg-border/50 w-full" />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="new-password">
            New password
          </label>
          <input 
            id="new-password"
            type="password" 
            placeholder="Enter new password" 
            className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirm-password">
            Confirm password
          </label>
          <input 
            id="confirm-password"
            type="password" 
            placeholder="Confirm new password" 
            className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" 
          />
          <p className="text-[10px] text-muted-foreground mt-2 px-1">
            Passwords must be at least 8 characters long and include numbers or special characters.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <button className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-lg text-base font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 mt-4">
          Update Password
        </button>
      </div>
    </div>
  );
}
