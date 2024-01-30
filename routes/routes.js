const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false 
    }
});

pool.connect((error) => {
    if (error) {
        console.error('Помилка підключення до бази даних: ' + error.message);
        return;
    }
    console.log('Підключено до бази даних PostgreSQL');
});

function getProducts() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products', (error, results) => {
            if (error) {
                console.error('Помилка при виконанні запиту до бази даних: ' + error.message);
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
}

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/products', async (request, response) => {
        try {
            const products = await getProducts();
            response.json(products);
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    });
};

module.exports = router;