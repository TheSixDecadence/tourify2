const express = require('express');
const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) return res.status(400).json({ message: 'EMAIL NOT FOUND' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'INCORRECT PASSWORD' });

  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '10m' });
  res.header('Authorization', token).json({ token, id: user._id, role: user.role, name: user.name, email: user.email });
});


//CREATE USER
router.post("/", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


//GET NAME, ROLE, IMAGE OF THE USER (YOU NEED THIS ONE FOR ALL THE PAGES)
router.get("/user/:id", auth, (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .select("name email image role") // Seleccionar solo los campos deseados
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


//GET USER
router.get("/:id", auth, (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//GET USERS (JUST FOR TEST)
router.get("/", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
