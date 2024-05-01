FROM mysql:latest

WORKDIR /app

ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_ROOT_user=root
ENV MYSQL_ROOT_PASSWORD=mysecretpassword

COPY soo.sql /docker-entrypoint-initdb.d/

COPY . /app

EXPOSE 3306
ENTRYPOINT ["docker-entrypoint.sh", "mysqld", "--init-file", "/docker-entrypoint-initdb.d/soo.sql"]
