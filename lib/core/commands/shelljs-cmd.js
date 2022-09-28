const program = require("commander");
const shell = require("shelljs");
const { execAction,getpathAction,pullGetAction } = require("../actions/shell-action");
//https://github.com/shelljs/shelljs

const shellCommands = () => {
    program
        .command("cd <key>")
        .description("进入")
        .action((val) => {
            shell.echo(val);
            // shell.cd(val);
            // shell.touch("test-del.txt")
            // shell.cat("package.json")

            shell.cd("D:/lzo-project/SMALL/lianxi");
            shell.echo(shell.ls());
        });

    program
        .command("exec")
        .description("执行一些脚本")
        .action(execAction);

    program
        .command("path <key>")
        .description("获取程序所在路径")
        .action(getpathAction);

    program
        .command("pull <key>")
        .description("pull 自己 指定设备的 git 项目")
        .action(pullGetAction);
};

module.exports = shellCommands;
