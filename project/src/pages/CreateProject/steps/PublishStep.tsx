import React, { useEffect } from 'react';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/UI/Button';

interface PublishStepProps {
  data: {
    name: string;
    description: string;
    briefQuestions: any[];
    paymentEnabled: boolean;
    paymentAmount?: number;
    contractFile?: string;
  };
  updateData: (data: any) => void;
  onValidChange: (valid: boolean) => void;
}

export const PublishStep = ({ data, onValidChange }: PublishStepProps) => {
  const publicLink = `https://clientkit.com/onboard/${Math.random().toString(36).substr(2, 8)}`;

  useEffect(() => {
    onValidChange(true);
  }, [onValidChange]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          Ready to Publish
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Review your project settings and publish to generate your client onboarding link.
        </p>
      </div>

      {/* Project Summary */}
      <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Project Summary
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-secondary-900 dark:text-white">
                {data.name}
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm mt-1">
                {data.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-secondary-200 dark:border-secondary-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">
                {data.briefQuestions.length}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Brief Questions
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">
                {data.contractFile ? '✓' : '—'}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Contract
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">
                {data.paymentEnabled ? `$${data.paymentAmount?.toLocaleString()}` : '—'}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Payment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Experience Preview */}
      <div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Client Experience
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <span className="text-secondary-700 dark:text-secondary-300">
              Complete project brief ({data.briefQuestions.length} questions)
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="text-secondary-700 dark:text-secondary-300">
              Upload project files and assets
            </span>
          </div>
          
          {data.contractFile && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-secondary-700 dark:text-secondary-300">
                Review and sign contract
              </span>
            </div>
          )}
          
          {data.paymentEnabled && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {data.contractFile ? '4' : '3'}
              </div>
              <span className="text-secondary-700 dark:text-secondary-300">
                Complete payment (${data.paymentAmount?.toLocaleString()})
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-secondary-700 dark:text-secondary-300">
              Project kickoff & confirmation
            </span>
          </div>
        </div>
      </div>

      {/* Public Link Preview */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">
          Your Public Onboarding Link
        </h3>
        <p className="text-primary-100 mb-4">
          Share this link with your clients to start the onboarding process
        </p>
        
        <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
          <code className="text-primary-100 break-all">
            {publicLink}
          </code>
          <div className="flex space-x-2 ml-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={copyLink}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open('/onboard/demo', '_blank')}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};