

INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(12,00,00),MAKE_TIME(14,00,00),21) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(14,00,00),MAKE_TIME(16,00,00),21) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(16,00,00),MAKE_TIME(20,00,00),21) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(20,00,00),MAKE_TIME(22,00,00),21) ;

INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(8,30,00),MAKE_TIME(10,30,00) ,22) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(10,30,00),MAKE_TIME(12,30,00),22) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(12,30,00),MAKE_TIME(14,30,00),22) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(16,30,00),MAKE_TIME(18,30,00),22) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(18,30,00),MAKE_TIME(20,30,00),22) ;
INSERT INTO "Schedules"(slot_start,slot_end,club_id) VALUES ( MAKE_TIME(20,30,00),MAKE_TIME(22,30,00),22) ;

UPDATE "Schedules" SET slot_start=MAKE_TIME(14,30,00), slot_end=MAKE_TIME(16,30,00) WHERE id=79;


SELECT * FROM "Schedules" Order by club_id,slot_start;


