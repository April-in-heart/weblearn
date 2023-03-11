import count from "./js/count"
import sum from "./js/sum"
// 引入css资源
import "./css/index.css"
// 引入less资源
import "./less/index.less"
// 引入sass资源
import "./sass/index.sass"
// 引入scss资源
import "./sass/index.scss"
// 引入stylus资源
import "./stylus/index.styl"
// 引入字体图标
import "./css/iconfont.css"

//引入音频文件,引入后才会打包进dist中
import './media/林俊杰 - 背对背拥抱 (Live).mp3'

//在.eslintrc.js中配置了no-var规则，所以用var会报错
//var i=10
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4)); 