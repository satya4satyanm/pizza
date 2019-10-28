Software Architecture -
101
FULL Stack Architecture Training Program
Assignment -3
Deadline : 31st Oct 2019
Assignment -3
Implement the single tenant online pizza shop with microservice architecture with following specification
Data base : Mongodb , Middletier: node.js and express.js, Frontend : react.js
Data Model:
1. Roles :
1. Admin can add the list of new pizzas, Customers can view the Pizzas
2. Admin can not order pizza, customers can
2. Pizza : name, description, type:veg/non-veg, toppings:[onion, tomato, capsicum], price
3. User : Role, Name, password
4. Shopping Cart
5. Order
Microservices :
1. Pizza Search/List
2. Shopping cart management service
3. Orders Service
4. Authorization Service
5. User management
6. Frontend : To be done as part of Assignment-4





Assignment -3
Implement the online pizza shop with microservice architecture with following specification
Expectations:
1. Ensure that APIs created have proper security headers (use helmet module)
2. Secure the services using Authentication and Authorization. Authentication is done is using
json web tokens
3. Use GraphQL for pizza search
4. Use API gateway to handle authorization for all the services.
5. Add docker file to crate docker images for microservices.
6. Health check/monitoring/tracing is implemented for microservices
7. Create Kubernetes deployment and services manifest for deploying on Kubernetes cluster
7. Setup CI-CD using gitlab (optional)
Deadline: 31st Oct, 2019




Assignment -3
Implement the online pizza shop with microservice architecture with following specification
Evaluation criteria:
1. % Assignment tasks completion
2. Code Quality
3. Solution Quality in terms of Scalability/high availability/ Performance/Resiliency etc
4. Clarity on using the right concepts/technology
Deliverables:
1. Working source code checked into bitbucket/gitlab
2. Readme file with steps to run the whole applications
3. A block diagram of communication/data flow between all the components. (pod/or std
image format)
Deadline: 31st Oct, 2019






reference url
================================
https://medium.com/@mohamedaymen.ourabi11/creating-a-simple-crud-app-with-nodejs-graphql-and-mongodb-docker-eeb22d44925b


mongodb with authentication

https://medium.com/@anuradhs/connect-to-mongodb-docker-container-with-authentication-using-mongoose-and-nodejs-6319bea82e9d




Run the app
================================
docker-compose build
docker-compose up

docker stack deploy for swarm deployment

docker run satya4satyanm/pizza

docker rm container if needed
docker run -d -p 27017:27017 --name mongodb mongo      start mongo container
docker exec -it mongodb bash    this is for interactive mode


to see the files inside docker image 
docker run --rm -it --entrypoint=/bin/bash satya4satyanm/pizza
ls -lsa
cd..


docker exec -it container_name /bin/bash



flow diagram
================================
https://www.draw.io/#G1rhOyV74vWGmLTWiewzQo1C4C30vxzwgK

