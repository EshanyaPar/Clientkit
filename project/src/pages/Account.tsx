import React from 'react';
import { User, Mail, Calendar, Settings } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useAuth } from '../contexts/AuthContext';

export const Account = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Account Settings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  Profile Information
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Update your personal details
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Input
                label="Full Name"
                value={user.name}
                startIcon={<User className="h-4 w-4" />}
              />
              
              <Input
                label="Email Address"
                type="email"
                value={user.email}
                startIcon={<Mail className="h-4 w-4" />}
              />
              
              <Input
                label="Member Since"
                value={new Date(user.createdAt).toLocaleDateString()}
                startIcon={<Calendar className="h-4 w-4" />}
                disabled
              />

              <div className="flex space-x-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold text-secondary-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Billing Settings
              </Button>
            </div>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-2xl p-6">
            <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
              Get in touch with our support team for assistance with your account.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};