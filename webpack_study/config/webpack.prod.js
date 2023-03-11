const path=require("path");//nodejs核心模块，用来处理路径问题
const ESLintPlugin=require('eslint-webpack-plugin');//引入eslint自动检查代码
const HtmlWebpackPlugin=require('html-webpack-plugin');//引入html-webpack-plugin使html文件自动引入js文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//引入mini-css-extract-plugin提取css成单独文件
const CssMinimizerPlugin=require("css-minimizer-webpack-plugin");//引入css-minimizer-webpack-plugin压缩css

//用来获取处理样式的loader
function getStyleLoader(pre){
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader:"postcss-loader",
            options:{
                postcssOptions:{
                    plugins:[
                        "postcss-preset-env"
                    ]
                }
            }
        },
        pre,
    ].filter(Boolean)// cssloader不需要后面的参数，所以使用时不写参数识别为为undefined，用filter过滤掉
}


module.exports = {
    // 入口
    entry:"./src/main.js",
    // 输出
    output:{
        // 文件输出文件夹目录,要用绝对路径
        path:path.resolve(__dirname,'../dist'),
        // 文件名
        filename:"static/js/main2.js",
        // 打包前将上面path整个目录清空再打包
        clean:true
    },
    // 加载器
    module:{
        rules:[{
            // 检测以.css结尾的文件
            test:/\.css$/,
            // use中从下往上执行
            // 将js中css通过创建style标签的形式添加到html文件中生效
            // 这里用MiniCssExtractPlugin.loader将css文件打包成单独的文件，不写入js中，优化性能
            // 将css资源编译成commonjs模块到js中，相当于将css放入js中
            use:getStyleLoader()
        },{
            test:/\.less$/,
            use:getStyleLoader("less-loader")
        },{
            test:/\.s[ac]ss$/,
            use:getStyleLoader("sass-loader")
        },{
            test:/\.styl$/,
            use:getStyleLoader("stylus-loader")
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
        }),
        new MiniCssExtractPlugin({
            filename:"static/css/main.css"
        }),
        new CssMinimizerPlugin(),
    ],
    // 模式
    mode:"production"
}