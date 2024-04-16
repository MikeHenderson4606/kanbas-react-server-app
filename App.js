import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import "dotenv/config";
import session from 'express-session';

import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import UserRoutes from './Users/routes.js';

const connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
  
  
app.use(express.json());
mongoose.connect(connectionString);

CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000)