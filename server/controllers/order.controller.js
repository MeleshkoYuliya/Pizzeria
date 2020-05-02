const express = require('express');
const Order = require('../models/order.model');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/orders',auth, async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (e) {
    next(e);
  }
});

router.get('/orders/:id',auth, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (e) {
    next(e);
  }
});


router.post('/order',auth, async (req, res, next) => { 
  const order = new Order({
    date: new Date(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    flat: req.body.flat,
    floor: req.body.floor,
    payments: req.body.payments,
    pizzas: req.body.pizzas,
    user: req.user._id,
  })
  try {
    await order.save()
    res.status(201).json(order)
  } catch (e) {
    next(e);
  }
});

module.exports = router;