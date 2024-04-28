const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});
router.get('/products/:param', (request, response, next) => {
   const { param } = request.params;

   // Проверка, является ли параметр числом
   if (!isNaN(param)) {
      const numericId = parseInt(param, 10);
      const filteredProducts = products.filter(product => product.id === numericId);
      response.json(filteredProducts);
   } else {
      // Если параметр не является числом, считаем его брендом
      const filteredProducts = products.filter(product => product.brand === param);

      response.json(filteredProducts);
   }
}, blockSpecialBrand);
// router.get('/products/:brand', blockSpecialBrand, (request, response) => {
//    const { brand } = request.params; // Access the brand parameter from the URL

//    // Filter products based on the brand parameter
//    const filteredProducts = products.filter(product => product.brand === brand);

//    response.json(filteredProducts); // Send the filtered products as a JSON response
// });


router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});


module.exports = router;