const db = require('../db/models');
const {ServerError, ResourceNotFoundError, BadRequestError} = require('../utils/errors');

module.exports.getAllBooks = (req, res, next) => {
  try {
    const limit = req.query?.limit;
    const offset = req.query?.offset;
    const sortBy = req.query?.sortBy || 'title';

    const options = {
      offset: offset ? offset : 0,
      order: [[sortBy, 'ASC']],
    };

    if (limit) {
      options.limit = limit;
    }

    db.Books.findAll(options).then(books => {
      let haveMore = true;

      if (Array.isArray(books) && books.length < 8) {
        haveMore = false;
      }

      res.send({books, haveMore});
    }).catch(err => {
      next(new ResourceNotFoundError('books'));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.createBook = (req, res, next) => {
  try {
    const {title, author, year, genre} = req.body;

    db.Books.create({
      title,
      author,
      year,
      genre,
    }).then(createdBook => {
      if (createdBook.dataValues !== []) {
        res.send(createdBook.dataValues);
      } else {
        next(new BadRequestError('Book was not created!'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.getBookById = (req, res, next) => {
  try {
    const bookId = req.params?.id;

    db.Books.findOne({
      where: {
        id: bookId,
      },
    }).then(foundBook => {
      if (foundBook) {
        res.send(foundBook);
      } else {
        next(new ResourceNotFoundError('book'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.updateBook = (req, res, next) => {
  try {
    const bookId = req.params?.id;

    db.Books.update(req.body, {
      where: {
        id: bookId
      },
    }).then(result => {
      if (typeof result[0] === 'number' && result[0] > 0) {
        res.send(`Book with id: ${bookId}, was updated!`);
      } else {
        next(new ResourceNotFoundError('book'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    })
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.deleteBookById = (req, res, next) => {
  try {
    const bookId = req.params?.id;

    db.Books.destroy({
      where: {
        id: bookId
      }
    }).then(removedBook => {
      if (removedBook) {
        res.send(`Book with id: ${bookId} was removed!`);
      } else {
        next(new ResourceNotFoundError('book'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    })
  } catch (err) {
    next(new ServerError(err));
  }
};