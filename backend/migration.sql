DROP TABLE IF EXISTS scouts, achievements;

CREATE TABLE scouts(
  scout_id SERIAL PRIMARY KEY,
  name varchar(255),
  age integer,
  image varchar(255)
);

CREATE TABLE achievements (
  ach_id serial PRIMARY KEY,
  ach_name varchar(255),
  comp_date varchar(255),
  scout_id integer
  REFERENCES scouts(scout_id) ON DELETE CASCADE
);

INSERT INTO scouts (name, age, image)
VALUES ('Anakin Skywalker', 9, 'images/anakin.png' ),
  ('Obi-Wan Kenobi', 10, 'images/obi-wan-kenobi.png'),
  ('Depa Billaba', 10, 'images/depa-billaba.png'),
  ('Kit Fisto', 9, 'images/Kit-Fisto.png'),
  ('Adi Gallia', 9, 'images/Adi-Gallia.png'),
  ('Qui-Gon Jinn', 10, 'images/qui-gon-jinn.png'),
  ('Mace Windu', 9, 'images/Mace-Windu.png'),
  ('Plo Koon', 10, 'images/plo-koon.png'),
  ('Luminara Unduli', 9, 'images/luminara-undulli.png'),
  ('Even Piell', 9, 'images/Even-Piell.png'),
  ('Yarael Poof', 10, 'images/Yarael-Poof.png'),
  ('Oppo Rancisis', 10, 'images/oppo-rancisis.png'),
  ('Shaak Ti', 9, 'images/shaak-ti.png'),
  ('Quinlan Vos', 9, 'images/quinlan-vos.png'),
  ('Barriss Offee', 9, 'images/Barriss-Offee.png');

  INSERT INTO achievements (ach_name)
  VALUES ('Webelos Walkabout'),
  ('First Responder'),
  ('Stronger, Faster, Higher'),
  ('Cast Iron Chef'),
  ('Duty to God and You');
