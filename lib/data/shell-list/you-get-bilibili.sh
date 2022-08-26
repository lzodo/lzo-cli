#!/bin/bash

# you-get -i url 查看可选画质


vidtype="dash-flv"

URL=""
START=1
END=1
BASEDIR='./'

# 通过getopts 获取参数
while getopts "u:s:n:d:" OPT
do
    case $OPT in
        u) URL=$OPTARG;;
        s) START=$OPTARG;;
        n) END=$OPTARG;;
        d) BASEDIR=$OPTARG;;
    esac
done

if [ $START -gt $END  ]
then
    echo "起始值-s 不能大于结束值-n"    
    exit 1
fi
    
echo "查询画质中..."

# 查找可选画质 匹配与画质相关的单词 排序去重
LIST=($(you-get -i ${URL}|grep -o "[^= ]*flv[^= ]*" |sort -u))

#if [[ ${#LIST[@]}==0 ]];then
#    echo "地址有误 无下载元"
#    exit 1
#fi

# 用户选择LIST 画质列表,选择结果保存到flvs中
select flvs in "${LIST[@]}"
do
    vidtype=$flvs
    break;
done

echo $vidtype
if [[ ${URL} == "" ]]
then
    echo "请通过-u url 设置请求地址"
    exit 1
fi

# 检测目录不存在就创建目录
test -e $BASEDIR || mkdir $BASEDIR

if [ $? -ne 0 ]
then
    echo "没有权限，目录创建失败"
    exit 1
fi

#if [ -e $BASEDIR ];then   # !的用法在研究
#    echo ""
#else
#    mkdir $BASEDIR
#fi


cd $BASEDIR

echo "即将从$URL下载$START 到 $END 集到 $BASEDIR" 

for(( i=$START; i<=$END; i++ ))
do
    echo "`date '+%X'` -> 准备下载：$URL?p=$i"
    you-get --format=${vidtype} $URL?p=$i
    sleep 8s
done
