import cors from 'cors';
import express from 'express';
import path from 'path';
import './mongoose.ts';
import characterRouter from './routers/characterRouter';

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(characterRouter);
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(port, () => {
  console.log(`Server up on port ${port}.`);
});
