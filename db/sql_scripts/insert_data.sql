DO $$

DECLARE role_player bigint;
DECLARE role_manager bigint;
DECLARE player1 bigint;
DECLARE player2 bigint;
DECLARE manager1 bigint;
DECLARE club1 bigint;
DECLARE club2 bigint;
DECLARE cv bigint;
DECLARE cr bigint;
DECLARE ca bigint;
DECLARE c1 bigint;
DECLARE c2 bigint;
DECLARE c3 bigint;
BEGIN

INSERT INTO roles(name) VALUES('player') RETURNING id into role_player;
INSERT INTO roles(name) VALUES('manager') RETURNING id into role_manager;

/*El password es "secret" para todos y esta hasheado con Argon2*/

INSERT INTO users(firstname,lastname,email,phone,role_id,password) VALUES ('Alice','Smith','alice@gmail.com','5487999',role_player,'$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY') RETURNING id into player1;  
INSERT INTO users(firstname,lastname,email,phone,role_id,password) VALUES ('Jhon','McEnroe','jhon@gmail.com','5487999',role_player,'$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY') RETURNING id into player2;  
INSERT INTO users(firstname,lastname,email,phone,role_id,password) VALUES ('Bob','Morrison','bob@gmail.com' ,'5487999',role_manager,'$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY') RETURNING id into manager1;  

INSERT INTO clubs(name,address,email,phone,user_id) VALUES ('Padel Sur','calle 1'  ,'mail@club','4598725',manager1) RETURNING id into club1;
INSERT INTO clubs(name,address,email,phone,user_id) VALUES ('Padel Norte','calle 2','mail@club','4598725',manager1) RETURNING id into club2;

INSERT INTO courts(name,price,club_id) VALUES ('Cancha Verde',1200.00,club1) RETURNING id into cv ;
INSERT INTO courts(name,price,club_id) VALUES ('Cancha Roja',1200.00,club1) RETURNING id into cr; 
INSERT INTO courts(name,price,club_id) VALUES ('Cancha Azul',1200.00,club1) RETURNING id into ca; 

INSERT INTO courts(name,price,club_id) VALUES ('Cancha 1',1500.00,club2) RETURNING id into c1; 
INSERT INTO courts(name,price,club_id) VALUES ('Cancha 2',1500.00,club2) RETURNING id into c2;  
INSERT INTO courts(name,price,club_id) VALUES ('Cancha 3',1500.00,club2) RETURNING id into c3;  

INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '10:0:0','11:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '11:0:0','12:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '12:0:0','13:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '13:0:0','14:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '14:0:0','15:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '15:0:0','16:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '17:0:0','18:0:0',club1);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '19:0:0','20:0:0',club1);

INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '10:30:0','11:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '11:30:0','12:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '12:30:0','13:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '13:30:0','14:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '14:30:0','15:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '15:30:0','16:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '17:30:0','18:30:0',club2);
INSERT INTO schedules(slot_start,slot_end,club_id) VALUES ( '19:30:0','20:30:0',club2);


INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,1,player1,c1,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,2,player1,c1,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,3,player1,c1,club1); 

INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,1,player2,c2,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,2,player2,c2,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,3,player2,c2,club1); 

INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,2,player1,c3,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,4,player2,c3,club1); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,5,player2,c3,club1); 

INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,7,player1,ca,club2); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,8,player1,cv,club2); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE,9,player2,cr,club2); 

INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,8,player1,ca,club2) ;
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,9,player2,cv,club2); 
INSERT INTO reservations(day,schedule_id,user_id,court_id,club_id) VALUES (CURRENT_DATE+1,10,player2,cv,club2); 

END $$;
