import { WebApp } from 'meteor/webapp';
import express from 'express';
import cors from 'cors';
import router from './gmail_essentials/routes';
/* The code is this file, and other Gmail files has been adapted from:
 * https://fusebit.io/blog/gmail-api-node-tutorial/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
 */
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/test', async (req, res) => {
  res.json('Hello World');
});

app.use('/api', router);

WebApp.connectHandlers.use(app);
