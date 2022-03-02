const program = require("commander");
const {
    getSystemInfoAction,
    openInternetAction,
    openSelectInternetAction,
} = require("./actions-system");

const systemToolCmds = () => {
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
    program.command("o").description("选择").action(openSelectInternetAction);
};

module.exports = systemToolCmds;
