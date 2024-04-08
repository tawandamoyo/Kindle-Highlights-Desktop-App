# Introduction
This is a simple desktop application for managing Kindle Highlights. It is built using Electron.

![[Nota Demo]](/nota-electron-demo.gif)

A command line version of the same tool can be found [here](https://github.com/tawandamoyo/kindle-tool-cli)


## Usage 

Running from the terminal. 

Run:

```bash
npm init
npm start
```

## Packaging

The application can be packaged using Electron Forge.

```bash
npx electron-forge import
npm run make
```

This will generate a distributable in `out/make/`. To configure OS-specific formats see the [Makers](https://www.electronforge.io/config/makers) docs.

