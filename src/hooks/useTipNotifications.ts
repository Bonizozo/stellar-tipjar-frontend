import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import toast from 'react-hot-toast';

export function useTipNotifications(creatorUsername: string) {
  const { client, isConnected } = useWebSocket();
  
  useEffect(() => {
    if (!client || !isConnected) return;
    
    const channel = `creator:${creatorUsername}`;
    
    const handler = (tip: any) => {
      toast.success(`New tip received: ${tip.amount} XLM`, {
        description: `From ${tip.sender_address.slice(0, 8)}...`,
      });
    };
    
    client.subscribe(channel, handler);
    
    return () => {
      client.unsubscribe(channel, handler);
    };
  }, [client, isConnected, creatorUsername]);
}