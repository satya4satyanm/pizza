
Expectations:
1. Ensure that APIs created have proper security headers (use helmet module)
2. Secure the services using Authentication and Authorization. Authentication is done is using json web tokens
3. Use GraphQL for pizza search
4. Use API gateway to handle authorization for all the services.
5. Add docker file to crate docker images for microservices.
6. Health check/monitoring/tracing is implemented for microservices
7. Create Kubernetes deployment and services manifest for deploying on Kubernetes cluster
8. Setup CI-CD using gitlab (optional)


Evaluation criteria:
1. % Assignment tasks completion
2. Code Quality
3. Solution Quality in terms of Scalability/high availability/ Performance/Resiliency etc
4. Clarity on using the right concepts/technology

Deliverables:
1. Working source code checked into bitbucket/gitlab
2. Readme file with steps to run the whole applications
3. A block diagram of communication/data flow between all the components. (pod/or std image format)



Data base : Mongodb , Middletier: node.js and express.js, Frontend : react.js



Data Model:
1. Roles :
    1. Admin can add the list of new pizzas, Customers can view the Pizzas
    2. Admin can not order pizza, customers can

2. Pizza : name, description, type:veg/non-veg, toppings:[onion, tomato, capsicum], price
3. User : Role, Name, password
4. Shopping Cart
5. Order



Micro Service APIs
=====================================
1. Pizza Search/List
2. Shopping cart management service
3. Orders Service
4. Authorization Service
5. User management
6. Frontend

Roles
=====================================
1. Admin
2. User








reference url
================================
https://medium.com/@mohamedaymen.ourabi11/creating-a-simple-crud-app-with-nodejs-graphql-and-mongodb-docker-eeb22d44925b


mongodb with authentication

https://medium.com/@anuradhs/connect-to-mongodb-docker-container-with-authentication-using-mongoose-and-nodejs-6319bea82e9d


https://jasonwatmore.com/archive


Mistakes:
================================
1. Overlooked the docker-compose file and wasted a day to connect to mongodb


Learnings:
================================
1. once the docker-hub repo has been created and linked to local project,
    you can build local project to see changes in docker desktop client.
    no need to push the change and build on dockerhub





Run the app
================================
docker-compose build
docker-compose up


Below are not required if you have a docker-compose

docker pull satya4satyanm/pizza  // run it once you want to take update from dockerhub

docker run satya4satyanm/pizza

docker stop container if needed
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




Development steps
=================================
After making nay change locally

docker-compose build
docker-compose up


enhancements:
==================================
user regn
https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management



graphql:
I am connecting from same server file
