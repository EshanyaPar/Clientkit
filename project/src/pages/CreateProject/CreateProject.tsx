import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { BriefQuestionsStep } from './steps/BriefQuestionsStep';
import { ContractPaymentStep } from './steps/ContractPaymentStep';
import { PublishStep } from './steps/PublishStep';
import { useProjects } from '../../hooks/useProjects';
import { Project, BriefQuestion } from '../../types';

interface ProjectData {
  name: string;
  description: string;
  briefQuestions: BriefQuestion[];
  contractFile?: string;
  paymentEnabled: boolean;
  paymentAmount?: number;
  paymentTiming: 'now' | 'after';
}

const steps = [
  { id: 1, name: 'Project Details', component: ProjectDetailsStep },
  { id: 2, name: 'Brief Questions', component: BriefQuestionsStep },
  { id: 3, name: 'Contract & Payment', component: ContractPaymentStep },
  { id: 4, name: 'Publish', component: PublishStep },
];

export const CreateProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    briefQuestions: [],
    paymentEnabled: false,
    paymentTiming: 'after',
  });
  const [isValid, setIsValid] = useState(false);
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const updateProjectData = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    const project: Project = {
      id: Math.random().toString(36).substr(2, 9),
      ...projectData,
      status: 'published',
      publicLink: `https://clientkit.com/onboard/${Math.random().toString(36).substr(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    addProject(project);
    navigate('/dashboard');
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Create New Project
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Set up your client onboarding experience in 4 simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    currentStep > step.id
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : currentStep === step.id
                      ? 'border-primary-500 text-primary-500 bg-white dark:bg-secondary-800'
                      : 'border-secondary-300 dark:border-secondary-600 text-secondary-400 bg-white dark:bg-secondary-800'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    currentStep >= step.id
                      ? 'text-secondary-900 dark:text-white'
                      : 'text-secondary-400 dark:text-secondary-500'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-16 lg:w-24 transition-colors ${
                      currentStep > step.id
                        ? 'bg-primary-500'
                        : 'bg-secondary-300 dark:bg-secondary-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700 p-8 animate-fade-in">
          <CurrentStepComponent
            data={projectData}
            updateData={updateProjectData}
            onValidChange={setIsValid}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={!isValid}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handlePublish}
              disabled={!isValid}
            >
              Publish Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};