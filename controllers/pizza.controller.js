const express = require('express');
const Pizza = require('../models/pizza.model');
const auth = require('../middlewares/auth');
const path = require('path');
const router = express.Router();

router.get('/pizzas',auth, async (req, res, next) => {
  try {
    const pizzas = await Pizza.find({});
    res.status(200).json(pizzas);
  } catch (e) {
    next(e);
  }
});

router.get('/pizzas/:id',auth, async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    res.status(200).json(pizza);    
  } catch (e) {
    next(e);
  }
});

// it's better to reuse /api/pizzas endpoint, instead of making separate one
router.post('/pizza', async (req, res, next) => { 
  const pizza = new Pizza({
    name: req.body.name,
    imagePath: req.body.imagePath,
    ingredients: req.body.ingredients,
    info: req.body.info,
    nutricion: req.body.nutricion
  })
  try {
    await pizza.save()
    res.status(201).json(pizza)
  } catch (e) {
    next(e);
  }
});

module.exports = router;