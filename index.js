#!/usr/bin/env node
const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");
const systemToolCmds = require("./lib/core/create-system")

// 定义 输入zo --version 或 -V 显示1.0.0, --version规则是commander里定义好的
// program.version("1.0.0")
program.version(require("./package.json").version)

//导入帮助模块
helpOptions();

//创建cli相关指令
createCommands();

//其他操作指令
systemToolCmds();

// 继续传入的参数
program.parse(process.argv)
