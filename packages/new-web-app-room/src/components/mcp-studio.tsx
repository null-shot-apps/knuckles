'use client';

import { useState } from 'react';
import { ConnectionPanel } from './connection-panel';
import { VisualFlow } from './visual-flow';
import { ConfigPanel } from './config-panel';
import { MCPProvider } from '@/lib/mcp-context';

export function MCPStudio() {
  const [activeTab, setActiveTab] = useState<'connections' | 'flow' | 'config'>('connections');

  return (
    <MCPProvider>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'connections', label: 'Connections', icon: '🔗' },
              { id: 'flow', label: 'Visual Flow', icon: '🔄' },
              { id: 'config', label: 'Configuration', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'connections' && <ConnectionPanel />}
          {activeTab === 'flow' && <VisualFlow />}
          {activeTab === 'config' && <ConfigPanel />}
        </div>
      </div>
    </MCPProvider>
  );
}
