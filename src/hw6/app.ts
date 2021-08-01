import './lib/env';

import express from 'express';
import cors from 'cors';

import { sequelize } from './data-access';
import { errorsLogger } from './middlewares/errorsLogger';
import { myCustomLogger } from './middlewares/myCustomLogger';
import { executionTime } from './middlewares/executionTime';
import { checkToken } from './middlewares/auth';
import { authRouter, usersRouter, groupsRouter } from './routes';
import { setGlobalHandlers } from './logs/events';

setGlobalHandlers();

const app = express();
const port = 3000;

app.use(executionTime);
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.use(myCustomLogger);
app.use(checkToken);
app.use('', usersRouter.router);
app.use('/groups', groupsRouter.router);
app.use('/auth', authRouter.router);
app.use(errorsLogger);

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
