const program = require("commander");
const {
    cloneObjectToDemo,
    creatCpnAction,
    setConfigAction,
    getConfigAction,
    creatFileAction,
} = require("../actions/vue-action");

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
};

module.exports = createCommands;
