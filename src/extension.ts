import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "auto-open-file" activated.');

  let filePath: string | null = null;

  // Vérifier si nous sommes dans un environnement web (Code‑Server)
  if (
    typeof window !== "undefined" &&
    window.location &&
    window.location.search
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    filePath = urlParams.get("file");
    console.log(`File path from URL: ${filePath}`);
  }

  // Si aucun paramètre trouvé dans l'URL, tenter de lire process.argv (en environnement Node)
  if (!filePath) {
    const fileArg = process.argv.find((arg) => arg.startsWith("--file="));
    if (fileArg) {
      filePath = fileArg.substring("--file=".length);
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
    console.log("No file parameter found.");
  }
}

export function deactivate() {
  // Rien à faire à la désactivation
}
