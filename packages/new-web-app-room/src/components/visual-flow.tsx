'use client';

import { useMCP } from '@/lib/mcp-context';

export function VisualFlow() {
  const { connections } = useMCP();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Visual Flow Designer
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Flow Node
        </button>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 min-h-[400px] border-2 border-dashed border-slate-300 dark:border-slate-600">
        {connections.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-lg font-medium mb-2">No Connections Yet</h3>
            <p>Add connections in the Connections tab to start building flows</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-800 dark:text-slate-100">
                    {connection.name}
                  </h4>
                  <span className={`w-2 h-2 rounded-full ${
                    connection.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {connection.type} connector
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Available Tools: {connection.tools?.length || 0}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {connection.tools?.slice(0, 3).map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                      >
                        {tool.name}
                      </span>
                    ))}
                    {(connection.tools?.length || 0) > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded">
                        +{(connection.tools?.length || 0) - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


