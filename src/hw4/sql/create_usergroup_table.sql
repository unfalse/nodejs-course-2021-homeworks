CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS UserGroup;
CREATE TABLE UserGroup (
  id uuid primary key default uuid_generate_v4(),
  groupId uuid NOT NULL,
  userId uuid NOT NULL,
  CONSTRAINT usergroup_fk FOREIGN KEY (groupid) REFERENCES public."groups"(id) on delete cascade,
  CONSTRAINT usergroup_fk2 FOREIGN KEY (userid) REFERENCES public.users(id) on delete cascade
)