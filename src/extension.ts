import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "auto-open-file" activated.');

  let filePath: string | null = null;

  // Si l'extension s'exécute dans un environnement Web (Code‑Server)
  if (
    vscode.env.uiKind === vscode.UIKind.Web &&
    typeof window !== "undefined" &&
    window.location &&
    window.location.search
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    filePath = urlParams.get("file");
    console.log(`File parameter from URL: ${filePath}`);
  }

  // Sinon, pour un environnement Node, tenter de récupérer dans process.argv
  if (!filePath && process.argv) {
    const fileArg = process.argv.find((arg) => arg.startsWith("--file="));
    if (fileArg) {
      filePath = fileArg.substring("--file=".length);
      console.log(`File parameter from process.argv: ${filePath}`);
    }
  }

  if (filePath) {
    const fileUri = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(fileUri).then(
      (doc) => {
        vscode.window.showTextDocument(doc);
        console.log(`Opened file: ${filePath}`);
      },
      (err) => {
        vscode.window.showErrorMessage(`Failed to open file: ${filePath}`);
        console.error(`Error opening file ${filePath}:`, err);
      }
    );
  } else {
    console.log("No file parameter found in URL or process arguments.");
  }
}

export function deactivate() {
  // Nothing to do on deactivation
}
