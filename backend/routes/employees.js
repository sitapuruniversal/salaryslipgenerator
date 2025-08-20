const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const emp = new Employee(data);
    await emp.save();
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  const list = await Employee.find().limit(100);
  res.json(list);
});
router.get('/:id', async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  res.json(emp);
});
module.exports = router;
