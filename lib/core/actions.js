const { promisify } = require("util");

//将download 转支持 promise
const download = promisify(require("download-git-repo"));
// const debug = require("debug");

//引入
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal")
const { compile,whileResToFile } = require("../utils")

// 创建项目
const cloneObjectToDemo = async (project) => {
    console.log(`正在创建项目 ${project} ...`)
    // 1、克隆项目
    await download(vueRepo, project, { clone: true })
    console.log(`${project} 创建成功`)
    // 2、执行npm install ,cwd 指令执行的位置
    console.log(`cnpm install 安装中...`)
    // await commandSpawn("ls",['-la'],{cwd:`./${project}`})
    // win npm 有所不同 不然会报spawn cnpm ENOENT
    await commandSpawn(process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm', ['install'], { cwd: `./${project}` })
    console.log(`安装成功！`)
    // 3、执行npm run serve
    await commandSpawn(process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm', ['run', 'serve'], { cwd: `./${project}` })
    // 4、打开浏览器
    // 可以通过 webpack devServe 或第三方 open工具
}

//创建组件 传入名称和路径
const creatCpnAction = async (name) => {
    //1、准备ejs模板，通过ejs 安装导入ejs模块
    //2、编译ejs 返回 result
    let result = await compile("vue-component.ejs", { name: name, lowerName: name.toLowerCase() })

    //3、将result写入.vue 文件中 (desc 不能斜杠开头)
    whileResToFile(name,result,'vue');
}
module.exports = {
    cloneObjectToDemo,
    creatCpnAction
}