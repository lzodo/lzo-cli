#!/bin/bash

# cmd.sh repoUser repoName number

if [ -z $1 ]
then
    echo "请输入项目所属者"
    exit 1
fi

if [ -z $2 ]
then
    echo "请输入项目名称"
    exit 1
fi


# 最大个数 默认30
# PER_PAGE=$( [ -z $3 ] && echo -n "yes" || echo -n "NO");
PER_PAGE=""
if [ -z $3 ];then
    PER_PAGE=1000
else 
    PER_PAGE=$3
fi

# 获取项目 releases 列表
# -s 不输出下载进度
List=(`curl -H "Accept: application/vnd.github+json" https://api.github.com/repos/${1}/${2}/releases\?page\=1\&per_page\=${PER_PAGE}`)

echo "======================${2} replace 列表================================="
Total=0
for(( i=0; i<=${#List[@]}; i++ ))
do
    # echo  ${List[$i]}
    if [[ ${List[$i]} =~ ^\"https://github.com/.*releases.* ]];then
        Total=$[$Total+1]
        echo ${List[$i]}
    fi
done
echo " "
echo "====================================================="
echo "共 ${Total} 个"
