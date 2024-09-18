import express from "express";
import cors from "cors";
import "dotenv/config";
import Utils from "./utils.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("<h1>Tracker</h1>");
});

app.get("/performance", async (req, res) => {
  const paramsGet = req.query;
  const urlDestino = paramsGet.url;
  const urlPost = process.env.URL_POST_PERFORMANCE;

  const paramsPost = {
    email: paramsGet.email,
    date: paramsGet.date,
  };

  try {
    await Utils.axiosPost(urlPost, paramsPost);
    res.redirect(urlDestino);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});

app.get("/review", async (req, res) => {
  const paramsGet = req.query;
  const urlDestino = paramsGet.url;
  const urlPost = process.env.URL_POST;

  const paramsPost = {
    emailToTrack: paramsGet.email,
    base: paramsGet.base,
    date: paramsGet.date,
  };

  try {
    res.redirect(urlDestino);
    await Utils.axiosPost(urlPost, paramsPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});

app.get("/check-availability", async (req, res) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  let isAvailable = false;

  if (day >= 1 && day <= 5) {
    isAvailable = true;
  } else if ((day === 0 || day === 6) && hour >= 10 && hour < 16) {
    isAvailable = true;
  }

  res.json({ available: isAvailable });
});

app.use((req, res) => {
  res.send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`server listing on port ${PORT}`);
});
