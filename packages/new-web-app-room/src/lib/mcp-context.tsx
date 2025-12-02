'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface MCPConnection {
  id: string;
  name: string;
  type: 'github' | 'vector-db' | 'file-store' | 'messaging' | 'database' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  tools: MCPTool[];
}

export interface MCPTool {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  category: string;
}

export interface MCPFlow {
  id: string;
  name: string;
  nodes: FlowNode[];
  connections: FlowConnection[];
}

export interface FlowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'transform';
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface FlowConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

interface MCPContextType {
  connections: MCPConnection[];
  flows: MCPFlow[];
  addConnection: (connection: Omit<MCPConnection, 'id'>) => void;
  updateConnection: (id: string, updates: Partial<MCPConnection>) => void;
  removeConnection: (id: string) => void;
  addFlow: (flow: Omit<MCPFlow, 'id'>) => void;
  updateFlow: (id: string, updates: Partial<MCPFlow>) => void;
  removeFlow: (id: string) => void;
}

const MCPContext = createContext<MCPContextType | undefined>(undefined);

export function MCPProvider({ children }: { children: ReactNode }) {
  const [connections, setConnections] = useState<MCPConnection[]>([]);
  const [flows, setFlows] = useState<MCPFlow[]>([]);

  const addConnection = (connection: Omit<MCPConnection, 'id'>) => {
    const newConnection: MCPConnection = {
      ...connection,
      id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setConnections(prev => [...prev, newConnection]);
  };

  const updateConnection = (id: string, updates: Partial<MCPConnection>) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id ? { ...conn, ...updates } : conn
    ));
  };

  const removeConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id));
  };

  const addFlow = (flow: Omit<MCPFlow, 'id'>) => {
    const newFlow: MCPFlow = {
      ...flow,
      id: `flow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setFlows(prev => [...prev, newFlow]);
  };

  const updateFlow = (id: string, updates: Partial<MCPFlow>) => {
    setFlows(prev => prev.map(flow => 
      flow.id === id ? { ...flow, ...updates } : flow
    ));
  };

  const removeFlow = (id: string) => {
    setFlows(prev => prev.filter(flow => flow.id !== id));
  };

  return (
    <MCPContext.Provider value={{
      connections,
      flows,
      addConnection,
      updateConnection,
      removeConnection,
      addFlow,
      updateFlow,
      removeFlow
    }}>
      {children}
    </MCPContext.Provider>
  );
}

export function useMCP() {
  const context = useContext(MCPContext);
  if (context === undefined) {
    throw new Error('useMCP must be used within a MCPProvider');
  }
  return context;
}
