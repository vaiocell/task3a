import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

import getVolumes from './volumes';
import checkWord from './words';

const app = express();
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
app.use(cors());

// skill-branch
let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });
//----------------------------------------------------------------------------

  app.get('/*', async (req, res, next) => {
    // console.log(`Reqest: ${req.url}`);
    const path = req.url.slice(1).split('/');
    let result = pc;
    let status = '200';
    let route = [];

    if (path !== 'volumes' && path[path.length - 1] === '') path.pop();
    console.log(`Path: ${path[0]}`);

    try {
      if (path[0] === '') {
        console.log('Route: /');
        res.json(pc);
      }
      if (path[0] === 'volumes') {
        console.log(`Block /volumes`);
        const disks = await getVolumes(pc.hdd);
        res.send(disks);
      }
      else {
        for (let i = 0, len = path.length; i < len; i += 1) {
          if (typeof (result = result[path[i]]) === 'undefined' || (checkWord(path[i]) && i > 0)) res.sendStatus('404').send('Not Found');
        }
      }
      console.log(`Result: ${result}`);
    } catch (err) {
      console.log(err);
      res.sendStatus('404').send('Not Found');
      next();
    }

    res.json(result);
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
