INSERT INTO public.groups
(name, permissions)
values
('guest', 'READ'),
('user', 'READ,WRITE,DELETE,SHARE,UPLOAD_FILES'),
('upload', 'UPLOAD_FILES');