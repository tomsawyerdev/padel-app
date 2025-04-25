

/* una reserva muchos contrincantes*/

DROP TABLE IF EXISTS opponents;
CREATE TABLE opponents (
  id SERIAL PRIMARY KEY,  
  reservation_id int NOT NULL,    
  user_id int NOT NULL,   
  user_name VARCHAR(50),
  status VARCHAR(10), /*pendiente, confirmado, rechazado*/
  FOREIGN KEY (reservation_id) REFERENCES reservations(id),  
  FOREIGN KEY (user_id) REFERENCES users(id)  
);

  
DROP TABLE IF EXISTS notif;
CREATE TABLE notif (
  id SERIAL PRIMARY KEY,  
  reservation_id int NOT NULL,    
  user_id int NOT NULL, /* destinatario*/
  description VARCHAR(50),
  read boolean DEFAULT false,  
  FOREIGN KEY (user_id) REFERENCES users(id)  
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);  
