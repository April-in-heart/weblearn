const path=require("path");//nodejs核心模块，用来处理路径问题
const ESLintPlugin=require('eslint-webpack-plugin');//引入eslint
const HtmlWebpackPlugin=require('html-webpack-plugin');//引入html-webpack-plugin


module.exports = {
    // 入口
    entry:"./src/main.js",
    // 输出
    output:{
        // 文件输出文件夹目录,要用绝对路径
        // 开发模式没有输出
        path:undefined,
        // 文件名
        filename:"static/js/main2.js",
        // 打包前将上面path整个目录清空再打包
        // clean:true
    },
    // 加载器
    module:{
        rules:[{
            // 检测以.css结尾的文件
            test:/\.css$/,
            // use中从下往上执行
            use:[
                // 将js中css通过创建style标签的形式添加到html文件中生效
                "style-loader",
                // 将css资源编译成commonjs模块到js中，相当于将css放入js中
                "css-loader"
            ]
        },{
            test:/\.less$/,
            use:[
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        },{
            test:/\.s[ac]ss$/,
            use:[
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },{
            test:/\.styl$/,
            use:[
                "style-loader",
                "css-loader",
                "stylus-loader"
            ]
        },{
            test:/\.(png|jpe?g|gif|webp|svg)$/,
            type:"asset",
            parser:{
                dataUrlCondition:{
                    maxSize:20 * 1024,//小于多少kb才做处理，一般是10kb
                }
            },
            generator:{
                // 输出图片名称
                // [hash:10] hash值取前10位
                filename:"static/images/[hash:10][ext][query]"
            }
        },{
            test:/\.(tff|woff2?|mp3|mp4|avi)$/,
            type:"asset/resource",
            generator: {
                // 处理字体图标和媒体文件
                filename: 'static/media/[hash:10][ext][query]'
              }
        },{
            test: /\.js$/,
            exclude: /(node_modules)/,//排除node_modules文件不处理,提高处理速度
            loader:"babel-loader"
          }
    ]
    },
    // 插件
    plugins:[
        new ESLintPlugin({
            //context设置检查哪些文件,用绝对路径
            context:path.resolve(__dirname,"../src")
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html")
        })
    ],
    //开发服务器
    devServer:{
        host:"localhost",
        port:"3000",
        open:true,// 是否自动打开浏览器
    },
    // 模式
    mode:"development"
}