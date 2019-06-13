# Docker Compose


NodeJs server and Web application linked to MariaDB in separate containers.

<br>

## docker-compose.yml

2 Services = 2 Containers

 **1. database**
 
 **2. application**
 
 <br>
 
**ad 1)**
 
  - image: DB image pulled from dockerhub (mariadb:10.3)
  - ports: sets and publishes the ports
  - container name: for database connection (in server.js i specify as "host" in db connection)
  - environment: every specified entry will be created during the build process of docker compose
  
 <br>
 
 **ad 2)**
 
  - build: path to the folder where the dockerfile and the application is
  - ports: sets and publishes the ports
  - depends_on: it won't tell `docker-compose up` to start it before the other container

```
IMPORTANT NOTES!

 - create ROOT USER PASSWORD during the build process of the database
 - dont use ROOT USER to access database
 - in the database service of yml file, create another user. DONT FORGET TO SET IT UP in the server.js file!
 - PORT: (server) make sure that the ports are identical for server both in server.js AND .yml
 - PORTS: (db) also dont forget to add in the server.js file to tell the server where to listen for db
 - PORTS: (yml) fyi.... <Host Port>:<Conatiner Port>
 - CONTAINER_NAME: will serve as "host name". Set in server.js file as HOST in db connection part
 - dont use depends_on and links together
```

<br>


## server.js

<br>

**db connection**

const connection = mariadb.createConnection({ <br>
  host: 'compose_database', <br>
  user: 'exampleUser', <br>
  password: 'password', <br>
  database: 'hellodb', <br>
  port: 3306 <br>
});

...just to see all these godly important notes where to set...


```
IMPORTANT NOTES:

Docker uses cache. Don't let that fuck you in the ass! 
If theres is shit going on, rebuild your app, but boefre rebuild, 
try just to stop the containers and start again a few times to force Docker to let go of his shit.

```

[...knock yourself out with this](https://stackoverflow.com/questions/32612650/how-to-get-docker-compose-to-always-re-create-containers-from-fresh-images)

<br>

## db access in compose


1) get into container's bash:

```
$ docker exec -ti macrotis-database /bin/bash 
```

2) get into maridb as root user

```
$ mysql -u root -p

```


## Other notes as takeaways

  - in yml if u create database, it will happen after build/image section.
  so if u use build and use sql file to create/populate table, BE SURE that at that point the db itself will exist
  - dont use volume to use sql file to populate/create if u already using build, 
  and it contains dockerfile with entry to ADD/COPY that file
  - 
  
  
  
