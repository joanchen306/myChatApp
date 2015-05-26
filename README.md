# MyChatAPP

##Introduction
This is my training use app at Delta Electronics


##Execute
run this to execute for the first time

```
$ npm install
```
After few minutes waiting, you will have all the dependent packages installed, and then execute the server with command:

```
$ DEBUG=chat-server:* ./bin/www
```

The website locates on http://localhost:3000/

after you installed everything you can also run this by typing this in your terminal

```
$ npm start
```

## Structure
Here is the structure of the App and what belongs where to make quick changes 

```
MyChatApp
   |
   |-- app.js (Mongoose and Routing)
   |
   |-- bin
   |	 |
   |	 |-- www (connects to socket and broadcasts)
   |
   |-- data
   |	 |
   |     |--db (This is currently empty)
   
   
   
```