import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.static(join(__dirname, './client/build')));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:diyahinger123@cluster0.nwbn5mr.mongodb.net/recetta?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './client/build/index.html'), (err) => {
    res.status(500).send(err);
  });
});

app.listen(PORT, () => {
  //console.log(`Server started on port ${PORT}`);
});
