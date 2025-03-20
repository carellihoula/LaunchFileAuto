import * as vscode from "vscode";
import WebSocket from "ws";

let ws: WebSocket | null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const reconnectInterval = 5000;

export function activate(context: vscode.ExtensionContext) {
  // Function to establish a WebSocket connection
  const connect = () => {
    ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.on("open", () => {
      console.log("✅ Connected to the WebSocket");
      reconnectAttempts = 0; // Reset reconnection attempts on successful connection

      // Subscribe to the 'open_file' topic
      // logic not yet implemented on server side
      /*const subscribeMessage = JSON.stringify({
        action: "subscribe",
        topic: "open_file",
      });
      ws?.send(subscribeMessage);*/
    });

    ws.on("message", (data: WebSocket.Data) => {
      const message = data.toString();
      console.log("Raw message received:", message);
      try {
        const jsonData = JSON.parse(message);
        if (jsonData.topic === "open_file") {
          const filePath = jsonData.message;
          vscode.window.showInformationMessage(`Opened file: ${filePath}`);
          vscode.workspace.openTextDocument(filePath).then((doc) => {
            vscode.window.showTextDocument(doc);
          });
        }
      } catch (error) {
        console.error("Error parsing JSON message:", error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", () => {
      console.log("🚪 WebSocket is closed");
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(
          `Attempting to reconnect in ${
            reconnectInterval / 1000
          } seconds... (Attempt ${reconnectAttempts}/${maxReconnectAttempts})`
        );
        setTimeout(connect, reconnectInterval);
      } else {
        console.error(
          "Maximum reconnection attempts reached. No further attempts will be made."
        );
      }
    });
  };

  // Initiate the first connection
  connect();

  // Ensure the WebSocket is closed when the extension is deactivated
  context.subscriptions.push({
    dispose: () => {
      if (ws) {
        ws.close();
      }
    },
  });
}

export function deactivate() {
  if (ws) {
    ws.close();
  }
}
