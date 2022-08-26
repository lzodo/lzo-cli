#!/bin/bash
# 通过 . ./xxx.sh 或 source ./xxx.sh 来引入文件
if [ -z $1 -o -z $2 ]
then
    echo "请输入上传的文件或目标位置"
    exit 1
fi

#test -e /var/log/scplogo || mkdir -p /var/log/scplogo

if [ -d $1 ]
then
    scp -r -P 22 $1 root@114.115.212.129:$2 2> "/dev/null"
    if [ $? -ne 0 ]
    then
        echo "目标主机位置不存在，无法发送"
    fi
else
    scp -P 22 $1 root@114.115.212.129:$2 2> "/dev/null"
    if [ $? -ne 0 ]
    then
        echo "目标主机位置不存在，无法发送"
    fi
fi
