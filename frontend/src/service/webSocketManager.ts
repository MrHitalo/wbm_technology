class WebSocketManager {
  private static instance: WebSocketManager;
  private connections: { [key: string]: WebSocket } = {};
  private callbacks: { [key: string]: ((data: any) => void)[] } = {};

  private constructor() {}

  static getInstance() {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  connect(endpoint: string) {
    if (this.connections[endpoint]) {
      return; // Já conectado
    }

    const ws = new WebSocket(`ws://localhost:3000/ws/${endpoint}`);
    this.connections[endpoint] = ws;
    this.callbacks[endpoint] = [];

    ws.onopen = () => {
      console.log(`WebSocket conectado: ${endpoint}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.callbacks[endpoint].forEach((callback) => callback(data));
    };

    ws.onclose = () => {
      console.log(`WebSocket desconectado: ${endpoint}`);
      delete this.connections[endpoint];
    };
  }

  subscribe(endpoint: string, callback: (data: any) => void) {
    if (!this.connections[endpoint]) {
      this.connect(endpoint);
    }

    if (!this.callbacks[endpoint]) {
      this.callbacks[endpoint] = [];
    }

    this.callbacks[endpoint].push(callback);
  }

  unsubscribe(endpoint: string, callback: (data: any) => void) {
    if (!this.callbacks[endpoint]) return;

    this.callbacks[endpoint] = this.callbacks[endpoint].filter(
      (cb) => cb !== callback
    );

    if (this.callbacks[endpoint].length === 0) {
      this.connections[endpoint]?.close();
      delete this.connections[endpoint];
    }
  }
}

export default WebSocketManager;
