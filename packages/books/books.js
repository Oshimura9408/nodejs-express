const router = require('express').Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

const newBooks = data => Object.assign(
  {
    id: String(Math.random()
      .toString(16)
      .split('.')[1]),
    img: 'https://via.placeholder.com/150',
    isReaded: false,
  },
  data
);

// GET /books
router.get('/', (req, res) => {
  let books;

  if (req.query.search) {
    books = db
      .get('books')
      .filter({ name: req.query.search })
      .value();
  } else {
    books = db.get('books').value();
  }

  res.json({ status: 'OK', data: books });
});

// GET /books/:id
router.get('/:id', (req, res) => {
  const book = db
    .get('books')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: book });
});

// GET /books/:name
router.get('/:name', (req, res) => {
  const book = db
    .get('books')
    .find({ name: req.params.name })
    .value();
  console.log({ name: req.params.name });

  res.json({ status: book ? 'OK' : 'BAD_REQUEST', data: book });
});

// POST /books
router.post('/', (req, res, next) => {
  const book = newBooks(req.body);

  console.log(book);

  db.get('books')
    .push(book)
    .write();

  res.json({ status: 'OK', data: book });
});

// PATCH /books/:id
router.patch('/:id', (req, res) => {
  const book = db
    .get('books')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: book });
});

// // DELETE /books/:id
// router.delete('/:id', (req, res) => {
//   db.get('cards')
//     .remove({ id: req.params.id })
//     .write();

//   res.json({ status: 'OK' });
// });

module.exports = router;
