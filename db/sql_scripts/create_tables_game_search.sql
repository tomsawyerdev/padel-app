
/* Podria usar solamente la tabla de reservas
   es mas facil los select
  */

DROP TABLE IF EXISTS games;
CREATE TABLE games (
  id SERIAL PRIMARY KEY,  
  user_id int NOT NULL, 
  club_id int NOT NULL,   /* para facilitar el filtrado*/
  reservation_id int NOT NULL,  
  user_opponent_id int DEFAULT NULL, /* id del oponente, Null-> is open, Not null is closed */
  
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),  
  FOREIGN KEY (club_id) REFERENCES clubs(id),
  FOREIGN KEY (reservation_id) REFERENCES "Reservations"(id)
  
);


