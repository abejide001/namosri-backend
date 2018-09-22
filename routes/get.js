var express = require('express');
var router = express.Router();
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var recipeService = require('../services/recipe');
var productService = require('../services/products');
var instructionService = require('../services/instructions');

/* GET add listing. */
router.post('/all/products', function(req, res, next) {
  productService.getAllProducts().then(products => {
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    response.body.result = products;
    res.json(response);
  }).catch(err => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);

  });
});

router.post('/all/recipe', (req, res) => {
  recipeService.getAllRecipe(req.body).then(recipes => {
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    response.body.result = recipes;
  }).catch(err => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);a

  });
});

router.post('/one/product', function(req, res, next) {
  console.log(req.body);
  productService.getOneProducts(req.body.productId).then(products => {
    console.log(products);
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    response.body.result = products;
    res.json(response);
  }).catch(err => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);a

  });
});

module.exports = router;
