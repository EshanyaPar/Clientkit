import React, { useState } from 'react';
import { Search, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { Input } from '../components/UI/Input';
import { ChatRoom } from '../components/Chat/ChatRoom';
import { useChat } from '../hooks/useChat';
import { ChatRoom as ChatRoomType } from '../types';

export const Messages = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { chatRooms, loading } = useChat();

  const filteredRooms = chatRooms.filter(room =>
    room.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (selectedRoom) {
    return (
      <div className="h-screen flex flex-col">
        <ChatRoom 
          room={selectedRoom} 
          onBack={() => setSelectedRoom(null)} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Messages
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Communicate with your clients throughout the project lifecycle
        </p>
      </div>

      <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700">
        {/* Search */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            startIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Conversations */}
        <div className="divide-y divide-secondary-200 dark:divide-secondary-700">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-700 rounded-full flex items-center justify-center mb-4">
                {searchQuery ? (
                  <Search className="h-8 w-8 text-secondary-400" />
                ) : (
                  <MessageCircle className="h-8 w-8 text-secondary-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm max-w-md">
                {searchQuery 
                  ? 'Try adjusting your search terms to find the conversation you\'re looking for.'
                  : 'Start chatting with clients once they begin the onboarding process.'
                }
              </p>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className="w-full p-6 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-medium">
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
                        <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
                          {room.clientName}
                        </h3>
                        <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-4">
                          {room.lastMessage && formatTime(room.lastMessage.createdAt)}
                        </span>
                      </div>
                      <p className="text-secondary-600 dark:text-secondary-400 truncate mb-1">
                        {room.lastMessage?.content || 'No messages yet'}
                      </p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400 truncate">
                        {room.projectName}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-secondary-400 ml-4 flex-shrink-0" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};