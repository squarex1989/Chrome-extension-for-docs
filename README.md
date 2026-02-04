# Chrome Extension for Docs

A Docs browser extension demo that provides AI-powered document search and response generation for customer support scenarios.

## Features

- **AI-Powered Answers**: Automatically generates contextual responses based on document knowledge base
- **Document Search**: Search and retrieve relevant documents quickly
- **Insert to Reply**: One-click insertion of AI-generated responses into chat replies
- **Document Preview**: View full document content with AI chat assistance
- **Citation Support**: Responses include citations to source documents

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/squarex1989/Chrome-extension-for-docs.git

# Navigate to project directory
cd Chrome-extension-for-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ExtensionDemo.tsx      # Main demo container
│   ├── ExtensionSidebar.tsx   # Extension sidebar panel
│   ├── TicketList.tsx         # Customer ticket list
│   ├── TicketDetail.tsx       # Ticket detail view
│   ├── AIAnswerCard.tsx       # AI response card
│   ├── DocumentPreviewModal.tsx # Document preview modal
│   └── extensionData.ts       # Mock data and types
├── App.tsx
├── main.tsx
└── index.css
```

## Usage

1. The demo simulates a Zendesk-like customer support interface
2. Select a customer conversation from the left sidebar
3. The Extension sidebar (right) automatically searches for relevant documents
4. AI generates a contextual response based on the customer query
5. Click "Insert to reply" to add the response to your message

## License

MIT
