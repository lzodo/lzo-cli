#!/bin/bash
# 创建远程仓库
TOKEN=""
NAME=""

while getopts "t:n:" OPT
do
    case $OPT in
        t) TOKEN=$OPTARG;;
        n) NAME=$OPTARG;;
    esac
done

if [ -z $TOKEN ]
then
    echo "TOKEN 必填"    
    exit 1
fi

if [ -z $NAME ]
then
    echo "NAME 必填"    
    exit 1
fi


# List=(`curl -u \"liaozhongxun:${TOKEN}\" https://api.github.com/user/repos -d \'{"name":"${NAME}"}\'`)
List=(`"curl -u \"liaozhongxun:${TOKEN}\" https://api.github.com/user/repos -d '{\"name\":\"${NAME}\"}'"`)

echo $List
