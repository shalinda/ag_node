# thea
[Test site](http://XXXXXX:8000/)
user: admin
password: admin

#frontend

    ng build 
    docker image build -t ag_node .
    #docker run -p 4200:80 --rm ag_node
    docker tag app:latest <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest
    eval $(aws ecr get-login| sed 's|https://||')
    docker push <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest --disable-content-trust  

#backend

    docker build -t ag_node .
    docker tag ag_node:latest <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/thea_ng:latest
    eval $(aws ecr get-login| sed 's|https://||')
    docker push <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/thea_ng:latest --disable-content-trust

#deploy
    docker-compose up ag_node&

#Kong setup
  prerequisit    
    
    curl -i -X DELETE --url http://localhost:8001/apis/ui
    curl -i -X DELETE --url http://localhost:8001/apis/api

    curl -i -X POST --url http://localhost:8001/apis --data name=ui --data upstream_url=http://thea_ng --data uris=/
    curl -i -X POST --url http://localhost:8001/apis --data name=api --data upstream_url=http://app:5000/api --data uris=/api


#AWS
    docker pull <ecr-id>.dkr.ecr.us-east-1.amazonaws.com/app:latest --disable-content-trust

#Mongo hands on

    mongo --port=27017

    db.employee.insert({username: 'dilshan', password: 'p@ssword', firstName: 'Dil', lastName: 'Ranar', "empType" : "5afc28da950ab4322bf7b52d"});
    db.employee.update({_id: '5af63b4aa3088629ee09743f'}, {$set: {username: 'dilshan1'}});
    db.employee.find().pretty();
    show dbs
    show tables;
    db.employee.remove({{_id: '5b088a89c88700942b28df35'}})
