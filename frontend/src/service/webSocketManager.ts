type Callback = (data: any) => void;

class WebSocketManager {
  private static instance: WebSocketManager;
  private ws: WebSocket | null = null;
  private callbacks: Callback[] = [];
  private latestData: any = null; // Armazena os dados mais recentes

  private constructor() {}

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  connect(url: string) {
    if (this.ws) return;

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("Conexão WebSocket estabelecida.");
    };

    this.ws.onmessage = (event) => {
      console.log("Dados recebidos do WebSocket (raw):", event.data); // Log dos dados brutos
      try {
        const data = JSON.parse(event.data);
        console.log("Dados processados do WebSocket (JSON):", data); // Log dos dados processados

        // Verifica se a propriedade "ciclos" existe dentro de "ar"
        if (data.ar && typeof data.ar.Ciclos !== "undefined") {
          this.latestData = data; // Armazena os dados mais recentes
          this.callbacks.forEach((callback) => callback(data));
        } else {
          console.warn(
            "Dados recebidos não contêm a propriedade 'ciclos':",
            data
          );
        }
      } catch (error) {
        console.error("Erro ao processar os dados do WebSocket:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    this.ws.onclose = () => {
      console.log("Conexão WebSocket encerrada.");
      this.ws = null;
    };
  }

  subscribe(callback: Callback) {
    this.callbacks.push(callback);
    if (this.latestData) {
      callback(this.latestData); // Envia os dados mais recentes ao novo assinante
    }
  }

  unsubscribe(callback: Callback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  getLatestData() {
    return this.latestData; // Retorna os dados mais recentes
  }
}

export default WebSocketManager;
