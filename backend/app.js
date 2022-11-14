const express = require('express');
const { Pool } = require('pg');
const config = require('./config.js')[process.env.NODE_ENV]
const cors = require('cors');
const corsOptions={
  origin: 'https://scout-tracker.onrender.com/',
  optionSuccessStatus: 200
};

const pool = new Pool({connectionString:config.connectionString});
const app = express();
const port = 3000;

app.options('*', corsOptions);
app.use(corsOptions);
app.use(express.json());

app.get('/', (req, res) =>{
  res.send('Hello World!');
});

app.get('/api/scouts', cors(corsOptions), (req, res) => {
  console.log('fun times')
  pool.query('SELECT * FROM scouts')
    .then(result => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.get('/api/scouts/:scout_id', cors(corsOptions), (req, res) => {
  console.log(req.params.id)
  async function getScout(){
    try{
      const result = await pool.query('SELECT * FROM scouts WHERE id = $1', [req.params.id]);
      if (result.rows.length === 0) {
        res.sendStatus(404, "Not Found");
      } else {
        res.send(result.rows);
      }
    }
    catch(e){
      console.error(e.stack);
    }
  }
  getScout()
});

app.post('/api/scouts', cors(corsOptions), (req, res) => {
  let scout = req.body;
  let name = scout.name;
  let age = scout.age;
  async function postScout(){
    try{
      if (name === '' || age === '') {
        console.log(`I don't think so buddy!`);
        res.sendStatus(400, "Bad Request");
      } else {
      const result = await pool.query(`INSERT INTO scouts (name, age) VALUES ('${name}', ${age}) RETURNING *`);
      res.send(result.rows);
      }
    }
    catch(e){
      console.error(e.stack);
    }
  }
  postScout()
});

app.patch('/api/scouts/:scout_id', cors(corsOptions), (req,res) => {
  let scout = req.body;
  let name = scout.name;
  let age = scout.age;
  async function patchFood(){
    try{
      const result = await pool.query(`UPDATE scouts SET
        name = COALESCE(NULLIF('${name}', ''), name),
        age = COALESCE(NULLIF(${age}, -1), age)
        WHERE id = $1 RETURNING *`, [req.params.id]);
        res.status(200).send(result.rows);
    }
    catch(e){
      console.error(e.stack);
    }
  }
  patchFood()
})

app.delete('/api/scouts/:scout_id', cors(corsOptions), (req,res) => {
  console.log(req.params.id)
  async function deleteFood(){
    try{
      const result = await pool.query('DELETE FROM scouts WHERE scout_id = $1', [req.params.name]);
      // if (result.rows.length === 0) {
      //   res.sendStatus(404, "Not Found");
      // } else {
        res.send(await pool.query('SELECT * FROM scouts'));
      // }
    }
    catch(e){
      console.error(e.stack);
    }
  }
  deleteFood()
});

app.listen(port, () =>{
  console.log(`I'm Watching You On Port ${port}`)
})