'use client';

import { MCPStudio } from '@/components/mcp-studio';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            MCP Connectivity Studio
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Visual interface for Model Context Protocol integrations with Nullshot Framework
          </p>
        </header>
        
        <MCPStudio />
      </div>
    </div>
  );
}

