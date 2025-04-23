
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY, 
  name varchar(50) NOT NULL /* player, o manager de canchas */
  
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  firstname varchar(50) NOT NULL, 
  lastname varchar(50) NOT NULL, 
  email varchar(50) NOT NULL,   
  phone varchar(15) NOT NULL,  
  role_id int NOT NULL,
  password varchar(100) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
  );


DROP TABLE IF EXISTS clubs;  
CREATE TABLE clubs (
  id SERIAL PRIMARY KEY, 
  name varchar(50) NOT NULL,
  address varchar(50) NOT NULL,
  email varchar(50) NOT NULL,   
  phone varchar(15) NOT NULL,  
  user_id int NOT NULL,   /* un club solo tiene un manager, por simplicidad */  
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

/* 
 Informacion adicional de los usuarios que son Jugadores relacion 1 a 1 con users 
*/

DROP TABLE IF EXISTS users_info;
CREATE TABLE users_info (
  id SERIAL PRIMARY KEY, 
  user_id int NOT NULL,   
  image_url varchar(255) NOT NULL,
  position varchar(255) NOT NULL,
  preferences varchar(255) DEFAULT NULL,  
  payments varchar(255) DEFAULT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id)  
  );


/*
  Canchas:
*/

DROP TABLE IF EXISTS courts;
CREATE TABLE courts (
  id SERIAL PRIMARY KEY, 
  name varchar(50) NOT NULL,
  price real,
  club_id int NOT NULL,   /* un club tiene muchas canchas */
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );

/*
  Horarios, cada club tiene sus horarios y son unicos para todas las canchas y todos los dias de la semana
  Por simplicidad se puede jugar todos los dias de la semana.
*/
DROP TABLE IF EXISTS schedules;
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY, 
  slot_start time NOT NULL, /* ej: 10:15 */
  slot_end time NOT NULL, /* ej:  11:20 */
  club_id int NOT NULL,   /* cada club tiene sus horarios */
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );


/*
  Reservas: (Se agrego el campo club_id solo para facilitar el lookup del name)
 */
DROP TABLE IF EXISTS reservations; 
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY, 
  day  date NOT NULL,
  schedule_id int NOT NULL,   
  user_id int NOT NULL,   /* la reserva la hace un solo jugador */
  court_id int NOT NULL,  /* una reserva se hace sobre una cancha */
  club_id int NOT NULL,   /* guardo el club para facilitar las queries */  
  opponent_id int NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),  
  FOREIGN KEY (court_id) REFERENCES courts(id),  
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  FOREIGN KEY (opponent_id) REFERENCES users(id),  

  );
