import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

import getVolumes from './volumes';
import checkWord from './words';

const app = express();
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
app.use(cors());

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });

app.get('/', async (req, res) => {
  console.log('Route: /');
  res.json(pc);
});

app.get('/volumes', async (req, res, next) => {
  console.log(`Block /volumes`);
  const disks = await getVolumes(pc.hdd);
  res.send(disks);
  next();
});

app.get('/hdd/:route1/:route2', async (req, res, next) => {
  console.log(`Block /hdd/:route1/:route2`);
  const theRoute1 = req.params.route1;
  const theRoute2 = req.params.route2;
  // console.log(`Value pc.hdd[theRoute1][theRoute2]: ${pc.hdd[theRoute1][theRoute2]}`)
  try {
    if (typeof (pc.hdd[theRoute1][theRoute2]) === 'undefined') res.sendStatus('404').send('Not Found');
    if (checkWord(theRoute1) || checkWord(theRoute2)) res.sendStatus('404').send('Not Found');
    console.log(`Route1: ${theRoute1} \n Route2: ${theRoute2}`);
    res.json(pc.hdd[theRoute1][theRoute2]);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus('404').send('Not Found');
    next();
  }
});

app.get('/:route', async (req, res, next) => {
  console.log(`Block /:route`);
  const theRoute = req.params.route;
  console.log(`Route: ${theRoute}`);
  try {
    if (typeof (pc[theRoute]) === 'undefined') res.sendStatus('404').send('Not Found');
    // if (checkWord(theRoute)) res.sendStatus('404').send('Not Found');
    else res.json(pc[theRoute]);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus('404').send('Not Found');
    next();
  }
});

app.get('/:route1/:route2', async (req, res, next) => {
  console.log(`Block /:route1/:route2`);

  const theRoute1 = req.params.route1;
  const theRoute2 = req.params.route2;
  console.log(`Route1: ${theRoute1} \n Route2: ${theRoute2}`);
  try {
    if (typeof (pc[theRoute1][theRoute2]) === 'undefined') res.sendStatus('404').send('Not Found');
    if (checkWord(theRoute1) || checkWord(theRoute2)) res.sendStatus('404').send('Not Found');
    else res.json(pc[theRoute1][theRoute2]);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus('404').send('Not Found');
    next();
  }
});

app.get('/:r1/:r2/:r3', async (req, res, next) => {
  const r1 = req.params.r1;
  const r2 = req.params.r2;
  const r3 = req.params.r3;
  console.log(`Route1: ${r1} \n Route2: ${r2} \n Route3: ${r3}`);
  try {
    if (typeof (pc[r1][r2][r3]) === 'undefined') res.sendStatus('404').send('Not Found');
    if (checkWord(r2) || checkWord(r3)) res.sendStatus('404').send('Not Found');
    else res.json(pc[r1][r2][r3]);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus('404').send('Not Found');
    next();
  }
});

app.get('/:r1/:r2/:r3/*', (req, res) => {
  res.sendStatus('404').send('Not Found');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
