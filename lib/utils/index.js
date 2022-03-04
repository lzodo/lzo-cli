const path = require("path");
const fs = require("fs");
const readline = require("readline");

const ejs = require("ejs");
const { resolve } = require("path");
const programOpts = require("commander").opts();

/**
 * 编译ejs模板
 */

const compile = (templateName, data) => {
    // 传入要编译模板的绝对路径，与数据
    let templatePath = path.resolve(__dirname, `../template/${templateName}`);
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, {}, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

/**
 * ejs 编译结果写入文件
 */
const whileResToFile = (name, content, type) => {
    let getPath = programOpts.dest ? programOpts.dest : "src/components";
    // let basePath = mkDirMany(getPath); //非递归创建
    let basePath = dgMkDirMany(getPath); //递归创建
    if (!basePath) return;

    let toPath = path.resolve(basePath, `${name}.${type}`);
    console.log("last");
    console.log(toPath);
    fs.writeFileSync(toPath, content);
};

//非递归
const mkDirMany = (getPath, hasBasePath) => {
    let basePath = hasBasePath ? path.resolve(hasBasePath) : path.resolve(""); //获取用户操作指令时的终端位置
    console.log(basePath);
    // 验证用户输入路径格式
    if (!/[\w-_~\/]*$/.test(getPath)) {
        console.log("路径格式不正确");
        return;
    }

    // 将每一层拆分为数组
    let splitPath = getPath.split("/").filter((item) => item);
    console.log(splitPath);

    // 遍历每一层，判断用户所在位置加上层级，的目录是否存在
    splitPath.forEach((element) => {
        if (!fs.existsSync(`${basePath}/${element}`)) {
            fs.mkdirSync(`${basePath}/${element}`);
        }
        basePath = `${basePath}/${element}`;
    });

    return basePath;
};

const dgMkDirMany = (getPath) => {
    // 验证用户输入路径格式
    if (!/^[\w-_~\.]{1}[\w-_~\/]*$/.test(getPath)) {
        console.log("路径格式不正确");
        return;
    }
    if (fs.existsSync(getPath)) {
        return path.resolve(getPath);
    } else {
        if (dgMkDirMany(path.dirname(getPath))) {
            fs.mkdirSync(getPath);
            return path.resolve(getPath);
        }
    }
};

// 封装写入
const lzoWrite = (filePath, content, isFixed) => {
    // console.log(filePath, content);
    let writePath = path.resolve(__dirname, filePath);
    if (isFixed) {
        writePath = filePath;
    }

    fs.writeFileSync(writePath, JSON.stringify(content), { encoding: "utf-8" });
};

// 创建文件
const lzoCreatFile = (basePath, name) => {
    if (programOpts.dest) {
        mkDirMany(programOpts.dest, basePath);
        fs.writeFileSync(path.resolve(basePath, programOpts.dest, name), "", {
            encoding: "utf-8",
        });
    } else {
        fs.writeFileSync(path.resolve(basePath, name), "", {
            encoding: "utf-8",
        });
    }
};

//读取文件
// const loadFile = (filePath) => {
//     return new Promise((resolve, reject) => {
//         let empty = {};
//         if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
//             let content = fs.readFileSync(filePath, { encoding: "utf-8" });
//             try {
//                 resolve(JSON.parse(content.toString()));
//             } catch {
//                 resolve({});
//             }
//         } else {
//             resolve({});
//         }
//     });
// };
const loadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        let empty = {};
        if (existsAndIsFile(filePath)) {
            let content = fs.readFileSync(filePath, { encoding: "utf-8" });
            try {
                resolve(JSON.parse(content.toString()));
            } catch {
                resolve({});
            }
        } else {
            resolve({});
        }
    });
};

// 判断文件是否存在
let existsAndIsFile = (filePath) => {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        console.log("true")
        return true;
    }
};

// 命令行接收用户输入
const readInput = (tips) => {
    tips = tips || "> ";

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

module.exports = {
    compile,
    whileResToFile,
    lzoWrite,
    lzoCreatFile,
    readInput,
    loadFile,
    existsAndIsFile
};
