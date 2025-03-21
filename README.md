# LaunchFileAuto Extension

This extension allows you to automatically open a file based on a clicked node in the interface. This document details the steps to create, install, and package the extension...

## Prerequisites

- **Node.js** (version 14 or higher is recommended)
- **npm** (included with Node.js)
- **Code‑Server** or **VS Code**

## Installing the Creation Tools

To generate the basic structure of the extension, install Yeoman and the VSCode extension generator globally:

```bash
npm install -g yo generator-code
```

## Creating the Extension

Generate the scaffold of your extension by running:

```bash
yo code
```

Follow the on-screen instructions to configure your extension (choose the type, name, description, etc.).

## Installing Dependencies

In your project directory, install the dependencies with:

```bash
npm install
```

## Packaging the Extension

To create the VSIX package for your extension, run:

```bash
vsce package --out your-extension.vsix
```

#### For Example :

```bash
vsce package --out launchfileauto-latest.vsix
```

If you need to prepare your extension for pre-publishing, run:

```bash
npm run vscode:prepublish
```

## Installing the Extension in code‑server

Once the VSIX package is generated, you can install the extension in code‑server using:

```bash
code-server --install-extension /path/to/your/extension/your-extension.vsix
```

#### For Example :

```bash
code-server --install-extension launchfileauto-0.0.1.vsix
```

## Usage

After installation, restart code‑server if necessary. The extension will appear in the list of installed extensions and will be activated automatically.  
During development, you can launch a development instance by pressing `F5` in VS Code to test your extension.
