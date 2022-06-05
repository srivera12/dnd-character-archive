import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    backstory: {
      type: String,
    },
    characterRace: {
      type: String,
      required: true,
    },
    characterClass: {
      type: String,
      required: true,
    },
    inUse: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model('Character', characterSchema);

export default Character;
