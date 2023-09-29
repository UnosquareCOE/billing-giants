import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { seasonRouter } from './routers/seasons';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/seasons', seasonRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});