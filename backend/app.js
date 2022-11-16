const express = require('express');
const { Pool } = require('pg');
const config = require('./config.js')[process.env.NODE_ENV || "dev"];
const cors = require('cors');
const { response } = require('express');
const corsOptions={
  origin: 'https://scout-tracker-live.onrender.com',
  optionSuccessStatus: 200
};

const pool = new Pool({connectionString:config.connectionString});
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors(corsOptions))

app.get('/', (req, res) =>{
  res.send('Hello World!');
});

app.get('/api/scouts', (req, res) => {
  console.log('fun times')
  pool.query('SELECT * FROM scouts')
    .then(result => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.get('/api/scouts/:id', (req, res) => {
  console.log(req.params.name)
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

app.post('/api/scouts', (req, res) => {
  let scout = req.body;
  let name = scout.name;
  let age = scout.age;
  let image = scout.image;
  async function postScout(){
    try{
      if (name === undefined || age === undefined || image === undefined) {
        alert(`You must enter a full name, age and image url to add a scout!`, response);
        res.sendStatus(400, "Bad Request");
      } else {
      const result = await pool.query(`INSERT INTO scouts (name, age, image) VALUES ('${name}', ${age}, '${image}')`);
      res.send(result.rows);
      }
    }
    catch(e){
      console.error(e.stack);
    }
  }
  postScout()
});

app.patch('/api/scouts/:id', (req,res) => {
  let scout = req.body;
  let name = scout.name;
  let age = scout.age;
  let scoutImg = scout.image;
  async function patchScout(){
    try{
      const result = await pool.query(`UPDATE scouts SET
        name = COALESCE(NULLIF('${name}', ''), name),
        age = COALESCE(NULLIF(${age}, -1), age),
        scoutImg = COALESCE(NULLIF('${scoutImg}, ''), scoutImg)
        WHERE id = $1`, [req.params.id]);
        res.status(200).send(result.rows);
    }
    catch(e){
      console.error(e.stack);
    }
  }
  patchScout()
});

app.delete('/api/scouts/:id', (req,res) => {
  console.log(req.params.name)
  async function deleteScout(){
    try{
      const result = await pool.query('DELETE FROM scouts WHERE id = $1', [req.params.id]);
        res.send(await pool.query('SELECT * FROM scouts'));
    }
    catch(e){
      console.error(e.stack);
    }
  }
  deleteScout()
});

app.get('/api/achievements', (req, res) => {
  pool.query('SELECT * FROM achievements')
    .then(result => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.listen(port, () =>{
  console.log(`I'm Watching You On Port ${port}`)
})