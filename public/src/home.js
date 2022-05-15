const {
  findAuthorById,
} = require('./books.js');

function getTotalBooksCount(books){
  return books.reduce((accumilator, book) => accumilator + 1, 0);
};

function getTotalAccountsCount(accounts) {
 return accounts.reduce((accumilator, user) => accumilator + 1, 0);
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows[0].returned === false).length;
}

function sortAndGiveTopFive(array) {
  return array.sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1)).slice(0, 5);
}

function getMostCommonGenres(books) {
  const result = books.reduce((acc, book) => {
    const existingGenre = acc.find((genre) => genre.name === book.genre);
    // eslint-disable-next-line no-unused-expressions
    existingGenre ? existingGenre.count += 1 : acc.push({ name: book.genre, count: 1 });
    return acc;
  }, []);
  return sortAndGiveTopFive(result);
}

function getMostPopularBooks(books) {
  const result = books.reduce((acc, book) => {
    acc.push({ name: book.title, count: book.borrows.length });
    return acc;
  }, []);
  return sortAndGiveTopFive(result);
}

function getMostPopularAuthors(books, authors) {
  const result = books.reduce((acc, book) => {
    const { name: { first, last } } = findAuthorById(authors, book.authorId);
    acc.push({
      name: `${first} ${last}`,
      count: book.borrows.length,
    });
    return acc;
  }, []);
  return sortAndGiveTopFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
