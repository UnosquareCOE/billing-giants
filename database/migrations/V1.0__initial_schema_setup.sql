CREATE TABLE IF NOT EXISTS public.sport_types
(
    id serial constraint sport_types_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.seasons
(
    id serial constraint seasons_pk primary key,
    start_date timestamp,
    end_date timestamp null,
    sport_type_id INT CONSTRAINT seasons_sport_types_sport_type_id_fk REFERENCES sport_types NOT NULL 
);



CREATE TABLE IF NOT EXISTS public.competitions
(
    id serial constraint competitions_pk primary key,
    name text,
    start_date timestamp,
    end_date timestamp,
    season_id INT CONSTRAINT competitions_season_season_id_fk REFERENCES seasons NOT NULL 
);
