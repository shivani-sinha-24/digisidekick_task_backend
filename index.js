import express from "express";
import cors from "cors";
import conf from './database/mongoose.js';
import Router from './routes/userRoutes.js';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,POST,PUT,DELETE',
//   credentials:true
//   }
// ));
app.use(cors());
app.use("/uploads", express.static("./uploads"));  

conf();

app.use(Router);
const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
  });
