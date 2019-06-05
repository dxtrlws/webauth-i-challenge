const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/user-model');

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    const newUser = await Users.insert(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await Users.findUser({ username });
      const isValidPass = await bcrypt.compareSync(password, user.password);
      if (username && isValidPass) {
        res.status(200).json({ message: `Welcome ${username}` });
      } else {
        res.status(401).json({ message: 'Invalied username or password' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

// middleware
async function authorize(req, res, next) {
    try {
      const { username, password } = req.headers;
      if (username && password) {
        const user = await Users.findUser({ username });
        const isValid = await bcrypt.compareSync(password, user.password);
        if (username && isValid) {
          next();
        }
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Please provide valid credentials' });
    }
  }

router.get('/users', authorize, async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
