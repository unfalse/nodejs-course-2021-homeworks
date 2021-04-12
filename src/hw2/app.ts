import express from 'express';

import { getAppRootResponse, getList, getUser, suggestUsers, updateUser, removeUser, createUser } from './requests';
import { createUserSchema, updateUserSchema, validator } from './validation';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', getAppRootResponse);
app.get('/get/:id', getUser);
app.get('/list', getList);
app.post('/new', validator.body(createUserSchema), createUser);
app.put('/update', validator.body(updateUserSchema), updateUser);
app.get('/suggest/:login/:limit', suggestUsers);
app.delete('/remove/:id', removeUser);

app.listen(port, () => {
    console.log(`User service is listening at http://localhost:${port}`);
});
