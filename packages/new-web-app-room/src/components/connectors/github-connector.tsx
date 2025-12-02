'use client';

import { useState } from 'react';
import { MCPTool } from '@/lib/mcp-context';

export interface GitHubConnection {
  id: string;
  name: string;
  type: 'github';
  status: 'connected' | 'disconnected' | 'testing';
  config: {
    token: string;
    baseUrl?: string;
    username?: string;
  };
  tools?: MCPTool[];
}

interface GitHubConnectorProps {
  onSave: (connection: Omit<GitHubConnection, 'id'>) => void;
  onCancel: () => void;
  connection?: GitHubConnection;
}

export function GitHubConnector({ onSave, onCancel, connection }: GitHubConnectorProps) {
  const [formData, setFormData] = useState({
    name: connection?.name || 'GitHub Connection',
    token: connection?.config.token || '',
    baseUrl: connection?.config.baseUrl || 'https://api.github.com',
    username: connection?.config.username || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTest = async () => {
    if (!formData.token) {
      setTestResult({ success: false, message: 'Please enter a GitHub token' });
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      // Simulate API test - in real implementation, this would test the GitHub API
      const response = await fetch(`${formData.baseUrl}/user`, {
        headers: {
          'Authorization': `token ${formData.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const userData = await response.json() as { login: string };
        setTestResult({ 
          success: true, 
          message: `Connected successfully as ${userData.login}` 
        });
        setFormData(prev => ({ ...prev, username: userData.login }));
      } else {
        setTestResult({ 
          success: false, 
          message: `Connection failed: ${response.status} ${response.statusText}` 
        });
      }
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.token) {
      setTestResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    const connectionData: Omit<GitHubConnection, 'id'> = {
      name: formData.name,
      type: 'github',
      status: testResult?.success ? 'connected' : 'disconnected',
      config: {
        token: formData.token,
        baseUrl: formData.baseUrl,
        username: formData.username,
      },
      tools: [
        { id: 'list_repositories', name: 'List Repositories', description: 'List all repositories', parameters: {}, category: 'repositories' },
        { id: 'get_repository', name: 'Get Repository', description: 'Get repository details', parameters: {}, category: 'repositories' },
        { id: 'create_repository', name: 'Create Repository', description: 'Create a new repository', parameters: {}, category: 'repositories' },
        { id: 'list_issues', name: 'List Issues', description: 'List repository issues', parameters: {}, category: 'issues' },
        { id: 'create_issue', name: 'Create Issue', description: 'Create a new issue', parameters: {}, category: 'issues' },
        { id: 'get_issue', name: 'Get Issue', description: 'Get issue details', parameters: {}, category: 'issues' },
        { id: 'update_issue', name: 'Update Issue', description: 'Update an existing issue', parameters: {}, category: 'issues' },
        { id: 'list_pull_requests', name: 'List Pull Requests', description: 'List repository pull requests', parameters: {}, category: 'pull_requests' },
        { id: 'create_pull_request', name: 'Create Pull Request', description: 'Create a new pull request', parameters: {}, category: 'pull_requests' },
        { id: 'get_pull_request', name: 'Get Pull Request', description: 'Get pull request details', parameters: {}, category: 'pull_requests' },
        { id: 'merge_pull_request', name: 'Merge Pull Request', description: 'Merge a pull request', parameters: {}, category: 'pull_requests' },
        { id: 'list_commits', name: 'List Commits', description: 'List repository commits', parameters: {}, category: 'commits' },
        { id: 'get_commit', name: 'Get Commit', description: 'Get commit details', parameters: {}, category: 'commits' },
        { id: 'create_commit', name: 'Create Commit', description: 'Create a new commit', parameters: {}, category: 'commits' },
        { id: 'get_file_content', name: 'Get File Content', description: 'Get file content from repository', parameters: {}, category: 'files' },
        { id: 'create_file', name: 'Create File', description: 'Create a new file', parameters: {}, category: 'files' },
        { id: 'update_file', name: 'Update File', description: 'Update an existing file', parameters: {}, category: 'files' },
        { id: 'delete_file', name: 'Delete File', description: 'Delete a file', parameters: {}, category: 'files' },
        { id: 'list_branches', name: 'List Branches', description: 'List repository branches', parameters: {}, category: 'branches' },
        { id: 'create_branch', name: 'Create Branch', description: 'Create a new branch', parameters: {}, category: 'branches' },
        { id: 'delete_branch', name: 'Delete Branch', description: 'Delete a branch', parameters: {}, category: 'branches' },
        { id: 'list_releases', name: 'List Releases', description: 'List repository releases', parameters: {}, category: 'releases' },
        { id: 'create_release', name: 'Create Release', description: 'Create a new release', parameters: {}, category: 'releases' },
        { id: 'list_collaborators', name: 'List Collaborators', description: 'List repository collaborators', parameters: {}, category: 'collaborators' },
        { id: 'add_collaborator', name: 'Add Collaborator', description: 'Add a collaborator', parameters: {}, category: 'collaborators' },
        { id: 'remove_collaborator', name: 'Remove Collaborator', description: 'Remove a collaborator', parameters: {}, category: 'collaborators' },
      ],
    };

    onSave(connectionData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">GH</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            GitHub Connector
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connect to GitHub repositories and developer tools
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Connection Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="My GitHub Connection"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Personal Access Token *
            </label>
            <input
              type="password"
              value={formData.token}
              onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Generate a token at GitHub Settings → Developer settings → Personal access tokens
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              API Base URL
            </label>
            <input
              type="text"
              value={formData.baseUrl}
              onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="https://api.github.com"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Use https://api.github.com for GitHub.com or your GitHub Enterprise URL
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-3">
              Available MCP Tools
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'Repositories', 'Issues', 'Pull Requests', 'Commits',
                'Files', 'Branches', 'Releases', 'Collaborators'
              ].map((tool) => (
                <div key={tool} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleTest}
              disabled={isLoading || !formData.token}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Testing Connection...' : 'Test Connection'}
            </button>

            {testResult && (
              <div className={`p-3 rounded-lg text-sm ${
                testResult.success 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {testResult.message}
              </div>
            )}

            {formData.username && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Connected as: <span className="font-medium">{formData.username}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Connection
        </button>
      </div>
    </div>
  );
}



