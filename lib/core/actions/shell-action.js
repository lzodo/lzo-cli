const inquirer = require("inquirer");
const shell = require("shelljs");
const path = require("path");

const execAction = (key) => {
    shell.cd(path.resolve(__dirname, "../../data/shell-list"));
    shell.echo(shell.pwd());
    let list = shell.ls();

    list = list.filter((item) => item.endsWith(".sh"));
    inquirer
        .prompt([
            {
                type: "list",
                name: "list",
                message: "请选择脚本",
                choices: list,
            },
        ])
        .then((data) => {
            console.log(data);
            switch (data.list) {
                case "gitsearch.sh":
                    break;
                default:
                    shell.exec(`bash ${data.list}`);
            }
        });
};

const getpathAction = (key) => {
    shell.echo(shell.which(key));
};

module.exports = {
    execAction,
    getpathAction,
};
