import express from 'express';

const app = express();

app.get('/', (req, res) => {

  res.json({
    url: 1,
    userName: 'vaiocell',
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
