#!/bin/bash

# 终端直接搜索git项目
# ./gitsearch.sh 项目名称 搜索个数

if [ -z $1 ]
then
    echo "请输入要搜索的项目参数"
    exit 1
fi

PAGE=1

# 最大个数 默认30
PER_PAGE=""
if [ -z $2 ];then
    PER_PAGE=1000
else 
    PER_PAGE=$2
fi

#List=(`curl -H "Accept: application/vnd.github+json" -H "Authorization: token ghp_xxx" https://api.github.com/search/repositories\?q\=${1}\&sort\=stars`)
List=(`curl -H "Accept: application/vnd.github+json" https://api.github.com/search/repositories\?q\=${1}\&sort\=stars\&page\=1\&per_page\=${PER_PAGE}`)
# NUM="2,"
# echo $NUM
# NUM2=`echo $NUM|sed 's/\,/ /g'`
# echo "$[$NUM2/1000].$[$NUM2%1000]k"
# echo "$[$NUM2%1000]"
# echo "$[$NUM2/1000]"
Total=0

echo " "
echo "======================${1} 查询============================"
echo " "
for(( i=0; i<=${#List[@]}; i++ ))
do
    if [[ ${List[$i]} =~ ^\"https://github.com/.*\.git\" ]];then
        Total=$[$Total+1]
        echo ${List[$i]}
    fi

    if [[ ${List[$i]} =~ ^\"forks\" ]];then
        FORKS=`echo ${List[$i+1]}|sed 's/\,/ /g'`
        if [ $FORKS -lt 1000 ];then
            echo "forks $FORKS"
        else
            echo "forks $[${FORKS}/1000]k ==> ${FORKS}"
        fi

        echo " "
    fi

    if [[ ${List[$i]} =~ ^\"stargazers_count\" ]];then
        #  将 1000, 变成 1000
        STARS=`echo ${List[$i+1]}|sed 's/\,/ /g'`
        if [ $STARS -lt 1000 ];then
            echo "stars $STARS"
        else
            echo "stars $[${STARS}/1000]k ==> ${STARS}"
        fi
    fi

    if [[ ${List[$i]} =~ ^\"size\" ]];then
        SIZE=`echo ${List[$i+1]}|sed 's/\,/ /g'`
        if [ $SIZE -lt 1000 ];then
            echo "size $SIZE"
        else
            echo "size $[${SIZE}/1000]k ==> ${SIZE}"
        fi
    fi
done
echo " "
echo "=========================================================="
echo "共 ${Total} 个"
