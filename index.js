const express = require("express");

const app = express();

const API_KEY = process.env.HENRIK_API_KEY;
const NAME = process.env.VAL_NAME;
const TAG = process.env.VAL_TAG;
const REGION = process.env.VAL_REGION || "br";

app.get("/", (req, res) => {
  res.send("API online.");
});

app.get("/elo", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v3/mmr/${REGION}/${NAME}/${TAG}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.send("Erro ao buscar o elo.");
    }

const rank = data.data.current.tier.name;
const rr = data.data.current.rr || data.data.current.elo;

    res.send(`${NAME} está ${rank} com ${rr} RR.`);
  } catch (err) {
    res.send("Erro ao buscar o elo.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
