import express from 'express';
import Character from '../models/character';

const characterRouter = express.Router();

characterRouter.post('/characters', async (req, res) => {
  const character = new Character(req.body);
  console.log(character);
  try {
    await character.save();
    res.status(201).send(character);
  } catch (err) {
    res.status(400).send(err);
  }
});

characterRouter.get('/characters', async (req, res) => {
  try {
    if (req.query.dndRace && req.query.dndClass) {
      const characters = await Character.find({ characterRace: req.query.dndRace, characterClass: req.query.dndClass });
      console.log(characters);
      res.send(characters);
    } else if (req.query.dndRace && !req.query.dndClass) {
      const characters = await Character.find({ characterRace: req.query.dndRace });
      res.send(characters);
    } else if (!req.query.dndRace && req.query.dndClass) {
      const characters = await Character.find({ characterClass: req.query.dndClass });
      res.send(characters);
    } else {
      const characters = await Character.find();
      res.send(characters);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

characterRouter.get('/characters/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.sendStatus(404);
    }
    res.send(character);
  } catch (err) {
    res.status(500).send(err);
  }
});

characterRouter.patch('/characters/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['name', 'backstory', 'characterRace', 'characterClass', 'inUse'];
  const isValidOperation = updates.every((update) => validUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.sendStatus(404);
    }
    updates.forEach((update) => {
      character[update] = req.body[update];
    });
    await character.save();
    res.send(character);
  } catch (err) {
    res.status(500).send(err);
  }
});

characterRouter.delete('/characters/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      return res.sendStatus(404);
    }
    res.send(character);
  } catch (err) {
    res.send(500).send(err);
  }
});

characterRouter.delete('/characters', async (req, res) => {
  try {
    const deleted = await Character.deleteMany();
    res.send(deleted);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default characterRouter;
