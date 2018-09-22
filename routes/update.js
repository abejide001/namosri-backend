var router = require('express').Router();
let productServices = require('../services/products');
let recipeServices = require('../services/recipe');
let instructionServices = require('../services/instructions');
let response = require('../models/response');
let responseCodes = require('../models/responseCodes');
let tokenizer = require("../services/tokenizer");

router.get('/products', (req, res) => {
    res.render('product/update');
});

router.get('/recipe', (req, res) => {
    res.render('recipe/update');
});

router.post('/products', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.userId = user.data.id;

        productServices.updateProducts(params).then(product => {
            response.header.code = responseCodes.ok;
            response.body.success = true;
            response.body.result = product;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body.success = false;
            response.body.result = null;
            res.json(response);
        });

    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post('/recipe', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.userId = user.data.id;

        recipeServices.updateRecipe(params).then(recipe => {
            response.header.code = responseCodes.ok;
            response.body.success = true;
            response.body.result = recipe;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body.success = false;
            response.body.result = null;
            res.json(response);
        });

    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post('/instructions', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.data.newValues.userId = user.data.id;
        console.log(params.data.newValues);
        console.log(params.data.oldValue);
        instructionServices.updateInstructions(params.data.oldValue, params.data.newValues).then(instruction => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = instruction;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    })
});

module.exports = router;