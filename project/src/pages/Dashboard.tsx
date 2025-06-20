import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink, Copy, Trash2, Star, Eye, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
  const { projects, loading, deleteProject } = useProjects();
  const { user } = useAuth();

  const getStatusIcon = (status: string, hasSubmissions: boolean) => {
    if (!hasSubmissions) {
      return <Clock className="h-4 w-4 text-secondary-400" />;
    }
    
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paid':
        return <DollarSign className="h-4 w-4 text-primary-500" />;
      case 'contract_signed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'brief_completed':
        return <Eye className="h-4 w-4 text-accent-500" />;
      default:
        return <Clock className="h-4 w-4 text-secondary-400" />;
    }
  };

  const getStatusText = (status: string, hasSubmissions: boolean) => {
    if (!hasSubmissions) return 'No submissions';
    
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'paid':
        return 'Paid';
      case 'contract_signed':
        return 'Contract Signed';
      case 'brief_completed':
        return 'Brief Completed';
      case 'brief_pending':
        return 'Brief Pending';
      default:
        return 'Pending';
    }
  };

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-secondary-100 dark:bg-secondary-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Manage your client onboarding projects
          </p>
        </div>
        <Link to="/create-project">
          <Button size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Plus className="h-8 w-8 text-secondary-400" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
            No projects yet
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-md mx-auto">
            Create your first project to start onboarding clients with a beautiful, streamlined experience.
          </p>
          <Link to="/create-project">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const latestSubmission = project.submissions?.[0];
            const hasSubmissions = project.submissions && project.submissions.length > 0;
            const hasTestimonial = latestSubmission?.testimonial;

            return (
              <div
                key={project.id}
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700 p-6 hover:shadow-md transition-shadow animate-fade-in"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {getStatusIcon(latestSubmission?.status || '', hasSubmissions)}
                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                      {getStatusText(latestSubmission?.status || '', hasSubmissions)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">Questions:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {project.briefQuestions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">Payment:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {project.paymentEnabled ? `$${project.paymentAmount?.toLocaleString()}` : 'None'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">Submissions:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {project.submissions?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyLink(project.publicLink)}
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.publicLink.replace('https://clientkit.com', ''), '_blank')}
                      title="View public page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    {hasTestimonial && (
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Has testimonial"
                      >
                        <Star className="h-4 w-4 text-accent-500" />
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Delete project"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};