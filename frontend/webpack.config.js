// т.к. будем работать с путями, реквайрим нативный модуль path
const path = require("path");

// ставим плагин для того, чтобы содержимое папки dist перезаписывалось после новой сборки
// ставим с флагом --save dev, т.е. плагин добавится в devDependencies
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// устанавливаем плагин, который будет генерировать файд html, содержащий все наши бандлы
const HtmlWebpackPlugin = require("html-webpack-plugin");

// устанавливаем плагин для создания файла css и привязки на стили через link 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// устанавливаем модуль для чтения разных файлов и добавления их в выдачу
// ВАЖНО: оказался не тот лоадер
const fileLoader = require("file-loader");

// для того, чтобы вебпак сам перезагружался, ставим плагин для этого
// также, мы в package.json в скриптах дописали watch для него
// и т.к. это плагин, ниже его инициализируем
const BrowserSyncWebpackPlugin = require("browser-sync-webpack-plugin");

// через терминал устанавливаем Babel, который будет переводить код в понятный для всех браузеров стандарт. В документации выбираем в какой проект будем ставить (в нашем случае, в webpack)

// устанавливаем пресеты (группа плагинов) к Babel: npm i --save-dev @babel/preset-react @babel/preset-env

// устанавливаем черех терминал npm i react react-dom, уже не в Devdependensies,  а в обычные

module.exports = {
    // указываем, что режим будет разработки (также можно включить production)
    mode: "development",
    // точка входа (т.к. используем полифил для babel, надо указать путь через полифил)
    entry: ["babel-polyfill", "./src/index.jsx"],
    // точка выхода (то, что вебпак отдает после сборки)
    output: {
        // путь (по умолчанию такой, но можно поставить любой)
        path: path.resolve(__dirname, "dist"),
        // файл bundle, который принимает в себя все готовое
        filename: "bundle.js"
    },
    // добавляем раздел для того, чтобы вебпак понимал не только файлы js, но и css, sass и прочее
    module: {
        // массив правил для файлов, которые вебпак будет через себя прогонять
        rules: [
            // следующий код для прописи стилей в head в теге style
            // {
                // test: /\.css$/,
                // передаем также загрузчики (через них вебпак будет прогонять вышеуказанные файлы и не будет выкидывать ошибку)
                // ставим эти лоадеры также через npm
                // use: [{loader: "style-loader"}, {loader: "css-loader"}]
            // }
            // чтобы стили появились в новом файле и были подключены через link
            // ставим плагин miniCssExtractPlugin
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                ],
              },

              // теперь правила для fileLoader (ВАЖНО - оказался не тот лоадер)
              {
                  test: /\.(png|jpe?g|gif)$/,
                  use: [
                      {
                        loader: "file-loader",
                        options: {
                            outputPath: "img",
                            // паттерн для имени
                            name: "[name].[ext]"
                        }
                      }
                  ]
              },

              // добавляем правило для Babel (из документации)
              {
                  test: /\.jsx?$/,
                  exclude: /node_modules/,
                  loader: "babel-loader",
                  // дописываем сами, какие пресеты мы установили дополнительно
                  query: {
                      presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                      ]
                  }
                },
            // праивло для загрузки шрифтов (почему-то пока не работает)
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'ttf-loader',
                        options: {
                            name: './fonts/[hash].[ext]',
                        },
                    },
                ]
            }
        ]
    },
    // создаем массив с плагинами и будем их иницализировать здесь (как и в сервере)
    plugins: [
        new CleanWebpackPlugin ({
            // флаг из документации, показывающий что будем удалять
            cleanOnceBeforeBuildPatterns:
                path.resolve(__dirname, "dist")
        }),
        // инициализируем плагин HtmlWebpackPlugin
        new HtmlWebpackPlugin ({
            // прописываем путь до шаблона
            template: path.resolve(__dirname, "src/index.html"),
            // указываем, какой файл будет создаваться на выходе в папке dist
            filename: "index.html"
        }),
        // подключаем плагин для создания отдельного файла и подключения css
        new MiniCssExtractPlugin ({
            filename: "styles.css",
        }),
        // подключаем плагин для автоматической перезагрузки кода
        new BrowserSyncWebpackPlugin ({
            host: "localhost",
            port: 3000,
            server: { baseDir: ["dist"] }
        })
    ],
    // добавим чтобы react при импорте файлов сам подставлял расширения
    resolve: {
        extensions: [".js", ".jsx", ".css"]
    }
};