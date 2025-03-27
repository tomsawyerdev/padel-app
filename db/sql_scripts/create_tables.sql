/*DROP TABLE IF EXISTS users;
*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  firstname varchar(50) NOT NULL, 
  lastname varchar(50) NOT NULL, 
  mail varchar(50) NOT NULL,   
  role varchar(50) NOT NULL, /* player, o manager de canchas, o administrador*/
  password varchar(100) NOT NULL
  );


/*DROP TABLE IF EXISTS clubs;  */
CREATE TABLE clubs (
  id SERIAL PRIMARY KEY, 
  name varchar(50) NOT NULL,
  address varchar(50) NOT NULL,
  manager_user_id int NOT NULL,   /* un club solo tiene un manager, por simplicidad */  
  FOREIGN KEY (manager_user_id) REFERENCES users(id)
  );

/* Informacion adicional de los usuarios que son Jugadores relacion 1 a 1 con users 
DROP TABLE IF EXISTS users_info;
*/

CREATE TABLE users_info (
  id SERIAL PRIMARY KEY, 
  user_id int NOT NULL,   
  image_url varchar(255) NOT NULL,
  position varchar(255) NOT NULL,
  preferences varchar(255) DEFAULT NULL,  
  payments varchar(255) DEFAULT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id)  
  );


/* Canchas:
DROP TABLE IF EXISTS courts;
  */


CREATE TABLE courts (
  id SERIAL PRIMARY KEY, 
  name varchar(50) NOT NULL,
  club_id int NOT NULL,   /* un club tiene muchas canchas */
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );

/* Horarios, cada club tiene sus horarios y son unicos para todas las canchas y todos los dias de la semana
DROP TABLE IF EXISTS schedules;
*/

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY, 
  slot_start time NOT NULL, /* ej: 10:15 */
  slot_end time NOT NULL, /* ej:  11:20 */
  club_id int NOT NULL,   /* cada club tiene sus horarios */
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );


/* Reservas:
DROP TABLE IF EXISTS appointments;
 
 */
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY, 
  day  date NOT NULL,
  schedule_id int NOT NULL,   
  user_id int NOT NULL,   /* la reserva la hace un solo jugador */
  court_id int NOT NULL,   /* una reserva se hace sobre una cancha */
  club_id int NOT NULL,   /* guardo el club para facilitar las queries */  
  FOREIGN KEY (user_id) REFERENCES users(id),  
  FOREIGN KEY (court_id) REFERENCES courts(id),  
  FOREIGN KEY (club_id) REFERENCES clubs(id)

  );
