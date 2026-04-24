export interface Tip {
  id: string;
  creator_username: string;
  sender_address: string;
  amount: number;
  memo?: string;
  date: string;
}

export type WsMessage = 
  | { type: 'subscribe'; channel: string }
  | { type: 'unsubscribe'; channel: string }
  | { type: 'new_tip'; tip: Tip }
  | { type: 'ping' }
  | { type: 'pong' };

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: Map<string, Set<(data: any) => void>> = new Map();
  
  constructor(private url: string) {}
  
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          resolve();
        };
        
        this.ws.onmessage = (event) => {
          try {
            const message: WsMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.stopHeartbeat();
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopHeartbeat();
  }
  
  subscribe(channel: string, handler: (data: any) => void) {
    const handlers = this.messageHandlers.get(channel) || new Set<(data: any) => void>();
    handlers.add(handler);
    this.messageHandlers.set(channel, handlers);
    this.send({ type: 'subscribe', channel });
  }
  
  unsubscribe(channel: string, handler: (data: any) => void) {
    const handlers = this.messageHandlers.get(channel);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.messageHandlers.delete(channel);
        this.send({ type: 'unsubscribe', channel });
      }
    }
  }
  
  private send(message: WsMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  
  private handleMessage(message: WsMessage) {
    if (message.type === 'pong') {
      return;
    }
    
    if (message.type === 'new_tip') {
      const channel = `creator:${message.tip.creator_username}`;
      const handlers = this.messageHandlers.get(channel);
      handlers?.forEach(handler => handler(message.tip));
    }
  }
  
  private heartbeatInterval: NodeJS.Timeout | null = null;
  
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000); // 30 seconds
  }
  
  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  
  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect().catch(console.error);
      }, delay);
    }
  }
}