#!/bin/bash

publish(){
    git remote -v
    if [ $? -eq 0 ];then
        git add .&&git commit -am "$MSG"&&git push        
    else
        echo "不是git目录"
    fi
}

helpdoc(){
    cat <<EOF
Description:

    This is a help document
        - Plot circos

Usage:

    $0 -i <input file> -o <output file>

Option:

    -i    this is a input file
    -o    this is a output file
EOF
exit 0
}

MSG=$(date "+%Y-%m-%d %H:%M")提交上传
BASEDIR="./"


while getopts "d:m:h" OPT
do
    case $OPT in
        d) BASEDIR=$OPTARG;;
        m) MSG="${MSG}($OPTARG)";;
        h) helpdoc;;
        ?) 
            echo "`basename $0` [options] 异常请 '-h' 查看帮助文档"
            exit 100
            ;;
    esac
done


# test -d $BASEDIR && cd $BASEDIR || echo "目录不存在"
test -d $BASEDIR && cd $BASEDIR 

if [ $? -eq 1 ];then
    read -r -p "GIT项目不存在是否提交当前项目? [Y/n]" input
    case $input in
        [Yy][Ee][Ss]|[Yy]|"") publish 1;;
        [Nn][Oo]|[Nn]) echo "操作已取消";;
    esac
else 
    read -r -p "即将发布项${BASEDIR}目? [Y/n]" input
    case $input in
        [Yy][Ee][Ss]|[Yy]|"") publish 2;;
        [Nn][Oo]|[Nn]) echo "操作已取消";;
    esac
fi

