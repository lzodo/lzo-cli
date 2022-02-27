#!/usr/bin/env node
const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create")

// 定义 输入zo --version 或 -V 显示1.0.0, --version规则是commander里定义好的
// program.version("1.0.0")
program.version(require("./package.json").version)

//导入帮助模块
helpOptions();

//创建指令
createCommands();

// 继续传入的参数
program.parse(process.argv)
