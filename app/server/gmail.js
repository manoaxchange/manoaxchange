import { WebApp } from 'meteor/webapp';
import express from 'express';
import cors from 'cors';
import router from './gmail_essentials/routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/test', async (req, res) => {
  res.json('Hello World');
});

app.use('/api', router);

WebApp.connectHandlers.use(app);
