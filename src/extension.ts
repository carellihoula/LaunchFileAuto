import * as vscode from "vscode";
import WebSocket from "ws";

let ws: WebSocket;

export function activate(context: vscode.ExtensionContext) {
  ws = new WebSocket("ws://127.0.0.1:8000/ws");

  ws.on("open", () => {
    console.log("​✅​ Connected to the WebSocket");
  });

  ws.on("message", (data: WebSocket.Data) => {
    const message = data.toString();
    console.log("Message brut reçu :", message);
    const jsonData = JSON.parse(message);
    if (jsonData.topic === "open_file") {
      const filePath = jsonData.message;
      vscode.window.showInformationMessage(`opened file : ${filePath}`);
      vscode.workspace.openTextDocument(filePath).then((doc) => {
        vscode.window.showTextDocument(doc);
      });
    }
  });

  ws.on("error", (error) => console.error("Error from WebSocket:", error));
  ws.on("close", () => console.log("🚪 WebSocket is closed"));
}

export function deactivate() {
  if (ws) {
    ws.close();
  }
}
