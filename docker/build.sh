CONTAINER=chefkoch

docker build -t $CONTAINER .

if [ -n "$1" ]; then
    TAG=$1
    docker tag $CONTAINER:latest $CONTAINER:$TAG
fi
