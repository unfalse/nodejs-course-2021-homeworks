CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE Groups IF EXISTS;
CREATE TABLE Groups (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) NOT NULL,
  permissions varchar(255) NOT NULL
)