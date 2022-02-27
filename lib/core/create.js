const program = require("commander");
const { cloneObjectToDemo, creatCpnAction } = require("./actions")

const createCommands = () => {
    program.command("create <project-name> [others...]")  // 指令名称 项目名称 其他参数s
        .description("创建一个vue项目")
        .action(cloneObjectToDemo)

    program.command("addcpn <vue-cpn-name>")
        .description("创建一个vue组件,默认src/components 或通过 -D 指定路径")
        .action(creatCpnAction)
}

module.exports = createCommands;