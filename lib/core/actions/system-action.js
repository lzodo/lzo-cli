const path = require("path");
const os = require("os");

const open = require("open");
// const { shell } = require('electron') //可打开文件夹 暂时无效
const inquirer = require("inquirer");
const chalk = require("chalk"); //v.5 以上必须用import 导入了
const logSymbols = require("log-symbols") //终端图标库
// import logs from "log-symbols"; //终端图标库
const ora = require("ora"); // 终端动画库
var log = require('npmlog')

const internetList = require("../../data/Internet.json");
const { getAttributes } = require("../../config/lzo.config");
const { lzoCreatFile, readInput } = require("../../utils");
const { commandSpawn,commandExec } = require("../../utils/terminal");

const creatFileAction = (name, option) => {
    // 如果存在 --host 获取用户的 hostdir 为 basePath,否则使用户所在路径
    let basePath = option.hostdir ? getAttributes("hostdir") : path.resolve("");
    // hostdir 或者为空也使用户所在路径
    if (!basePath || !basePath.split(" ").join("")) {
        basePath = path.resolve("");
    }

    lzoCreatFile(basePath, name);
};

const getSystemInfoAction = () => {
    const spinner = ora("Loading unicorns").start();
    console.log(chalk.blue("Hello") + " World" + chalk.red("!"));
    log.info("处理器", chalk.blue(os.cpus().length + "核 ") + os.cpus()[0].model)
    log.info("CPU架构", os.arch())
    log.info("总内存", os.totalmem())
    log.info("endianness", os.endianness())
    // log.info("getPriority", os.getPriority())
    // log.info("loadavg", os.loadavg())
    log.info("release", os.release())
    log.info("version", os.version())
    log.info("cpus", os.cpus())
    
    
    console.log(logSymbols.success, `系统名称 ${os.type()}`);
    console.log(logSymbols.success, `主机名 ${os.hostname()}`);
    console.log(logSymbols.success, `系统平台 ${os.platform()}`);
    console.log(logSymbols.success, `运行时间 ${os.uptime()}`);
    console.log(logSymbols.success, `临时文件目录 ${os.tmpdir()}`);
    console.log(logSymbols.success, `用户家目录 ${os.homedir()}`);
    // console.log(`行尾标记`,os.EOL.toString()); //看不到
    log.info("userInfo", os.userInfo())
    log.info("networkInterfaces", os.networkInterfaces())
    setTimeout(() => {
        spinner.stop();
    }, 1000)
};

const openSelectInternetAction = (option) => {
    // 选择浏览器参数
    let browserKeys = Object.keys(open.apps);
    const choices = browserKeys;
    choices.push("default");
    choices.push(new inquirer.Separator());

    //选择网址
    let intArr = Object.keys(internetList.work);
    let title = "work"

    // 利用指令里的option
    if (option.lazy) {
        title = "lazy"
        intArr = Object.keys(internetList.lazy);
    } else if (option.docs) {
        title = "docs"
        intArr = Object.keys(internetList.docs);
    }
    intArr.push("自定义");

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
                data.list.forEach(async (element) => {
                    if (element == "自定义") {
                        let inputInfo = await readInput("请输入:");
                        open(inputInfo);
                    } else {
                        open(internetList[title][element]);
                    }
                });
            } else {
                data.list.forEach(async (element) => {
                    if (element == "自定义") {
                        let inputInfo = await readInput("请输入:");
                        open(inputInfo, {
                            app: { name: open.apps[data.letter] },
                        });
                    } else {
                        console.log(internetList[title][element])
                        open(internetList[title][element], {
                            app: { name: open.apps[data.letter] },
                        });
                    }
                });
            }
        });
};

const docOpenAction = (option) => {
    console.log(option.local)
    if (option.local) {
        // commandExec(`explorer ${path.resolve(getAttributes("doc"))} `,{})
        // commandExec(`explorer ${path.resolve(getAttributes("doc"))}`,{})
        // commandExec(`cd ${path.resolve(getAttributes("doc"))}`,{})

        // console.log(path.resolve(getAttributes("doc"),"test.js"))
        // commandSpawn(`node`,[path.resolve(getAttributes("doc"),"test.js")],{}) //执行
        // commandSpawn(process.platform === "win32" ? "explorer" : "open",[path.reshttps://lzo-gitee.gitee.io/docs/other-weblinks/olve(getAttributes("doc"))],{}) //执行
        open(getAttributes("doc"));
    } else {
        open(getAttributes("doc"));
    }
}

const openDirAction = ()=>{
    open('.')
}

const getSystemEnvAction = () => {
    console.log(process.env);
};


module.exports = {
    creatFileAction,
    getSystemInfoAction,
    openSelectInternetAction,
    getSystemEnvAction,
    docOpenAction,
    openDirAction
};
