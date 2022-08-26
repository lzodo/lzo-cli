#!/bin/bash
# 指令 本机文件夹 远程文件
if [ -z $1 -o -z $2 ]
then
    echo "请输入上传的文件或目标位置"
    exit 1
fi

if [ -d $1 ]
then
    scp -r -P 22 root@114.115.212.129:$2 $1 2> "/dev/null"
    if [ $? -ne 0 ]
    then
        echo "拉取的文件夹不存在"
    fi
else
    echo "不能拉取数据到文件"
fi
