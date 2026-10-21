import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';

import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

// Phục vụ thư mục upload ảnh tĩnh
app.use('/upload', express.static(path.resolve(serverRoot, 'public/upload')));

app.use('/api/v1', apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
