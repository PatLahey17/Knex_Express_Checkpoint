
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

app.use(express.json());

app.get('/movies', function(req, res) {

    if (req.query.title === undefined) {
     
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
        
app.delete(`/movies/:id`, function (req, res){
  
   console.log('this is the req.params in delete', req.params.id);
    knex('movies')
        .where('id', req.params.id)
        .del()
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(500).json({
              message:
                'The data you are looking for could not be found. Please try again'
            })
        );
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});