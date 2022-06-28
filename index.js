#!/usr/bin/env node
// require('babel-polyfill');
// require('babel-register');
const program = require("commander");

const helpOptions = require("./lib/core/help");
const vueCommands = require("./lib/core/commands/vue-cmd");
const configCommands = require("./lib/core/commands/config-cmd");
const systemCommands = require("./lib/core/commands/system-cmd");
const shellCommands = require("./lib/core/commands/shelljs-cmd");

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

shellCommands()

// 继续传入的参数
program.parse(process.argv)



//chalk 
// const programOpts = require("commander").opts(); //获取 program.option 设置的参数


//https://www.jianshu.com/p/7b43cefe3e4e
// npm install --save-dev babel-cli babel-preset-env # babel-cli 和 es6+ 最新语法 
// $ npm install --save-dev babel-preset-stage-0 # es6+ 阶段性提案语法 stage-0 包含stage1,2,3
// $ npm install --save-dev babel-register # 钩子，在程序入口文件引入即可实现转码
// $ npm install --save babel-polyfill # babel转码时不能识别一些全局对象的API，例如Object.assign，使用它可以解决这个问题

//https://juejin.cn/post/6986579627829362724
//https://blog.csdn.net/github_26672553/article/details/61919177