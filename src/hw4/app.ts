import express from 'express';

import { sequelize } from './data-access';
import { usersRouter } from './routes';
import { groupsRouter } from './routes/groupsRouter';

const app = express();
const port = 3000;

app.use(express.json());
app.use('', usersRouter.router);
app.use('/groups', groupsRouter.router);

app.listen(port, async () => {
    console.log(`User service is listening at http://localhost:${port}`);
    try {
        await sequelize.sync();
        console.log('Connection to database has been established');
    } catch (e) {
        console.log('Connection to database error');
        console.log(e.message);
    }
});
