const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// async return promise object
async function getResults() {
  const results = await pool.query("SELECT * FROM notes");
  return results[0];
}

async function getResult(id) {
  const result = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
  return result[0][0];
}

async function createNote(title, contents) {
  const result = await pool.query(
    `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `,
    [title, contents]
  );
  const id = result[0].insertId;
  return getResult(id);
}

// (async function () {
//   console.log(await getResult());
// })();

// need .then() to resolve it
// getResults().then((results) => {
//   console.log(results);
// });

// getResult(1).then((result) => {
//   console.log(result);
// });

// createNote("test3", "test3").then((result) => {
//   console.log(result);
// });

module.exports = { getResult, getResults, createNote };
