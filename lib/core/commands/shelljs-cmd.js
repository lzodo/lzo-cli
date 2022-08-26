const program = require("commander");
const shell = require("shelljs");
const { execAction } = require("../actions/shell-action");
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

    // program
    //     .command("test <key>")
    //     .description("测试")
    //     .action((val) => {
    //         console.log(shell.which(val).stdout);
    //         shell.exec("bash ./gitlist.sh");
    //     });

    program
        .command("test <key>")
        .description("执行")
        .action(execAction);
};

module.exports = shellCommands;
