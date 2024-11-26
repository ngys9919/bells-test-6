const pool = require('../database');

async function getAllProducts() {
  const [rows] = await pool.query('SELECT id, bookTitle, CAST(priceTag AS DOUBLE) AS priceTag, image, promotion, badge, discount FROM books');
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  getAllProducts,getProductById
};
