

# Padel App

# Environment

Las claves se leen de un archivo de environment: *.env*


## Api

La api corre en **Node Express**  

## Front

El front esta desarrollado en **Angular** y  la libreria **Material Angular** para los componentes.

## Database

El motor de base de datos elegido es **Postgres**.


# Instrucciones para levantar la base de datos

1. Generar solo la base de datos 

```docker-compose up db```


2. Acceder a la base de datos desde una terminal:

```shell

docker exec -it padel-db bash 

bash-4.2# psql -U adminuser -d padel

padel=# \l listar bases de datos
padel=# \dt or \dt+ listar tables
padel=# \du or \du+ describe usuarios y sus permisos de usuarios



```


3. Pararla

```docker-compose down```

4. Borrar el volumen

Si hacemos algun cambio en las tablas hay que borrar el volumen,
 para que el docker lo regenere con los nuevos cambios.

```shell
docker volume ls 
docker volume rm padel-db-volume
```
