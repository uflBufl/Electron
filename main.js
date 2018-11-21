const electron = require('electron');
const app = electron.app;  // Модуль контролирующей жизненный цикл нашего приложения.
const BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.
const Menu = electron.Menu;

// Опционально возможность отправки отчета о ошибках на сервер проекта Electron.
electron.crashReporter.start();

// Определение глобальной ссылки , если мы не определим, окно
// окно будет закрыто автоматически когда JavaScript объект будет очищен сборщиком мусора.
var mainWindow = null;
var addWindow = null;

// Проверяем что все окна закрыты и закрываем приложение.
app.on('window-all-closed', function() {
  // В OS X обычное поведение приложений и их menu bar
  //  оставаться активными до тех пор пока пользователь закроет их явно комбинацией клавиш Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Этот метод будет вызван когда Electron закончит инициализацию 
// и будет готов к созданию браузерных окон.
app.on('ready', function() {
  // Создаем окно браузера.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // и загружаем файл index.html нашего веб приложения.
  mainWindow.loadURL('file://' + __dirname + '/topology.html');

  // Открываем DevTools.
  mainWindow.webContents.openDevTools();

  // Этот метод будет выполнен когда генерируется событие закрытия окна.
  mainWindow.on('closed', function() {
	// Удаляем ссылку на окно, если ваше приложение будет поддерживать несколько     
        // окон вы будете хранить их в массиве, это время 
        // когда нужно удалить соответствующий элемент.
    mainWindow = null;
  });

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){
// Создаем окно браузера.
addWindow = new BrowserWindow({width: 400, height: 300, title: "Add Shoping List Item"});

// и загружаем файл addWindow.html нашего веб приложения.
addWindow.loadURL('file://' + __dirname + '/addWindow.html');

// Открываем DevTools.
// addWindow.webContents.openDevTools();

// Этот метод будет выполнен когда генерируется событие закрытия окна.
addWindow.on('closed', function() {
// Удаляем ссылку на окно, если ваше приложение будет поддерживать несколько     
      // окон вы будете хранить их в массиве, это время 
      // когда нужно удалить соответствующий элемент.
      addWindow = null;
});
}


//Create menu template
const mainMenuTemplate = [
{
  label:"File",
  submenu:[
    {
      label:"Save",
      click(){
        // createAddWindow();
      }
    },
    {
      label:"Open"
    },
    {
      label:"Load Pattern"
    },
    {
      label:"Create New"
    },
    {
      label:"Quit",
      accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
      click(){
        app.quit();
      }
    }
  ]
},
{
  label: "About the program",
  submenu:[
    {
      label:"information about developers",
      click(){
        createAddWindow();
      }
    }
  ]
}
];

if(process.platform == "darwin"){
  mainMenuTemplate.unshift({});
}