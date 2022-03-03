const path = require("path");
const os = require("os");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const programOpts = require("commander").opts();
const open = require("open");
const inquirer = require("inquirer");

const internetList = require("../../data/Internet.json");
const internetLazyList = require("../../data/Internet.lazy.json");
const { getAttributes } = require("../../config/lzo.config");
const { lzoCreatFile } = require("../../utils");





const creatFileAction = (name) => {
    // 如果存在 --host 获取用户的 hostDir 为 basePath,否则使用户所在路径
    let basePath = programOpts.host
        ? getAttributes("hostDir")
        : path.resolve("");
    // 如果hostDir不存在 或者为空也使用户所在路径
    if (!basePath || !basePath.split(" ").join("")) {
        basePath = path.resolve("");
    }

    lzoCreatFile(basePath, name);
};

const getSystemInfoAction = () => {
    console.log(os.cpus());
};

const openInternetAction = (Internet) => {
    let browserKeys = Object.keys(open.apps);
    const choices = browserKeys;
    choices.push("default");
    choices.push(new inquirer.Separator());

    inquirer
        .prompt([
            {
                type: "list",
                loop: false,
                name: "letter",
                message: "请选择访问浏览器?",
                choices,
            },
        ])
        .then((data) => {
            if (data.letter == "default") {
                open(Internet);
            } else {
                open(Internet, { app: { name: open.apps[data.letter] } });
            }
        });
};
const openSelectInternetAction = () => {
    // 选择浏览器参数
    let browserKeys = Object.keys(open.apps);
    const choices = browserKeys;
    choices.push("default");
    choices.push(new inquirer.Separator());

    //选择网址
    let intArr = Object.keys(internetList);
    if (programOpts.lazy) {
        intArr = Object.keys(internetLazyList);
    }
    intArr.push("自定义")

    inquirer
        .prompt([
            {
                type: "list",
                loop: false,
                name: "letter",
                message: "请选择访问浏览器?",
                choices,
            },
            {
                type: "checkbox",
                name: "list",
                message: "请选择网址",
                choices: intArr,
            },
        ])
        .then((data) => {
            console.log(JSON.stringify(data, null, "  "));
            if (data.letter == "default") {
                data.list.forEach((element) => {
                    open(internetList[element]);
                });
            } else {
                data.list.forEach((element) => {
                    console.log(element)
                    if (element == "自定义") {
                        readline.question(`你叫什么名字?`, name => {
                            console.log(`你好 ${name}!`)
                            readline.close()
                        })

                    } else {
                        open(internetList[element], {
                            app: { name: open.apps[data.letter] },
                        });
                    }
                });
            }
        });
};
const getSystemEnvAction = () => {
    console.log(process.env)
}
module.exports = {
    creatFileAction,
    getSystemInfoAction,
    openInternetAction,
    openSelectInternetAction,
    getSystemEnvAction
};
