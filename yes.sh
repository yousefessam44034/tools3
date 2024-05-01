#! /bin/bash

docker build -t backend -f backend/Dockerfile ./backend
docker run -d -e database -p 7000:7000 backend

docker build -t database -f database/Dockerfile ./database
docker run -d -p 3306:3306 --name database_container  -v ./database:/var/lib/mysql database
database
docker build -t frontend -f my-frontend-app/Dockerfile ./my-frontend-app
docker run -d -p 3000:3000 frontend




