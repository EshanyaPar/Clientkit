import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Download } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useChat } from '../../hooks/useChat';
import { ChatRoom as ChatRoomType, ChatMessage } from '../../types';

interface ChatRoomProps {
  room: ChatRoomType;
  onBack: () => void;
}

export const ChatRoom = ({ room, onBack }: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getRoomMessages, sendMessage, markAsRead } = useChat();

  const messages = getRoomMessages(room.id);

  useEffect(() => {
    // Mark messages as read when room is opened
    markAsRead(room.id);
    scrollToBottom();
  }, [room.id, markAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(room.id, message.trim());
      setMessage('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file);
      sendMessage(room.id, `Shared file: ${file.name}`, 'file', {
        url: fileUrl,
        name: file.name,
        size: file.size,
      });
      setIsUploading(false);
    }, 1000);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-secondary-200 dark:border-secondary-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-8 w-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h4 className="font-medium text-secondary-900 dark:text-white">
            {room.clientName}
          </h4>
          <p className="text-xs text-secondary-500 dark:text-secondary-400">
            {room.projectName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg: ChatMessage) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderType === 'freelancer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.senderType === 'freelancer'
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white'
              }`}
            >
              {msg.type === 'file' ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="font-medium">{msg.fileName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">
                      {msg.fileSize && formatFileSize(msg.fileSize)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => msg.fileUrl && window.open(msg.fileUrl, '_blank')}
                      className={`h-6 w-6 p-0 ${
                        msg.senderType === 'freelancer'
                          ? 'text-white hover:bg-white/20'
                          : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                      }`}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              <div
                className={`text-xs mt-1 ${
                  msg.senderType === 'freelancer'
                    ? 'text-primary-100'
                    : 'text-secondary-500 dark:text-secondary-400'
                }`}
              >
                {formatTime(msg.createdAt)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="h-10 w-10 p-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!message.trim() || isUploading}
            className="h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};