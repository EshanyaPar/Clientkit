import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Upload, FileText, CreditCard, Star } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useProjects } from '../hooks/useProjects';
import { Project, BriefQuestion, UploadedFile } from '../types';

export const ClientOnboarding = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectByPublicId } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [briefAnswers, setBriefAnswers] = useState<Record<string, string | string[]>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [contractSigned, setContractSigned] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    if (projectId) {
      // In a real app, this would fetch by the actual public ID
      // For demo, we'll use the first project
      const demoProject = getProjectByPublicId(projectId);
      if (demoProject) {
        setProject(demoProject);
      }
    }
  }, [projectId, getProjectByPublicId]);

  const handleBriefAnswer = (questionId: string, answer: string | string[]) => {
    setBriefAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!project) return false;
        const requiredQuestions = project.briefQuestions.filter(q => q.required);
        return requiredQuestions.every(q => briefAnswers[q.id]);
      case 2:
        return true; // File upload is optional
      case 3:
        return !project?.contractFile || contractSigned;
      case 4:
        return !project?.paymentEnabled || paymentCompleted;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentCompleted(true);
      nextStep();
    }, 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600 dark:text-secondary-400">Loading project...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Project Brief', icon: FileText },
    { id: 2, name: 'File Upload', icon: Upload },
    ...(project.contractFile ? [{ id: 3, name: 'Contract', icon: FileText }] : []),
    ...(project.paymentEnabled ? [{ id: project.contractFile ? 4 : 3, name: 'Payment', icon: CreditCard }] : []),
  ];

  const totalSteps = steps.length;

  if (currentStep > totalSteps) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8 animate-scale-in">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Welcome aboard!
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
              Thank you for completing the onboarding process for <strong>{project.name}</strong>. 
              We'll be in touch soon to get started on your project.
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
              <p className="text-sm text-primary-700 dark:text-primary-300">
                You'll receive a confirmation email shortly with next steps and project timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {project.name}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Complete the steps below to get started with your project
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? 'border-primary-500 text-primary-500 bg-white dark:bg-secondary-800'
                        : 'border-secondary-300 dark:border-secondary-600 text-secondary-400 bg-white dark:bg-secondary-800'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      isActive || isCompleted
                        ? 'text-secondary-900 dark:text-white'
                        : 'text-secondary-400 dark:text-secondary-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-16 lg:w-24 transition-colors ${
                        isCompleted
                          ? 'bg-green-500'
                          : 'bg-secondary-300 dark:bg-secondary-600'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700 p-8 animate-fade-in">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Project Brief
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Please answer the following questions to help us understand your project needs.
              </p>
              
              <div className="space-y-6">
                {project.briefQuestions.map((question: BriefQuestion) => (
                  <div key={question.id}>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {question.type === 'text' && (
                      <Input
                        value={(briefAnswers[question.id] as string) || ''}
                        onChange={(e) => handleBriefAnswer(question.id, e.target.value)}
                        required={question.required}
                      />
                    )}
                    
                    {question.type === 'textarea' && (
                      <textarea
                        value={(briefAnswers[question.id] as string) || ''}
                        onChange={(e) => handleBriefAnswer(question.id, e.target.value)}
                        rows={4}
                        className="block w-full rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 px-3 py-2 text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors duration-200"
                        required={question.required}
                      />
                    )}
                    
                    {question.type === 'select' && (
                      <select
                        value={(briefAnswers[question.id] as string) || ''}
                        onChange={(e) => handleBriefAnswer(question.id, e.target.value)}
                        className="block w-full rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 px-3 py-2 text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors duration-200"
                        required={question.required}
                      >
                        <option value="">Select an option...</option>
                        {question.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {question.type === 'multiselect' && (
                      <div className="space-y-2">
                        {question.options?.map((option, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={(briefAnswers[question.id] as string[] || []).includes(option)}
                              onChange={(e) => {
                                const currentAnswers = (briefAnswers[question.id] as string[]) || [];
                                if (e.target.checked) {
                                  handleBriefAnswer(question.id, [...currentAnswers, option]);
                                } else {
                                  handleBriefAnswer(question.id, currentAnswers.filter(a => a !== option));
                                }
                              }}
                              className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-secondary-700 dark:text-secondary-300">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                File Upload
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Upload any files, assets, or documents related to your project.
              </p>
              
              <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                  Upload Files
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-secondary-900 dark:text-white">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-secondary-900 dark:text-white">
                          {file.name}
                        </div>
                        <div className="text-sm text-secondary-600 dark:text-secondary-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {project.contractFile && currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Contract Review
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Please review and sign the contract to proceed with your project.
              </p>
              
              <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-primary-500" />
                  <div>
                    <div className="font-medium text-secondary-900 dark:text-white">
                      Project Contract
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                      {project.contractFile}
                    </div>
                  </div>
                </div>
                
                {!contractSigned ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agree-terms"
                        className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500"
                      />
                      <label htmlFor="agree-terms" className="text-sm text-secondary-700 dark:text-secondary-300">
                        I have read and agree to the terms of this contract
                      </label>
                    </div>
                    
                    <Button
                      onClick={() => setContractSigned(true)}
                      disabled={!clientName || !clientEmail}
                      className="w-full md:w-auto"
                    >
                      Sign Contract
                    </Button>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-800 dark:text-green-200">
                        Contract signed successfully
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {project.paymentEnabled && currentStep === (project.contractFile ? 4 : 3) && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Payment
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Complete your payment to finalize the project setup.
              </p>
              
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                <div className="text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    ${project.paymentAmount?.toLocaleString()}
                  </h3>
                  <p className="text-primary-100 mb-6">
                    Project: {project.name}
                  </p>
                  
                  {!paymentCompleted ? (
                    <Button
                      onClick={handlePayment}
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary-600 hover:bg-primary-50"
                    >
                      Pay with Stripe
                    </Button>
                  ) : (
                    <div className="bg-white/20 rounded-lg p-4">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">Payment completed successfully!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
            >
              {currentStep === totalSteps ? 'Complete' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};