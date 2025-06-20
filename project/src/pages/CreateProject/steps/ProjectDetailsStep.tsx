import React, { useEffect, useState } from 'react';
import { Input } from '../../../components/UI/Input';

interface ProjectDetailsStepProps {
  data: {
    name: string;
    description: string;
  };
  updateData: (data: any) => void;
  onValidChange: (valid: boolean) => void;
}

export const ProjectDetailsStep = ({ data, updateData, onValidChange }: ProjectDetailsStepProps) => {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  useEffect(() => {
    const isValid = name.trim().length > 0 && description.trim().length > 0;
    onValidChange(isValid);
  }, [name, description, onValidChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    updateData({ name: value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    updateData({ description: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          Project Details
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Start by giving your project a name and description that will help you identify it later.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Project Name"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g., Website Redesign for TechCorp"
          required
        />

        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Project Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Brief description of what this project involves..."
            rows={4}
            className="block w-full rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 px-3 py-2 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors duration-200"
            required
          />
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
        <h3 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
          💡 Pro Tip
        </h3>
        <p className="text-sm text-primary-700 dark:text-primary-300">
          Choose a descriptive name that will help you quickly identify this project in your dashboard. 
          The description is for your reference and won't be shown to clients.
        </p>
      </div>
    </div>
  );
};