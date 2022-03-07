const program = require("commander");
const {
    getSystemInfoAction,
    openSelectInternetAction,
    creatFileAction,
    getSystemEnvAction,
    docOpenAction
} = require("../actions/system-action");

const systemCommands = () => {
    // 创建文件
    program
        .command("createfile <key-name>")
        .description("创建文件")
        .option("-r --hostdir", "在hostdir目录下操作文件")
        .action(creatFileAction);

    // cp 复制指令

    //创建项目指令 指令名称 项目名称 其他参数s
    program
        .command("osinfo")
        .description("获取系统信息")
        .action(getSystemInfoAction);

    //打开浏览器
    // .command("open [object] [other...]")
    // object action 中参数一
    // [other...] action 参数二，配置项数组
    // -l action 参数三，如果前面参数没有则前移动
    program
        .command("open")
        .description("选择浏览器打开特定网站")
        .option('-l, --lazy', '非工作网站')
        .option('-d, --docs', '文档查询')
        .action(openSelectInternetAction);
    program
        .command("doc")
        .description("快速打开远程笔记文档 set-confit doc <url> 设置")
        .option('-l, --local', '本地项目 window支持')
        .action(docOpenAction);
    program
        .command("env")
        .description("获取环境变更了")
        .action(getSystemEnvAction);
};

module.exports = systemCommands;

//  D:\Scoop\apps\nvm-windows\current\nodejs\nodejs\node_modules\@vue