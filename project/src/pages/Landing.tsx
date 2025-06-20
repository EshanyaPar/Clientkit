import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Clock, Shield, Users } from 'lucide-react';
import { Button } from '../components/UI/Button';

export const Landing = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'One Link, Everything',
      description: 'Replace multiple tools with a single onboarding link that handles brief collection, file uploads, contracts, and payments.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Save Hours per Client',
      description: 'Automate your entire client onboarding process and focus on what you do best - delivering amazing work.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Professional & Secure',
      description: 'Branded experience with e-signatures and secure payment processing that builds trust with your clients.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Client-Friendly',
      description: 'Your clients get a smooth, guided experience without needing to create accounts or navigate complex forms.',
    },
  ];

  const benefits = [
    'Collect detailed project briefs with custom questions',
    'Secure file upload and management',
    'Digital contract signing',
    'Integrated payment processing',
    'Automated client communication',
    'Project status tracking',
    'Testimonial collection',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6 animate-fade-in">
              Streamline Your{' '}
              <span className="text-primary-500">Client Onboarding</span>
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto animate-slide-up">
              Replace Google Forms, Stripe, and DocuSign with one elegant link. 
              Get paid faster, look more professional, and save hours on every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              ClientKit replaces multiple tools with a single, elegant solution designed specifically for freelancers and agencies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-secondary-50 dark:bg-secondary-800 hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 bg-primary-500 text-white rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Stop Juggling Multiple Tools
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                ClientKit combines all the essential tools you need for client onboarding into one seamless experience. 
                Your clients will love the professional touch, and you'll love the time you save.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl p-8 animate-scale-in">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-6">
                <h3 className="text-xl font-bold mb-2">Your Custom Link</h3>
                <p className="text-primary-100">clientkit.com/onboard/your-project</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                  <span className="text-secondary-700 dark:text-secondary-300">Project Brief</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                  <span className="text-secondary-700 dark:text-secondary-300">File Upload</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                  <span className="text-secondary-700 dark:text-secondary-300">Contract Signed</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <span className="text-secondary-700 dark:text-secondary-300">Payment Complete</span>
                  <div className="h-5 w-5 bg-primary-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Client Onboarding?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and agencies who've streamlined their workflow with ClientKit.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};