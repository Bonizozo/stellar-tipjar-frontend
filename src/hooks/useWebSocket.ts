import { useEffect, useState } from 'react';
import { WebSocketClient } from '@/lib/websocket/client';

export function useWebSocket() {
  const [client, setClient] = useState<WebSocketClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
    const wsClient = new WebSocketClient(wsUrl);
    
    wsClient.connect()
      .then(() => {
        setIsConnected(true);
        setClient(wsClient);
      })
      .catch(console.error);
    
    return () => {
      wsClient.disconnect();
    };
  }, []);
  
  return { client, isConnected };
}


