import React, { useEffect, useState } from 'react';
import { Upload, DollarSign } from 'lucide-react';
import { Button } from '../../../components/UI/Button';
import { Input } from '../../../components/UI/Input';

interface ContractPaymentStepProps {
  data: {
    contractFile?: string;
    paymentEnabled: boolean;
    paymentAmount?: number;
    paymentTiming: 'now' | 'after';
  };
  updateData: (data: any) => void;
  onValidChange: (valid: boolean) => void;
}

export const ContractPaymentStep = ({ data, updateData, onValidChange }: ContractPaymentStepProps) => {
  const [contractFile, setContractFile] = useState(data.contractFile || '');
  const [paymentEnabled, setPaymentEnabled] = useState(data.paymentEnabled);
  const [paymentAmount, setPaymentAmount] = useState(data.paymentAmount?.toString() || '');
  const [paymentTiming, setPaymentTiming] = useState(data.paymentTiming);

  useEffect(() => {
    // Step is always valid - contract and payment are optional
    onValidChange(true);
  }, [onValidChange]);

  useEffect(() => {
    updateData({
      contractFile: contractFile || undefined,
      paymentEnabled,
      paymentAmount: paymentEnabled && paymentAmount ? parseFloat(paymentAmount) : undefined,
      paymentTiming,
    });
  }, [contractFile, paymentEnabled, paymentAmount, paymentTiming, updateData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to a service like UploadThing or Cloudinary
      // For demo purposes, we'll just store the filename
      setContractFile(file.name);
    }
  };

  const handlePaymentToggle = (enabled: boolean) => {
    setPaymentEnabled(enabled);
    if (!enabled) {
      setPaymentAmount('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          Contract & Payment
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Optionally upload a contract and set up payment collection.
        </p>
      </div>

      {/* Contract Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
          Contract Upload (Optional)
        </h3>
        
        {contractFile ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Contract uploaded: {contractFile}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your clients will be able to review and sign this contract during onboarding.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setContractFile('')}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              Upload Contract
            </h4>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Upload a PDF contract that clients will sign during onboarding
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="contract-upload"
            />
            <label htmlFor="contract-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>
        )}
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
          Payment Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handlePaymentToggle(false)}
              className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                !paymentEnabled
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
              }`}
            >
              <div className="text-left">
                <div className="font-medium text-secondary-900 dark:text-white">
                  No Payment
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Skip payment collection
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePaymentToggle(true)}
              className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                paymentEnabled
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
              }`}
            >
              <DollarSign className="h-5 w-5 text-primary-500 mr-3" />
              <div className="text-left">
                <div className="font-medium text-secondary-900 dark:text-white">
                  Collect Payment
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Set up Stripe payment
                </div>
              </div>
            </button>
          </div>

          {paymentEnabled && (
            <div className="space-y-4 p-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
              <Input
                label="Payment Amount ($)"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Payment Timing
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentTiming"
                      value="now"
                      checked={paymentTiming === 'now'}
                      onChange={(e) => setPaymentTiming(e.target.value as 'now' | 'after')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-secondary-700 dark:text-secondary-300">
                      Pay Now - Collect payment immediately during onboarding
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentTiming"
                      value="after"
                      checked={paymentTiming === 'after'}
                      onChange={(e) => setPaymentTiming(e.target.value as 'now' | 'after')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-secondary-700 dark:text-secondary-300">
                      Pay After Brief - Show payment option after brief completion
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
        <h3 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
          💳 Payment Integration
        </h3>
        <p className="text-sm text-primary-700 dark:text-primary-300">
          In a production app, you'd connect your Stripe account here to process payments securely. 
          For this demo, payment flows are simulated.
        </p>
      </div>
    </div>
  );
};