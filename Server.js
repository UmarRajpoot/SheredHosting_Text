import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import createHttpError from "http-errors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({
    message: "Server is Running.",
  });
});

app.get("/api", (req, res) => {
  res.send({
    message: "Api Server is Running.",
  });
});

// Global Errors

app.use(async (req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      success: err.success,
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log("Server is Up and Running.");
});
