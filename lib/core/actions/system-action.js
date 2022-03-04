const path = require("path");
const os = require("os");

const programOpts = require("commander").opts(); // 拿到全局option配置的参数
const open = require("open");
const inquirer = require("inquirer");
const chalk = require("chalk"); //v.5 以上必须用import 导入了
// const logs = require("log-symbols") //终端图标库
// import logs from "log-symbols"; //终端图标库
const ora = require("ora"); // 终端动画库
var log = require('npmlog')

const internetList = require("../../data/Internet.json");
const { getAttributes } = require("../../config/lzo.config");
const { lzoCreatFile, readInput } = require("../../utils");

const creatFileAction = (name, option) => {
    // 如果存在 --host 获取用户的 hostDir 为 basePath,否则使用户所在路径
    let basePath = option.host ? getAttributes("hostDir") : path.resolve("");
    // 如果hostDir不存在 或者为空也使用户所在路径
    if (!basePath || !basePath.split(" ").join("")) {
        basePath = path.resolve("");
    }

    lzoCreatFile(basePath, name);
};

const getSystemInfoAction = () => {
    const spinner = ora("Loading unicorns").start();
    console.log(chalk.blue("Hello") + " World" + chalk.red("!"));
    // console.log(logs.success(`处理器 ${os.cpus().length}核 ${os.cpus()[0].model}`));
    log.disableProgress()
    log.silly('silly', 'I have a kitty cat: %j', "myKittyCat");
    log.verbose('verbose', 'I have a kitty cat: %j', "myKittyCat");
    log.http('http', 'I have a kitty cat: %j', "myKittyCat");
    log.info('info', 'I have a kitty cat: %j', "myKittyCat");
    log.warn('warn', 'I have a kitty cat: %j', "myKittyCat");
    log.error('error', 'I have a kitty cat: %j', "myKittyCat");
    log.silly('bugs', 'url', "http://www.baidu.com")
    log.newItem();
    log.verbose(
        'audit',
        'installing',
        [1,2,3]
      )
    console.log(`CPU架构 ${os.arch()}`);
    console.log(`总内存 ${os.totalmem()}`);
    console.log(`系统名称 ${os.type()}`);
    console.log(`主机名 ${os.hostname()}`);
    console.log(`系统平台 ${os.platform()}`);
    console.log(`运行时间 ${os.uptime()}`);
    console.log(`临时文件目录 ${os.tmpdir()}`);
    console.log(`用户家目录 ${os.homedir()}`);
    // console.log(`行尾标记`,os.EOL.toString()); //看不到
    setTimeout(()=>{
        spinner.stop();
    },3000)
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
const getSystemEnvAction = () => {
    console.log(process.env);
};

module.exports = {
    creatFileAction,
    getSystemInfoAction,
    openSelectInternetAction,
    getSystemEnvAction,
};
