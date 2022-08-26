#### 参数
```
Options:
  -V, --version                      output the version number
  -d --dest <dest>                   必须传入一个非斜杠开头的文件夹：如 zo -d a/b/c       
  -h, --help                         display help for command
```
#### 指令
```
Commands:
  create <project-name> [others...]  创建一个vue项目
  addcpn <vue-cpn-name>              创建一个vue组件,默认src/components 或通过 -D 指定路径
  set-config <key> <value>           设置cli全局参数
  get-config <key>                   获取cli全局参数
  config [options]                   本地参数配置
  createfile [options] <key-name>    创建文件
  osinfo                             获取系统信息
  open [options]                     选择浏览器打开特定网站
  doc [options]                      快速打开远程笔记文档 set-confit doc <url> 设置
  env                                获取环境变量
```
#### 创建项目
```shell
zo create demo 
```

#### 速达
```shell
zo doc  # 快速打开常用或自己线上比较文档
zo doc -l # 文件夹弹出常用工作目录
```

#### 系统工具
```shell
zo open  # 打开指定浏览器，并选择或打开自定义网站
zo o # 打开当前终端所在文件夹
```


文档 `tool/web-my-vuecli`