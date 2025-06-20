import { useState, useEffect } from 'react';
import { Project, ClientSubmission } from '../types';

// Mock data for demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign for TechCorp',
    description: 'Complete website overhaul with modern design',
    briefQuestions: [
      {
        id: '1',
        question: 'What is your current website URL?',
        type: 'text',
        required: true,
      },
      {
        id: '2',
        question: 'What are your main business goals?',
        type: 'textarea',
        required: true,
      },
      {
        id: '3',
        question: 'What style do you prefer?',
        type: 'select',
        options: ['Modern', 'Classic', 'Minimalist', 'Bold'],
        required: true,
      },
    ],
    paymentEnabled: true,
    paymentAmount: 2500,
    paymentTiming: 'after',
    status: 'published',
    publicLink: 'https://clientkit.com/onboard/abc123',
    createdAt: '2024-01-15T10:00:00Z',
    submissions: [
      {
        id: '1',
        projectId: '1',
        clientName: 'John Doe',
        clientEmail: 'john@techcorp.com',
        briefAnswers: {
          '1': 'https://techcorp.com',
          '2': 'Increase conversions and improve user experience',
          '3': 'Modern',
        },
        uploadedFiles: [],
        contractSigned: true,
        paymentCompleted: true,
        status: 'completed',
        createdAt: '2024-01-16T14:00:00Z',
        testimonial: {
          id: '1',
          rating: 5,
          text: 'Excellent work! The new website exceeded our expectations.',
          clientName: 'John Doe',
          createdAt: '2024-01-20T16:00:00Z',
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Brand Identity for StartupXYZ',
    description: 'Logo design and brand guidelines',
    briefQuestions: [
      {
        id: '1',
        question: 'Describe your company in one sentence',
        type: 'textarea',
        required: true,
      },
      {
        id: '2',
        question: 'What colors do you like?',
        type: 'multiselect',
        options: ['Blue', 'Green', 'Red', 'Purple', 'Orange', 'Black', 'White'],
        required: false,
      },
    ],
    paymentEnabled: true,
    paymentAmount: 1500,
    paymentTiming: 'now',
    status: 'published',
    publicLink: 'https://clientkit.com/onboard/xyz789',
    createdAt: '2024-01-18T09:30:00Z',
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const savedProjects = localStorage.getItem('clientkit_projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        setProjects(mockProjects);
        localStorage.setItem('clientkit_projects', JSON.stringify(mockProjects));
      }
      setLoading(false);
    }, 500);
  }, []);

  const addProject = (project: Project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem('clientkit_projects', JSON.stringify(updatedProjects));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    setProjects(updatedProjects);
    localStorage.setItem('clientkit_projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('clientkit_projects', JSON.stringify(updatedProjects));
  };

  const getProject = (id: string) => {
    return projects.find(p => p.id === id);
  };

  const getProjectByPublicId = (publicId: string) => {
    return projects.find(p => p.publicLink.includes(publicId));
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    getProjectByPublicId,
  };
};