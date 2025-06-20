import React, { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '../../../components/UI/Button';
import { Input } from '../../../components/UI/Input';
import { BriefQuestion } from '../../../types';

interface BriefQuestionsStepProps {
  data: {
    briefQuestions: BriefQuestion[];
  };
  updateData: (data: any) => void;
  onValidChange: (valid: boolean) => void;
}

export const BriefQuestionsStep = ({ data, updateData, onValidChange }: BriefQuestionsStepProps) => {
  const [questions, setQuestions] = useState<BriefQuestion[]>(data.briefQuestions.length > 0 ? data.briefQuestions : [
    {
      id: '1',
      question: 'What is your company name?',
      type: 'text',
      required: true,
    },
    {
      id: '2',
      question: 'What is your email address?',
      type: 'text',
      required: true,
    },
  ]);

  useEffect(() => {
    const isValid = questions.length > 0 && questions.every(q => q.question.trim().length > 0);
    onValidChange(isValid);
    updateData({ briefQuestions: questions });
  }, [questions, onValidChange, updateData]);

  const addQuestion = () => {
    const newQuestion: BriefQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      question: '',
      type: 'text',
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<BriefQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    updateQuestion(questionId, {
      options: [...(questions.find(q => q.id === questionId)?.options || []), '']
    });
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question?.options) return;
    
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    updateQuestion(questionId, { options: newOptions });
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question?.options) return;
    
    const newOptions = question.options.filter((_, index) => index !== optionIndex);
    updateQuestion(questionId, { options: newOptions });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          Brief Questions
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Create custom questions to collect the information you need from your clients.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-secondary-50 dark:bg-secondary-800/50 rounded-lg p-4 border border-secondary-200 dark:border-secondary-700"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-3">
                <GripVertical className="h-4 w-4 text-secondary-400" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Question {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <Input
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                  placeholder="Enter your question..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(question.id, { 
                        type: e.target.value as BriefQuestion['type'],
                        options: ['select', 'multiselect'].includes(e.target.value) ? [''] : undefined
                      })}
                      className="block w-full rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 px-3 py-2 text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors duration-200"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Long Text</option>
                      <option value="select">Single Choice</option>
                      <option value="multiselect">Multiple Choice</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`required-${question.id}`}
                      checked={question.required}
                      onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                      className="rounded border-secondary-300 dark:border-secondary-600 text-primary-500 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`required-${question.id}`}
                      className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
                    >
                      Required
                    </label>
                  </div>
                </div>

                {(question.type === 'select' || question.type === 'multiselect') && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Options
                    </label>
                    <div className="space-y-2">
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(question.id, optionIndex)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addQuestion}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>

      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
        <h3 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
          📝 Question Tips
        </h3>
        <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
          <li>• Start with basic info like name and email</li>
          <li>• Ask specific questions about project goals and requirements</li>
          <li>• Use multiple choice for preferences and categories</li>
          <li>• Keep questions clear and concise</li>
        </ul>
      </div>
    </div>
  );
};