'use client';

import { useState } from 'react';
import { useMCP } from '@/lib/mcp-context';
import { GitHubConnector } from './connectors/github-connector';

const CONNECTION_TYPES = [
  { id: 'github', name: 'GitHub', icon: '🐙', description: 'Source control & developer tools' },
  { id: 'vector-db', name: 'Vector Database', icon: '🔍', description: 'RAG & embedding search' },
  { id: 'file-store', name: 'File Storage', icon: '📁', description: 'Document & file management' },
  { id: 'messaging', name: 'Messaging', icon: '💬', description: 'Slack, Teams integration' },
  { id: 'database', name: 'Database', icon: '🗄️', description: 'SQL & NoSQL databases' },
  { id: 'custom', name: 'Custom API', icon: '🔧', description: 'Custom integrations' }
];

export function ConnectionPanel() {
  const { connections, addConnection, removeConnection } = useMCP();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleAddConnection = () => {
    setShowAddModal(true);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            MCP Connections
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your Model Context Protocol integrations
          </p>
        </div>
        <button
          onClick={handleAddConnection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Connection
        </button>
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {connections.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              No connections yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Add your first MCP connection to get started
            </p>
            <button
              onClick={handleAddConnection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add Connection
            </button>
          </div>
        ) : (
          connections.map((connection) => (
            <div
              key={connection.id}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {CONNECTION_TYPES.find(t => t.id === connection.type)?.icon || '🔧'}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">
                      {connection.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {CONNECTION_TYPES.find(t => t.id === connection.type)?.name || connection.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(connection.status)}`}>
                    {connection.status}
                  </span>
                  <button
                    onClick={() => removeConnection(connection.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {connection.tools.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Available Tools: {connection.tools.length}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {connection.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool.id}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {tool.name}
                      </span>
                    ))}
                    {connection.tools.length > 3 && (
                      <span className="px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 text-xs rounded">
                        +{connection.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Connection Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {!selectedType ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Add New Connection
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONNECTION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                        {type.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedType(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      ←
                    </button>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                      Configure {CONNECTION_TYPES.find(t => t.id === selectedType)?.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedType(null);
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                {selectedType === 'github' && (
                  <GitHubConnector
                    onSave={(config) => {
                      addConnection({
                        name: config.name,
                        type: 'github',
                        status: 'connected',
                        config,
                        tools: [
                          { id: 'list_repos', name: 'List Repositories', description: 'Get user repositories', parameters: {}, category: 'repository' },
                          { id: 'create_pr', name: 'Create Pull Request', description: 'Create a new PR', parameters: {}, category: 'repository' },
                          { id: 'list_issues', name: 'List Issues', description: 'Get repository issues', parameters: {}, category: 'issues' },
                          { id: 'create_issue', name: 'Create Issue', description: 'Create a new issue', parameters: {}, category: 'issues' }
                        ]
                      });
                      setShowAddModal(false);
                      setSelectedType(null);
                    }}
                    onCancel={() => setSelectedType(null)}
                  />
                )}

                {selectedType !== 'github' && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚧</div>
                    <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                      Coming Soon
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      This connector is under development
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
