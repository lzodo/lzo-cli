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

const pullGetAction = (key) => {
    switch(key){
        case "dell":
            pullDell();
            break;
        case "le":
            pullLenovo();
            break;
    }
}
function pullDell(){
    let dellList = require("../../data/git-list/dell.json");
    Object.keys(dellList).forEach(item=>{
        console.log(`${item} 数据同步中...`)
        shell.cd(dellList[item]);
        shell.exec(`git pull`);
    })
}
function pullLenovo(){
    let dellList = require("../../data/git-list/lenovo.json");
    Object.keys(dellList).forEach(item=>{
        console.log(`${item} 数据同步中...`)
        shell.cd(dellList[item]);
        shell.exec(`git pull`);
    })
}

module.exports = {
    execAction,
    getpathAction,
    pullGetAction
};
