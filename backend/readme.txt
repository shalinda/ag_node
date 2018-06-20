docker build -t app .
docker tag app:latest <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest
#eval $(aws ecr get-login| sed 's|https://||')
docker push <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest --disable-content-trust

docker build -t ag_node .
docker tag ag_node:latest <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/ag_node:latest
#eval $(aws ecr get-login| sed 's|https://||')
docker push <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/thea_ng:latest --disable-content-trust

docker pull <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest --disable-content-trust

