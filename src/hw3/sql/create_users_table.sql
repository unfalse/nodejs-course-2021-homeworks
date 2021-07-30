CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
drop table users;
CREATE TABLE Users (
  id uuid primary key default uuid_generate_v4(),
  login varchar(255) NOT NULL,
  age integer NOT NULL,
  password varchar(255) NOT NULL,
  isDeleted bool NOT NULL
)