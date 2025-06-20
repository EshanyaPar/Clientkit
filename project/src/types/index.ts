export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  briefQuestions: BriefQuestion[];
  contractFile?: string;
  paymentEnabled: boolean;
  paymentAmount?: number;
  paymentTiming: 'now' | 'after';
  status: 'draft' | 'published';
  publicLink: string;
  createdAt: string;
  submissions?: ClientSubmission[];
}

export interface BriefQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
}

export interface ClientSubmission {
  id: string;
  projectId: string;
  clientName: string;
  clientEmail: string;
  briefAnswers: Record<string, string | string[]>;
  uploadedFiles: UploadedFile[];
  contractSigned: boolean;
  paymentCompleted: boolean;
  status: 'brief_pending' | 'brief_completed' | 'contract_signed' | 'paid' | 'completed';
  createdAt: string;
  testimonial?: Testimonial;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
}

export interface Testimonial {
  id: string;
  rating: number;
  text: string;
  clientName: string;
  createdAt: string;
}