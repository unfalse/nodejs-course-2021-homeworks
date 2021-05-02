CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Groups (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) NOT NULL,
  permissions varchar(255) NOT NULL
)