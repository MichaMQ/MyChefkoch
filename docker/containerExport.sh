CONTAINER=chefkoch

if [ -n "$1" ]; then
    TAG=$1
    docker save $CONTAINER:$TAG  | gzip > MyChefkoch-Container_$TAG.tar.gz
else
    docker save $CONTAINER | gzip > MyChefkoch-Container.tar.gz
fi
