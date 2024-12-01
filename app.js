'use strict';

import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import errorHandler from './middlewares/route-error-handler.js';
import router from './routes/router.js';
import path from 'path';

dotenv.config();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get('/', (req, res) => {
    res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Server is working awesome</title><style>:root{--smaller:.75;}html,body{height:100%;margin:0;}body{align-items:center;background-color:#09ff00;display:flex;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;}.container{color:#fffdfd5c;text-align:center;position:center;}.circle{width:50vh;height:50vh;background-color:#ff0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}.container{color:#fffdfd5c;text-align:center;position:center;}.circle{width:50vh;height:50vh;background-color:#ff0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}.container{color:#fffdfd5c;text-align:center;position:center;}.circle{width:50vh;height:50vh;background-color:#ff0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}.container{color:#fffdfd5c;text-align:center;position:center;}.circle{width:50vh;height:50vh;background-color:#ff0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}.container{color:#fffdfd5c;text-align:center;position:center;}.circle{width:50vh;height:50vh;background-color:#ff0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}</style></head><body><div class="container"><div class="circle"></div></div></body></html>`);
});

app.get('/robot.txt', async (req, res) => {
    res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.use('/api', router);

app.use(errorHandler.route);
app.use(errorHandler.next);

export default app;
