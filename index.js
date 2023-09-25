import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from "path";

//
import mainRoutes from './routes/main.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(cors());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: true}));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/nodegpd",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000
  });
const connection = mongoose.connection;
connection.once('open',() =>{ console.log(`db connected`)});

app.use('/api',mainRoutes);

app.listen(8000,(console.log('server started port 8000')))

