

# Padel App

# Environment

Las claves se leen de un archivo de environment: *.env*


# Instrucciones para levantar los servicios

Llevantar los servicios uno a la vez, para evitar problemas de depencias:

1. Generar solo la base de datos 

```docker-compose up db```

2. Levantar la api

```docker-compose up api```

3. Levantar el fron

```docker-compose up front```

Acceder:

``` http://localhost:4200/```

4. Pararla

```docker-compose down```

5. Borrar el volumen

Si hacemos algun cambio en las tablas hay que borrar el volumen,
 para que el docker lo regenere con los nuevos cambios.

```shell
docker volume ls 
docker volume rm padel-db-volume
```
