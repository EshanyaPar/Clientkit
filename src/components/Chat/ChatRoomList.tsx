import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatRoom } from '../../types';

interface ChatRoomListProps {
  onRoomSelect: (room: ChatRoom) => void;
}

export const ChatRoomList = ({ onRoomSelect }: ChatRoomListProps) => {
  const { chatRooms, loading } = useChat();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-700 rounded-full flex items-center justify-center mb-4">
          <Clock className="h-8 w-8 text-secondary-400" />
        </div>
        <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
          No conversations yet
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400 text-sm">
          Start chatting with clients once they begin the onboarding process.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {chatRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onRoomSelect(room)}
          className="w-full p-4 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors border-b border-secondary-100 dark:border-secondary-700 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="relative">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                    {room.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                {room.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {room.unreadCount > 9 ? '9+' : room.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-secondary-900 dark:text-white truncate">
                    {room.clientName}
                  </h4>
                  <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-2">
                    {room.lastMessage && formatTime(room.lastMessage.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 truncate">
                  {room.lastMessage?.content || 'No messages yet'}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 truncate">
                  {room.projectName}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-secondary-400 ml-2 flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
};