import express from 'express';
import http from 'http';
import { connectDB } from './helpers/DB.js';
import env from './helpers/env.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());

app.use(express.json({
    limit: "100mb"
}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const server = http.createServer(app);

app.get('/test', (req: express.Request, res: express.Response) => {
    res.json('Hello from Express and TypeScript server!');
}); 

//routes
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

server.listen(env.PORT, () => {
    connectDB(env.MONGO_URI);
    console.log(`Server is running on port: ${env.PORT}`);
});

