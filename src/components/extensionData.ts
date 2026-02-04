// Extension Demo mock data

export interface Ticket {
  id: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  status: 'open' | 'pending' | 'solved';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  query: string;
  tags: string[];
}

export interface RecentDocument {
  id: string;
  title: string;
  type: 'doc' | 'article' | 'guide';
  lastViewed: string;
  excerpt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'doc' | 'article' | 'guide';
  relevance: number;
  excerpt: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  sourceId: string;
}

export interface AIAnswer {
  content: string;
  citations: Citation[];
}

// Mock tickets data
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    subject: 'How do I reset my password?',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    status: 'open',
    priority: 'normal',
    createdAt: '2024-01-14 10:23 AM',
    query: 'I forgot my password and cannot log in to my account. How can I reset it? I tried clicking the forgot password link but did not receive any email.',
    tags: ['password', 'login', 'account'],
  },
  {
    id: 'ticket-2',
    subject: 'Unable to schedule a meeting',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@company.com',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-14 09:45 AM',
    query: 'When I try to schedule a meeting, I get an error message saying "Unable to create meeting". I have tried multiple times but the issue persists. This is urgent as I have client calls scheduled.',
    tags: ['meeting', 'scheduling', 'error'],
  },
  {
    id: 'ticket-3',
    subject: 'How to enable recording transcription?',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@tech.io',
    status: 'pending',
    priority: 'normal',
    createdAt: '2024-01-13 04:30 PM',
    query: 'I would like to enable automatic transcription for my meeting recordings. Where can I find this setting? Is this feature available on the Pro plan?',
    tags: ['recording', 'transcription', 'settings'],
  },
  {
    id: 'ticket-4',
    subject: 'Billing inquiry - double charged',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.w@startup.co',
    status: 'open',
    priority: 'urgent',
    createdAt: '2024-01-14 08:15 AM',
    query: 'I noticed that I was charged twice for my monthly subscription this month. Please help me understand why and process a refund for the duplicate charge.',
    tags: ['billing', 'refund', 'payment'],
  },
  {
    id: 'ticket-5',
    subject: 'Integration with Slack not working',
    customerName: 'David Lee',
    customerEmail: 'david@agency.com',
    status: 'open',
    priority: 'normal',
    createdAt: '2024-01-13 02:00 PM',
    query: 'I set up the Slack integration yesterday but notifications are not coming through. I followed the setup guide but something seems wrong. Can you help troubleshoot?',
    tags: ['integration', 'slack', 'notifications'],
  },
  {
    id: 'ticket-6',
    subject: 'Request for enterprise features demo',
    customerName: 'Lisa Brown',
    customerEmail: 'lisa.brown@enterprise.com',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-12 11:00 AM',
    query: 'Our company is considering upgrading to the Enterprise plan. Can you provide a demo of the advanced admin controls and SSO features? We have about 500 users.',
    tags: ['enterprise', 'demo', 'sales'],
  },
];

// Mock recent documents
export const mockRecentDocuments: RecentDocument[] = [
  {
    id: 'doc-1',
    title: 'Getting Started Guide',
    type: 'guide',
    lastViewed: '2 hours ago',
    excerpt: 'Learn how to set up your account and start using the platform effectively...',
  },
  {
    id: 'doc-2',
    title: 'Password Reset Instructions',
    type: 'article',
    lastViewed: '5 hours ago',
    excerpt: 'Step-by-step guide to reset your password and secure your account...',
  },
  {
    id: 'doc-3',
    title: 'Meeting Scheduling FAQ',
    type: 'doc',
    lastViewed: '1 day ago',
    excerpt: 'Frequently asked questions about scheduling, rescheduling, and managing meetings...',
  },
  {
    id: 'doc-4',
    title: 'Billing and Subscription Guide',
    type: 'guide',
    lastViewed: '2 days ago',
    excerpt: 'Understanding your billing cycle, invoices, and subscription management...',
  },
  {
    id: 'doc-5',
    title: 'Integration Setup Documentation',
    type: 'doc',
    lastViewed: '3 days ago',
    excerpt: 'Complete guide to setting up integrations with third-party applications...',
  },
];

