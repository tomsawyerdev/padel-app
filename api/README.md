# Probar la Api

## Obtener Token 

```curl -X POST http://localhost:3000/sessions -H 'Content-Type: application/json' -d '{"username":"alice@gmail.com","password":"secret"}'```

*Almacenarlo*

```API_JWT_TOKEN= token sin comillas```

*Ejemplo*

```API_JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsaWNlIiwiaWF0IjoxNzMxMTg3MDE5LCJleHAiOjE3MzEyMjMwMTl9.Wwvx5Ag_rS9uuVzNTKwiiWQEzGlgSabv4XQIkqx3hqM```

*Verificarlo*

```echo $API_JWT_TOKEN```

# Probar endpoints

*Warning: En el session usar comillas dobles*

## Test protected

```curl 'http://localhost:3000/protected'  -H 'Content-Type: application/json' -H "authorization:$API_JWT_TOKEN"```


## Lista las reservas del usuario logeado

```curl 'http://localhost:3000/appointments/list' -H 'Content-Type: application/json' -H "authorization:$API_JWT_TOKEN"```

Devuelve un json con la estructura: {fecha, horario, cancha, club}

```json
{"status":200,"items":[
    {"reservation":{"id":11,"day":"2025-03-10","schedule_id":8,"schedule_slot":"19:00:00-20:00:00","court_id":1,"court_name":"Cancha Verde","club_id":2,"club_name":"Padel Norte","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":2,"day":"2025-03-10","schedule_id":2,"schedule_slot":"11:00:00-12:00:00","court_id":4,"court_name":"Cancha 1","club_id":1,"club_name":"Padel Sur","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":3,"day":"2025-03-10","schedule_id":3,"schedule_slot":"12:00:00-13:00:00","court_id":4,"court_name":"Cancha 1","club_id":1,"club_name":"Padel Sur","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":1,"day":"2025-03-10","schedule_id":1,"schedule_slot":"10:00:00-11:00:00","court_id":4,"court_name":"Cancha 1","club_id":1,"club_name":"Padel Sur","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":10,"day":"2025-03-10","schedule_id":7,"schedule_slot":"17:00:00-18:00:00","court_id":3,"court_name":"Cancha Azul","club_id":2,"club_name":"Padel Norte","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":7,"day":"2025-03-11","schedule_id":2,"schedule_slot":"11:00:00-12:00:00","court_id":6,"court_name":"Cancha 3","club_id":1,"club_name":"Padel Sur","game_state":"Confirmed","game_id":1}},
    {"reservation":{"id":13,"day":"2025-03-11","schedule_id":8,"schedule_slot":"19:00:00-20:00:00","court_id":3,"court_name":"Cancha Azul","club_id":2,"club_name":"Padel Norte","game_state":"Confirmed","game_id":1}}]}
```



## Buscar una cancha libre, dado el club y la fecha que es opcional

Devuelve un json con la estructura:  {slot, [array de canchas libres del dia elegido]}

```json
{"status":200,"items":[
    {"slot":{"id":1,"slot_start":"10:00:00","slot_end":"11:00:00","free_courts":[{"day":"19990101","schedules_id":1,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":1,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":1,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":2,"slot_start":"11:00:00","slot_end":"12:00:00","free_courts":[{"day":"19990101","schedules_id":2,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":2,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":2,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":3,"slot_start":"12:00:00","slot_end":"13:00:00","free_courts":[{"day":"19990101","schedules_id":3,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":3,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":3,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":4,"slot_start":"13:00:00","slot_end":"14:00:00","free_courts":[{"day":"19990101","schedules_id":4,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":4,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":4,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":5,"slot_start":"14:00:00","slot_end":"15:00:00","free_courts":[{"day":"19990101","schedules_id":5,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":5,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":5,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":6,"slot_start":"15:00:00","slot_end":"16:00:00","free_courts":[{"day":"19990101","schedules_id":6,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":6,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":6,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":7,"slot_start":"17:00:00","slot_end":"18:00:00","free_courts":[{"day":"19990101","schedules_id":7,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":7,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":7,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}},
    
    {"slot":{"id":8,"slot_start":"19:00:00","slot_end":"20:00:00","free_courts":[{"day":"19990101","schedules_id":8,"court_id":1,"court_name":"Cancha Verde","club_id":1},{"day":"19990101","schedules_id":8,"court_id":2,"court_name":"Cancha Roja","club_id":1},{"day":"19990101","schedules_id":8,"court_id":3,"court_name":"Cancha Azul","club_id":1}]}}]}
```

# Buscar por club, el club es mandatorio

```curl 'http://localhost:3000/appointments/search?club=1'  -H 'Content-Type: application/json' -H "authorization:$API_JWT_TOKEN"```

# Por club y dia

```curl 'http://localhost:3000/appointments/search?club=1&day=20250310'  -H 'Content-Type: application/json' -H "authorization:$API_JWT_TOKEN"```








