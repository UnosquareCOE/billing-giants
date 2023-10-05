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

CREATE TABLE IF NOT EXISTS public.venues
(
    id serial constraint venues_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.matches
(
    id serial constraint matches_pk primary key,
    date timestamp,
    venue_id INT CONSTRAINT matches_venues_venue_id_fk REFERENCES venues NOT NULL,
    competition_id INT CONSTRAINT matches_competitions_competition_id_fk REFERENCES competitions NOT NULL 
);

CREATE TABLE IF NOT EXISTS public.event_types
(
    id serial constraint event_types_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.clubs
(
    id serial constraint clubs_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.teams
(
    id serial constraint teams_pk primary key,
    name text,
    club_id INT CONSTRAINT teams_clubs_club_id_fk REFERENCES clubs NOT NULL
);

CREATE TABLE IF NOT EXISTS public.competition_teams
(
    id serial constraint competition_teams_pk primary key,
    competition_id INT CONSTRAINT competition_teams_competitions_competition_id REFERENCES competitions NOT NULL,
    team_id INT CONSTRAINT competition_teams_teams_team_id REFERENCES teams NOT NULL
);

CREATE TABLE IF NOT EXISTS public.achievement_types
(
    id serial constraint achievement_types_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.competition_achievements
(
    id serial constraint competition_achievements_pk primary key,
    name text,
    achievement_type_id INT CONSTRAINT competition_achievements_achievement_types_achievement_type_id REFERENCES achievement_types NOT NULL,
    competition_id INT CONSTRAINT competition_achievements_competitions_competition_id REFERENCES competitions NOT NULL
);

CREATE TABLE IF NOT EXISTS public.competition_achievement_teams
(
    id serial constraint competition_achievement_teams_pk primary key,
    competition_team_id INT CONSTRAINT competition_achievement_teams_competition_teams_competition_team_id REFERENCES competition_teams NOT NULL,
    competition_achievement_id INT CONSTRAINT competition_achievement_teams_competition_achievements_competition_achievement_id REFERENCES competition_achievements NOT NULL
);

CREATE TABLE IF NOT EXISTS public.match_team_types
(
    id serial constraint match_team_types_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.match_competition_teams
(
    id serial constraint match_competition_teams_pk primary key,
    competition_team_id INT CONSTRAINT match_competition_teams_competition_teams_competition_team_id REFERENCES competition_teams NOT NULL,
    match_id INT CONSTRAINT match_competition_teams_matches_match_id REFERENCES matches NOT NULL,
    match_team_type_id INT CONSTRAINT match_competition_teams_match_team_types_match_team_type_id REFERENCES match_team_types NOT NULL
);

CREATE TABLE IF NOT EXISTS public.players
(
    id serial constraint players_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.team_players
(
    id serial constraint team_players_pk primary key,
    start_date timestamp,
    end_date timestamp,
    team_id INT CONSTRAINT team_players_teams_team_id REFERENCES teams NOT NULL,
    player_id INT CONSTRAINT team_players_players_player_id REFERENCES players NOT NULL
);

CREATE TABLE IF NOT EXISTS public.events
(
    id serial constraint events_pk primary key,
    date timestamp,
    event_type_id INT CONSTRAINT events_event_Types_event_type_id REFERENCES event_types NOT NULL,
    match_id INT CONSTRAINT events_matches_match_id REFERENCES matches NOT NULL
);

CREATE TABLE IF NOT EXISTS public.match_team_players
(
    id serial constraint match_team_players_pk primary key,
    match_id INT CONSTRAINT match_team_players_matches_match_id REFERENCES matches NOT NULL,
    team_player_id INT CONSTRAINT match_team_players_team_players_team_player_id REFERENCES team_players NOT NULL
);

CREATE TABLE IF NOT EXISTS public.match_team_player_events
(
    id serial constraint match_team_player_events_pk primary key,
    match_team_player_id INT CONSTRAINT match_team_player_events_match_team_players_match_team_player_id REFERENCES match_team_players NOT NULL,
    event_id INT CONSTRAINT match_team_player_events_events_event_id REFERENCES events NOT NULL
);