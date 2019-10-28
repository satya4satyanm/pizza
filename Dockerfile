#FROM node:10
# Create app directory
#WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
#COPY . .
#EXPOSE 8080
#CMD [ "node", "app.js" ]

#define the latest nodejs image  to build from
FROM node:latest
#create a working directory
WORKDIR /usr/src/app/graphqlApp
#copy package.json file under the working directory 
COPY package.json /usr/src/app/graphqlApp/
# install all the dependencies 
RUN npm install && npm audit fix
#copy all your files under the working directory
COPY . /usr/src/graphqlApp
#expose the port 4000
EXPOSE 4000
#start nodejs server 
CMD npm start