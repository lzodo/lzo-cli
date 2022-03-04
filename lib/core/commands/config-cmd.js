const program = require("commander");
const {
    setConfigAction,
    getConfigAction,
    localConfigAction
} = require("../actions/config-action");

const configCommands = () => {
    // 设置配置参数
    //   hostDir设置主文件夹路径,当执行host相关指令时,不需要关注终端所在位置，直接在该参数位置下操作
    program
        .command("set-config <key> <value>")
        .description("设置cli全局参数")
        .action(setConfigAction);

    // 设置配置参数
    program
        .command("get-config <key>")
        .description("获取cli全局参数")
        .action(getConfigAction);

    program
        .command("config")
        .description("本地参数配置")
        .option("-c, --color", "set color true")
        .option("-C, --no-color", "set color false")
        .option("-r, --hostdir", "设置主目录")
        .option("-R, --no-hostdir", "取消朱目录")
        .action(localConfigAction);
};

module.exports = configCommands;
