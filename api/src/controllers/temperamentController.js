const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const getAllTemperaments = async(req, res) => {
    const tempApi = await axios('https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}');
    const tempDB = tempApi.data
    .map((t) => t.temperament)
    .toString()
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
    const filtro = tempDB.filter((t) => t);
    let tempFilt = [...new Set(filtro)];

    tempFilt.forEach((t) => {
        Temperament.findOrCreate({
            where: { name: t },
        });
    });

    const totalTemp = await Temperament.findAll();
    res.json(totalTemp)
}

module.exports = { getAllTemperaments }