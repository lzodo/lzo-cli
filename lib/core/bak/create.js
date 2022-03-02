const program = require("commander");
const {
    cloneObjectToDemo,
    creatCpnAction,
    setConfigAction,
    getConfigAction,
    creatFileAction,
} = require("./actions");

const createCommands = () => {
    //创建项目指令 指令名称 项目名称 其他参数s
    program
        .command("create <project-name> [others...]")
        .description("创建一个vue项目")
        .action(cloneObjectToDemo);

    // 添加组件指令
    program
        .command("addcpn <vue-cpn-name>")
        .description("创建一个vue组件,默认src/components 或通过 -D 指定路径")
        .action(creatCpnAction);

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

    // 创建文件
    program
        .command("createfile <key-name>")
        .description("创建文件")
        .action(creatFileAction);

    // cp 复制指令
};

module.exports = createCommands;
