import { useState, useEffect } from 'react';
import { ChatRoom, ChatMessage } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Mock data for demo
const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    projectId: '1',
    projectName: 'Website Redesign for TechCorp',
    clientName: 'John Doe',
    clientEmail: 'john@techcorp.com',
    freelancerId: '1',
    lastMessage: {
      id: '1',
      roomId: '1',
      senderId: 'client-1',
      senderName: 'John Doe',
      senderType: 'client',
      content: 'Hi! I have some questions about the project timeline.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
    },
    unreadCount: 2,
    createdAt: '2024-01-16T14:00:00Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    projectId: '2',
    projectName: 'Brand Identity for StartupXYZ',
    clientName: 'Sarah Wilson',
    clientEmail: 'sarah@startupxyz.com',
    freelancerId: '1',
    lastMessage: {
      id: '2',
      roomId: '2',
      senderId: '1',
      senderName: 'Demo User',
      senderType: 'freelancer',
      content: 'I\'ve uploaded the initial logo concepts for your review.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true,
    },
    unreadCount: 0,
    createdAt: '2024-01-18T09:30:00Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      roomId: '1',
      senderId: '1',
      senderName: 'Demo User',
      senderType: 'freelancer',
      content: 'Hi John! Thanks for choosing ClientKit for your website redesign. I\'m excited to work with you on this project.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true,
    },
    {
      id: '2',
      roomId: '1',
      senderId: 'client-1',
      senderName: 'John Doe',
      senderType: 'client',
      content: 'Thank you! I\'m looking forward to seeing what you create. When can we expect the first draft?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      read: true,
    },
    {
      id: '3',
      roomId: '1',
      senderId: '1',
      senderName: 'Demo User',
      senderType: 'freelancer',
      content: 'Based on your brief, I\'ll have the initial wireframes ready by Friday. I\'ll also send over some design inspiration for your review.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
      read: true,
    },
    {
      id: '4',
      roomId: '1',
      senderId: 'client-1',
      senderName: 'John Doe',
      senderType: 'client',
      content: 'Hi! I have some questions about the project timeline.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
    },
    {
      id: '5',
      roomId: '1',
      senderId: 'client-1',
      senderName: 'John Doe',
      senderType: 'client',
      content: 'Also, can we schedule a call to discuss the mobile version requirements?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
      read: false,
    },
  ],
  '2': [
    {
      id: '6',
      roomId: '2',
      senderId: '1',
      senderName: 'Demo User',
      senderType: 'freelancer',
      content: 'Hi Sarah! I\'ve started working on your brand identity. The color palette you mentioned really resonates with your startup\'s vision.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      read: true,
    },
    {
      id: '7',
      roomId: '2',
      senderId: '1',
      senderName: 'Demo User',
      senderType: 'freelancer',
      content: 'I\'ve uploaded the initial logo concepts for your review.',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true,
    },
  ],
};

export const useChat = () => {
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Simulate API call
      setTimeout(() => {
        const savedRooms = localStorage.getItem('clientkit_chat_rooms');
        const savedMessages = localStorage.getItem('clientkit_chat_messages');
        
        if (savedRooms && savedMessages) {
          setChatRooms(JSON.parse(savedRooms));
          setMessages(JSON.parse(savedMessages));
        } else {
          setChatRooms(mockChatRooms);
          setMessages(mockMessages);
          localStorage.setItem('clientkit_chat_rooms', JSON.stringify(mockChatRooms));
          localStorage.setItem('clientkit_chat_messages', JSON.stringify(mockMessages));
        }
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const sendMessage = (roomId: string, content: string, type: 'text' | 'file' = 'text', fileData?: { url: string; name: string; size: number }) => {
    if (!user) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      roomId,
      senderId: user.id,
      senderName: user.name,
      senderType: 'freelancer',
      content,
      type,
      fileUrl: fileData?.url,
      fileName: fileData?.name,
      fileSize: fileData?.size,
      createdAt: new Date().toISOString(),
      read: true,
    };

    // Update messages
    const updatedMessages = {
      ...messages,
      [roomId]: [...(messages[roomId] || []), newMessage],
    };
    setMessages(updatedMessages);
    localStorage.setItem('clientkit_chat_messages', JSON.stringify(updatedMessages));

    // Update chat room with last message
    const updatedRooms = chatRooms.map(room => 
      room.id === roomId 
        ? { ...room, lastMessage: newMessage, updatedAt: new Date().toISOString() }
        : room
    );
    setChatRooms(updatedRooms);
    localStorage.setItem('clientkit_chat_rooms', JSON.stringify(updatedRooms));
  };

  const markAsRead = (roomId: string) => {
    // Mark all messages in room as read
    const updatedMessages = {
      ...messages,
      [roomId]: (messages[roomId] || []).map(msg => ({ ...msg, read: true })),
    };
    setMessages(updatedMessages);
    localStorage.setItem('clientkit_chat_messages', JSON.stringify(updatedMessages));

    // Reset unread count
    const updatedRooms = chatRooms.map(room => 
      room.id === roomId ? { ...room, unreadCount: 0 } : room
    );
    setChatRooms(updatedRooms);
    localStorage.setItem('clientkit_chat_rooms', JSON.stringify(updatedRooms));
  };

  const getTotalUnreadCount = () => {
    return chatRooms.reduce((total, room) => total + room.unreadCount, 0);
  };

  const getRoomMessages = (roomId: string) => {
    return messages[roomId] || [];
  };

  return {
    chatRooms,
    messages,
    loading,
    sendMessage,
    markAsRead,
    getTotalUnreadCount,
    getRoomMessages,
  };
};