#!/usr/bin/env node
const program = require("commander");

// 定义 输入zo --version 或 -V 显示1.0.0, --version规则是commander里定义好的
// program.version("1.0.0")
program.version(require("./package.json").version)

// --help 默认显示已有可选参数
// 增加自己的option
program.option("-A --add", '这是一个自定义帮助选项的测试')
program.option("-D --dest <dest>", "指令跟随-d、--dest 必须传入一个参数：如 zo -d /a/b/c")

// 监听指令
program.on("--help",()=>{
    console.log(" 你需要帮助吗")
})

// 继续传入的参数
program.parse(process.argv)
// console.log(program.dest)
