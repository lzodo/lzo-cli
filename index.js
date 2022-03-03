#!/usr/bin/env node
const program = require("commander");

const helpOptions = require("./lib/core/help");
const vueCommands = require("./lib/core/commands/vue-cmd");
const configCommands = require("./lib/core/commands/config-cmd");
const systemCommands = require("./lib/core/commands/system-cmd");

// import chalk from "chalk";
// console.log(chalk.blue('Hello world!'));

// 定义 输入zo --version 或 -V 显示1.0.0, --version规则是commander里定义好的
// program.version("1.0.0")
program.version(require("./package.json").version)

//导入帮助模块
helpOptions();

//相关指令
vueCommands()
configCommands()
systemCommands()

// 继续传入的参数
program.parse(process.argv)



//chalk 
// const programOpts = require("commander").opts(); //获取 program.option 设置的参数