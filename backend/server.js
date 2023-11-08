import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./database/conn.js";
import { router } from "./routr/routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered"); // lees hackers know about my stack

const port = 8000;

// http get request
app.get("/", (req, res) => {
  res.status(201).json("home get request");
});

// api routes
app.use("/api", router);

// start development server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalide database connection...!");
  });
