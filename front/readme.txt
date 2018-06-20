ng build 
docker image build -t ag_node .
docker run -p 4200:80 --rm ag_node


