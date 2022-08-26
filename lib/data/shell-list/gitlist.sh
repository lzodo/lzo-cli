#!/bin/bash
# 获取自己所有项目列表
# -s 不输出下载进度
# List=(`curl -H "Accept: application/vnd.github+json" -H "Authorization: token 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lzO" https://api.github.com/users/liaozhongxun/repos\?page\=1\&per_page\=2`)
List=(`curl -H "Accept: application/vnd.github+json" https://api.github.com/users/liaozhongxun/repos\?page\=1\&per_page\=100`)

echo "=======================我的仓库======================="
Total=0
for(( i=0; i<=${#List[@]}; i++ ))
do
    if [[ ${List[$i]} =~ ^\"https://github.com/liaozhongxun/.*\.git ]];then
        Total=$[$Total+1]
        echo ${List[$i]}
    fi
done
echo " "
echo "====================================================="
echo "共 ${Total} 个"
