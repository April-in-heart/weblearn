module.exports = {
    "extends": ["eslint:recommended"],
    env:{
        node:true,// 启用node中全局变量
        browser:true// 启用浏览器中全局变量
    },
    parserOptions:{
        ecmaVersion:6,// es6
        sourceType:"module"// es module语法
    },
    "rules": {
        "no-var":2// 禁止使用var定义变量，2为报错并退出程序,1为只警告，0为关闭此规则
    }
}