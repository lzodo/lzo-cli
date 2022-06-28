const program = require("commander");
const shell = require("shelljs")
//https://github.com/shelljs/shelljs

const shellCommands = () => {
    program
        .command("cd <key>")
        .description("进入")
        .action((val)=>{
            shell.echo(val);
            // shell.cd(val);
            // shell.touch("test-del.txt")
            // shell.cat("package.json")
            shell.cd("D:/lzo-project/SMALL/lianxi")
            shell.echo(shell.ls());
        });
}

module.exports = shellCommands;