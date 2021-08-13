// app.js
const express = require('express');
//const { development } = require('./knexfile.js');

const app = express();
const PORT = process.env.PORT || 3000;
//console.log(process.env)
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

app.use(express.json());

app.get('/movies', function(req, res) {
    //console.log(req.query)
    if (req.query.title === undefined) {
        //console.log('here')
        knex
        .select('*')
        .from('movies')
        .then(data => res.status(200).json(data))
        .catch(err =>
          res.status(404).json({
            message:
              'The data you are looking for could not be found. Please try again'
          })
        );
    } else {
        knex
        .select('*')
        .from('movies')
        .where('title', 'like', `%${req.query.title}%`)
        .then(data => res.status(200).json(data))
        .catch(err =>
          res.status(404).json({
            message:
              'The data you are looking for could not be found. Please try again'
          })
        )}
});

app.get('/movies/:id', function(req, res) {
    //console.log('this is the res', res);
    console.log('this is the req.params', req.params.id);
    knex 
        .select('*')
        .from('movies')
        .where('id', req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
              message:
                'The data you are looking for could not be found. Please try again'
            })
        );
})

app.post('/movies', function(req, res) {
  console.log('this is the req.body', req.body)
  
  knex('movies')
    .insert({
      title: req.body.title,
      genre: req.body.genre,
      release_date: req.body.release_date
    })
    .then(data => res.status(200).json(data))
    .catch(err => 
        res.status(500).json({
            message:
                'Somethins up'
        }))
})
        



// app.post('/articles', async function(req, res) {

//   let page = req.query.page;
//   let limit = req.query.limit;

//   let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();

//   res.render('index', {
//       articles: articles
//   });
// });
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});