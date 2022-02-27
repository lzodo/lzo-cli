const program = require("commander");

let helpOptions = () => {
    // --help 默认显示已有可选参数
    // 增加自己的option
    program.option("-A --add", '这是一个自定义帮助选项的测试')
    program.option("-D --dest <dest>", "指令跟随-d、--dest 必须传入一个非斜杠开头的文件夹：如 zo -d a/b/c")

    // 监听指令
    program.on("--help", () => {
        console.log(" 你需要帮助吗")
    })
}

module.exports = helpOptions;