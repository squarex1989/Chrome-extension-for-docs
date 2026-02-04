import { useState } from 'react';
import { RecentDocument } from './extensionData';

interface DocumentPreviewModalProps {
  document: RecentDocument;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const DocumentPreviewModal = ({ document, onClose }: DocumentPreviewModalProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generate document content based on document type
  const getDocumentContent = () => {
    switch (document.id) {
      case 'doc-1':
        return `# Getting Started Guide

Welcome to our platform! This guide will help you get up and running quickly.

## Account Setup

1. **Create your account** - Sign up using your work email
2. **Verify your email** - Click the verification link sent to your inbox
3. **Complete your profile** - Add your name, photo, and preferences

## Key Features

### Meetings
Schedule and join meetings with ease. Our platform supports HD video, screen sharing, and real-time collaboration.

### Documents
Create, edit, and share documents with your team. All changes are saved automatically.

### Integrations
Connect with your favorite tools including Slack, Microsoft Teams, and Google Workspace.

## Security Settings

Your security is our priority. We recommend:
- Enabling two-factor authentication
- Using a strong, unique password
- Reviewing your connected apps regularly

## Getting Help

If you need assistance:
- Visit our Help Center
- Contact support via chat
- Schedule a training session`;

      case 'doc-2':
        return `# Password Reset Instructions

Having trouble accessing your account? Follow these steps to reset your password.

## Step-by-Step Guide

### 1. Navigate to Login Page
Go to the login page and click on "Forgot Password" link below the sign-in button.

### 2. Enter Your Email
Type the email address associated with your account and click "Send Reset Link".

### 3. Check Your Inbox
Look for an email from us with the subject "Password Reset Request". 
**Note:** The email may take up to 5 minutes to arrive. Check your spam folder if you don't see it.

### 4. Click the Reset Link
The link in the email will take you to a secure page where you can create a new password.

### 5. Create New Password
Your new password must:
- Be at least 8 characters long
- Include at least one uppercase letter
- Include at least one number
- Include at least one special character

## Important Notes

- Password reset links expire after 24 hours
- You can only request 3 password resets per day
- If you continue to have issues, contact support

## Security Tips

- Never share your password with anyone
- Don't use the same password across multiple sites
- Consider using a password manager`;

      case 'doc-3':
        return `# Meeting Scheduling FAQ

Frequently asked questions about scheduling, managing, and troubleshooting meetings.

## Scheduling Basics

### How do I schedule a meeting?
1. Click the "Schedule" button in the top navigation
2. Fill in the meeting details (title, date, time, duration)
3. Add participants by email
4. Click "Schedule" to confirm

### Can I schedule recurring meetings?
Yes! When creating a meeting, check the "Recurring" option and set your preferred frequency.

## Common Issues

### "Unable to create meeting" error
This can happen due to:
- Internet connectivity issues
- Browser cache problems
- Account subscription status

**Solution:** Clear your browser cache, check your internet connection, and try again.

### Meeting link not working
Ensure:
- The meeting hasn't expired
- You're using the correct link
- Your account has access permissions

## Best Practices

- Schedule meetings at least 15 minutes in advance
- Include a clear agenda in the meeting description
- Set up waiting rooms for external participants
- Test your audio/video before important meetings`;

      default:
        return `# ${document.title}

${document.excerpt}

## Overview

This document provides comprehensive information about the topic. Please refer to the sections below for detailed guidance.

## Key Points

- Important information is highlighted throughout
- Follow the step-by-step instructions carefully
- Contact support if you need additional help

## Additional Resources

For more information, please visit our Help Center or contact our support team.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: 'ai',
      content: `Based on "${document.title}", here's what I found:\n\nThis document covers important information related to your question. The key points include following the step-by-step instructions and ensuring you have the necessary permissions.\n\nWould you like me to explain any specific section in more detail?`,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{document.title}</h2>
              <p className="text-xs text-gray-500">Last viewed: {document.lastViewed}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Document preview - Left */}
          <div className="flex-1 overflow-y-auto p-6 border-r border-gray-200">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {getDocumentContent().split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-4">{line.slice(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-lg font-semibold text-gray-900 mt-5 mb-3">{line.slice(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-base font-medium text-gray-900 mt-4 mb-2">{line.slice(4)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 text-gray-700">{line.slice(2)}</li>;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-medium text-gray-900">{line.slice(2, -2)}</p>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="text-gray-700 mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>

          {/* AI Chat - Right */}
          <div className="w-80 flex flex-col bg-gray-50">
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Ask about this document</span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Ask questions about this document</p>
                  <p className="text-xs text-gray-400 mt-1">AI will help you find answers</p>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