// Function to generate AI answer based on query
export const generateAIAnswer = (query: string): AIAnswer => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('password') || lowerQuery.includes('reset') || lowerQuery.includes('login')) {
    return {
      content: `To reset your password, please follow these steps:

1. Go to the login page and click "Forgot Password"
2. Enter your registered email address
3. Check your inbox (and spam folder) for the reset link
4. Click the link and create a new password

If you don't receive the email within 5 minutes, please check that you're using the correct email address associated with your account. You can also try requesting the reset again.

For security reasons, the reset link expires after 24 hours.`,
      citations: [
        {
          id: 'cite-1',
          text: 'Password reset links are valid for 24 hours',
          source: 'Password Reset Instructions',
          sourceId: 'doc-2',
        },
        {
          id: 'cite-2',
          text: 'Check spam folder if email not received',
          source: 'Getting Started Guide',
          sourceId: 'doc-1',
        },
      ],
    };
  }
  
  if (lowerQuery.includes('meeting') || lowerQuery.includes('schedule') || lowerQuery.includes('error')) {
    return {
      content: `The "Unable to create meeting" error can occur due to several reasons. Here are the troubleshooting steps:

1. **Check your internet connection** - Ensure you have a stable connection
2. **Verify your account status** - Make sure your subscription is active
3. **Clear browser cache** - Try clearing your browser cache and cookies
4. **Check time zone settings** - Ensure your time zone is correctly set
5. **Try a different browser** - Sometimes browser extensions can cause conflicts

If the issue persists after trying these steps, please try logging out and back in. This usually resolves most scheduling issues.`,
      citations: [
        {
          id: 'cite-1',
          text: 'Browser cache can cause scheduling conflicts',
          source: 'Meeting Scheduling FAQ',
          sourceId: 'doc-3',
        },
        {
          id: 'cite-2',
          text: 'Verify subscription status for meeting features',
          source: 'Billing and Subscription Guide',
          sourceId: 'doc-4',
        },
      ],
    };
  }
  
  if (lowerQuery.includes('transcription') || lowerQuery.includes('recording')) {
    return {
      content: `To enable automatic transcription for meeting recordings:

1. Go to **Settings** > **Recording**
2. Toggle on "Audio Transcript"
3. Select your preferred language for transcription
4. Save your changes

**Note:** Automatic transcription is available on Pro, Business, and Enterprise plans. If you're on the Basic plan, you'll need to upgrade to access this feature.

Once enabled, all new recordings will automatically include transcriptions that can be searched, edited, and exported.`,
      citations: [
        {
          id: 'cite-1',
          text: 'Transcription available on Pro and higher plans',
          source: 'Getting Started Guide',
          sourceId: 'doc-1',
        },
      ],
    };
  }
  
  if (lowerQuery.includes('billing') || lowerQuery.includes('charged') || lowerQuery.includes('refund') || lowerQuery.includes('payment')) {
    return {
      content: `I understand you're concerned about the duplicate charge. Here's how we can help:

1. **Verify the charges** - Please check your billing history in Account > Billing to confirm the duplicate
2. **Common causes** - This can happen if the payment page was refreshed during processing
3. **Refund process** - Duplicate charges are automatically detected and refunded within 5-7 business days

If you don't see a pending refund in your billing history, please reply with your invoice numbers and we'll expedite the refund process.

For future reference, if a payment seems stuck, please wait a few minutes before retrying.`,
      citations: [
        {
          id: 'cite-1',
          text: 'Duplicate charges refunded within 5-7 business days',
          source: 'Billing and Subscription Guide',
          sourceId: 'doc-4',
        },
      ],
    };
  }
  
  if (lowerQuery.includes('integration') || lowerQuery.includes('slack') || lowerQuery.includes('notification')) {
    return {
      content: `Let's troubleshoot your Slack integration. Here are the steps:

1. **Verify permissions** - Ensure the integration has the necessary permissions in Slack
2. **Re-authorize** - Go to Settings > Integrations > Slack and click "Re-authorize"
3. **Check notification settings** - Make sure notifications are enabled both in our app and in Slack
4. **Test the connection** - Use the "Test Connection" button in integration settings

**Common issues:**
- Slack workspace admin may need to approve the app
- Notifications might be going to a different channel
- Browser notifications might be blocking alerts`,
      citations: [
        {
          id: 'cite-1',
          text: 'Re-authorize integration if notifications fail',
          source: 'Integration Setup Documentation',
          sourceId: 'doc-5',
        },
      ],
    };
  }
  
  // Default response
  return {
    content: `Thank you for your question. Based on our documentation, here's what I found:

I'd be happy to help you with your inquiry. To provide the most accurate assistance, could you please provide more details about:

1. What specific feature or functionality you're trying to use
2. Any error messages you've encountered
3. What troubleshooting steps you've already tried

In the meantime, you might find our Getting Started Guide helpful for general questions about using the platform.`,
    citations: [
      {
        id: 'cite-1',
        text: 'General troubleshooting steps',
        source: 'Getting Started Guide',
        sourceId: 'doc-1',
      },
    ],
  };
};

// Generate search results based on query
export const generateSearchResults = (query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];
  
  if (lowerQuery.includes('password') || lowerQuery.includes('reset') || lowerQuery.includes('login')) {
    results.push(
      { id: 'doc-2', title: 'Password Reset Instructions', type: 'article', relevance: 95, excerpt: 'Step-by-step guide to reset your password...' },
      { id: 'doc-1', title: 'Getting Started Guide', type: 'guide', relevance: 75, excerpt: 'Account setup and security settings...' },
    );
  }
  
  if (lowerQuery.includes('meeting') || lowerQuery.includes('schedule')) {
    results.push(
      { id: 'doc-3', title: 'Meeting Scheduling FAQ', type: 'doc', relevance: 92, excerpt: 'Troubleshooting common scheduling issues...' },
      { id: 'doc-1', title: 'Getting Started Guide', type: 'guide', relevance: 70, excerpt: 'How to schedule your first meeting...' },
    );
  }
  
  if (lowerQuery.includes('billing') || lowerQuery.includes('payment') || lowerQuery.includes('refund')) {
    results.push(
      { id: 'doc-4', title: 'Billing and Subscription Guide', type: 'guide', relevance: 98, excerpt: 'Understanding charges, refunds, and billing cycles...' },
    );
  }
  
  if (lowerQuery.includes('integration') || lowerQuery.includes('slack')) {
    results.push(
      { id: 'doc-5', title: 'Integration Setup Documentation', type: 'doc', relevance: 94, excerpt: 'Setting up and troubleshooting integrations...' },
    );
  }
  
  if (lowerQuery.includes('recording') || lowerQuery.includes('transcription')) {
    results.push(
      { id: 'doc-1', title: 'Getting Started Guide', type: 'guide', relevance: 85, excerpt: 'Recording and transcription features...' },
    );
  }
  
  // Add some default results if none matched
  if (results.length === 0) {
    results.push(
      { id: 'doc-1', title: 'Getting Started Guide', type: 'guide', relevance: 60, excerpt: 'General platform documentation...' },
      { id: 'doc-3', title: 'Meeting Scheduling FAQ', type: 'doc', relevance: 50, excerpt: 'Frequently asked questions...' },
    );
  }
  
  return results.sort((a, b) => b.relevance - a.relevance);
};
