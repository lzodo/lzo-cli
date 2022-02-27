#### 参数
```
Options:
  -V, --version                      output the version number
  -A --add                           这是一个自定义帮助选项的测试
  -D --dest <dest>                   指令跟随-d、--dest 必须传入一个非斜杠开头的文件夹：如 zo -d a/b/c
  -h, --help                         display help for command
```
#### 指令
```
Commands:
  create <project-name> [others...]  创建一个vue项目
  addcpn <vue-cpn-name>              创建一个vue组件,默认src/components 或通过 -D 指定路径
  help [command]                     display help for command
```

```shell
zo create demo 
```