FROM library/postgres:9
MAINTAINER Rui Wu
LABEL description="Postgres SQL."

#setup db
#RUN /etc/init.d/postgresql start &&\
#    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
#    createdb -O docker docker
COPY init.sql /docker-entrypoint-initdb.d/

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential python-psycopg2


#copy source code
COPY . /db_docker
WORKDIR /db_docker
ENV PYTHONPATH /db_docker

#install requirements
RUN pip install -r requirements.txt

EXPOSE 5000
ENV DOCKER_DB_PORT 80
ENV DOCKER_DB_HOST 0.0.0.0
EXPOSE ${DOCKER_DB_PORT}

CMD python views.py -p 5000 --threaded