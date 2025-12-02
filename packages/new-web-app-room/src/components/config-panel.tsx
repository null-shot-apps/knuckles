'use client';

import { useState } from 'react';
import { useMCP } from '@/lib/mcp-context';

export function ConfigPanel() {
  // For now, we'll manage config locally since it's not in the context yet
  const { } = useMCP();
  const [localConfig, setLocalConfig] = useState({
    nullshot: {
      apiEndpoint: 'https://api.nullshot.dev',
      apiKey: '',
      autoSync: true,
    },
    mcp: {
      serverPort: 3000,
      maxConnections: 10,
      enableLogging: true,
    },
    security: {
      requireAuth: true,
      encryptTokens: true,
      sessionTimeout: 30,
    },
  });

  const handleSave = () => {
    // TODO: Implement config saving
    console.log('Saving config:', localConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Configuration
        </h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nullshot Integration */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
            🎯 Nullshot Integration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                API Endpoint
              </label>
              <input
                type="text"
                value={localConfig.nullshot.apiEndpoint}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  nullshot: { ...localConfig.nullshot, apiEndpoint: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="https://api.nullshot.dev"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={localConfig.nullshot.apiKey}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  nullshot: { ...localConfig.nullshot, apiKey: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="Enter your Nullshot API key"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoSync"
                checked={localConfig.nullshot.autoSync}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  nullshot: { ...localConfig.nullshot, autoSync: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="autoSync" className="text-sm text-slate-700 dark:text-slate-300">
                Auto-sync MCP tools with Nullshot
              </label>
            </div>
          </div>
        </div>

        {/* MCP Server Settings */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
            🔧 MCP Server Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Server Port
              </label>
              <input
                type="number"
                value={localConfig.mcp.serverPort}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  mcp: { ...localConfig.mcp, serverPort: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="3000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Max Connections
              </label>
              <input
                type="number"
                value={localConfig.mcp.maxConnections}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  mcp: { ...localConfig.mcp, maxConnections: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="10"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableLogging"
                checked={localConfig.mcp.enableLogging}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  mcp: { ...localConfig.mcp, enableLogging: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="enableLogging" className="text-sm text-slate-700 dark:text-slate-300">
                Enable detailed logging
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
            🔒 Security Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireAuth"
                checked={localConfig.security.requireAuth}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  security: { ...localConfig.security, requireAuth: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="requireAuth" className="text-sm text-slate-700 dark:text-slate-300">
                Require authentication for all connections
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="encryptTokens"
                checked={localConfig.security.encryptTokens}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  security: { ...localConfig.security, encryptTokens: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="encryptTokens" className="text-sm text-slate-700 dark:text-slate-300">
                Encrypt stored tokens and credentials
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={localConfig.security.sessionTimeout}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  security: { ...localConfig.security, sessionTimeout: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="30"
              />
            </div>
          </div>
        </div>

        {/* Export/Import */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
            📦 Export/Import
          </h3>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Configuration
            </button>
            <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
              Import Configuration
            </button>
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Export includes connections, settings, and flow configurations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



