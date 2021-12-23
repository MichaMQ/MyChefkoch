CONTAINER=localhost/client

if [ -n "$1" ]; then
    TAG=$1
    docker save $CONTAINER:$TAG  | gzip > ESB-Client-Container_$TAG.tar.gz
else
    docker save $CONTAINER | gzip > ESB-Client-Container.tar.gz
fi
