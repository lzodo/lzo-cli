#!/bin/bash

# DIRLIST=("/mnt/d/lzo-project/lzo-shell-scripts" "/mnt/d/lzo-project/lzo-docs-blog-2" "/mnt/d/lzo-project/lzo-web-project")
DIRLIST=(1 2 3)
echo $DIRLIST
for(( i=0; i<=${#DIRLIST[@]}; i++ ))
do
    echo $DIRLIST[$i]
done 