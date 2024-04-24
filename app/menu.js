const { Menu, shell, globalShortcut } = require("electron");

const template = [
  {
    label: "Load file",
    accelerator: "CommandOrControl+O",
    click() {
      loadFile();
    },
  },
  {
    role: "help",
    submenu: [
      {
        label: "About This Kindle Thing",
        click() {
          shell.openExternal("https://tawanda.dev/kindle");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
