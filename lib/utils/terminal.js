/**
 * 执行终端相关命令
 */
const { exec, spawn } = require("child_process"); //开启子进程
const chalk = require("chalk")

let commandSpawn = (...args) => {  //拿到 ...args 参数
    return new Promise((resolve, reject) => {
        {
            // spawn(指令,['参数'],{配置})
            const childProcess = spawn(...args); //结构args
            
            //子进程中执行会议很多打印信息，但是默认父进程(执行命令的终端是看不到的)
            //用子进程标准输出流，的pipe管道将信息储存到其他地方，实时显示在控制台
            childProcess.stdout.pipe(process.stdout);
            childProcess.stderr.pipe(process.stderr);
            
            //一但关闭(执行完成做一些事情)
            childProcess.on("close", () => {
                resolve();
            })
        }
    })
}

let commandExec = (...args)=>{
    exec(...args);
}
module.exports = {
    commandSpawn,
    commandExec
}