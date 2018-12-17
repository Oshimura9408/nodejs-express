const router = require('express').Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

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

// // GET /books/genre
// router.get('/:genre', (req, res) => {
//   const book = db.get('books').filter({ genre: req.params.genre });
//
//   res.json({ status: 'OK', data: book });
// });

// POST /books
// router.post('/', (req, res, next) => {
//   // const requestBodySchema = {
//   //   id: 'path-task',
//   //   type: 'object',
//   //   properties: { text: { type: 'string' } },
//   //   required: ['text'],
//   //   additionalProperties: false,
//   // };
//   //
//   // if (!validate(req.body, requestBodySchema).valid) {
//   //   next(new Error('INVALID_API_FORMAT'));
//   // }

//   const books = newbooks(req.body.text);

//   console.log(books);

//   db.get('cards')
//     .push(book)
//     .write();

//   res.json({ status: 'OK', data: book });
// });

// PATCH /books/:id
router.patch('/:id', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

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
