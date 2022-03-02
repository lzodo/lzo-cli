const program = require("commander");
const {
    getSystemInfoAction,
    openInternetAction,
    openSelectInternetAction,
    creatFileAction,
    getSystemEnvAction
} = require("../actions/system-action");

const systemCommands = () => {
    // 创建文件
    program
        .command("createfile <key-name>")
        .description("创建文件")
        .action(creatFileAction);

    // cp 复制指令

    //创建项目指令 指令名称 项目名称 其他参数s
    program
        .command("getosinfo")
        .description("获取系统信息")
        .action(getSystemInfoAction);

    //打开浏览器
    program
        .command("open <Internet>")
        .description("打开网站")
        .action(openInternetAction);

    program
        .command("o")
        .description("选择打开页面")
        .action(openSelectInternetAction);

    program
        .command("env")
        .description("获取环境变更了")
        .action(getSystemEnvAction);
};

module.exports = systemCommands;
