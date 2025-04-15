
DROP TABLE IF EXISTS game_offers;
CREATE TABLE game_offers (
  id SERIAL PRIMARY KEY, ,   
  user_id int NOT NULL, 
  club_id int NOT NULL,   /* para facilitar el filtrado*/
  days_array  VARCHAR(100) NOT NULL, /* csv: Lunes,Martes,Miercoles,*/  
  slot_start time NOT NULL, /* ej: 10:00 */
  slot_end time NOT NULL, /* ej:  11:20 */  
  is_open  boolean, /* open or closed,  */  
  
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),  
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  
);


DROP TABLE IF EXISTS game_notifications;
CREATE TABLE game_notifications (
  id SERIAL PRIMARY KEY, ,   
  user_id int NOT NULL,   /* el que publico la oferta */
  game_offer_id int NOT NULL,   
  user_opponent_id int DEFAULT NULL, /* id del oponente */
  reservation_id  int DEFAULT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),    
  FOREIGN KEY (game_id) REFERENCES game_offers(id),    
  FOREIGN KEY (user_opponent_id) REFERENCES users(id)  
);