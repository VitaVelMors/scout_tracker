DROP TABLE IF EXISTS scouts, achievements;

CREATE TABLE scouts(
  scout_id SERIAL PRIMARY KEY,
  name varchar(255),
  age integer
);

CREATE TABLE achievements (
  ach_id serial PRIMARY KEY,
  ach_name varchar(255),
  comp_date varchar(255),
  scout_id integer
  REFERENCES scouts(scout_id) ON DELETE CASCADE
);

INSERT INTO scouts (name, age)
VALUES ('Anakin Skywalker', 9),
  ('Obi-Wan Kenobi', 10),
  ('Depa Billaba', 10),
  ('Kit Fisto', 9),
  ('Adi Gallia', 9),
  ('Qui-Gon Jinn', 10),
  ('Mace Windu', 9),
  ('Plo Koon', 10),
  ('Luminara Unduli', 9),
  ('Even Piell', 9),
  ('Yarael Poof', 10),
  ('Oppo Rancisis', 10),
  ('Shaak Ti', 9),
  ('Quinlan Vos', 9),
  ('Barriss Offee', 9);

  INSERT INTO achievements (ach_name)
  VALUES ('Webelos Walkabout'),
  ('First Responder'),
  ('Stronger, Faster, Higher'),
  ('Cast Iron Chef'),
  ('Duty to God and You');
