const { Router } = require('express');
const { getAllDogsOrByQuery, getDogsById, createDog } = require ("../controllers/dogController");
const { getAllTemperaments } = require ("../controllers/temperamentController");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getAllDogsOrByQuery);

router.get("/dogs/:id", getDogsById)

router.post("/dog", createDog)

router.get("/temperament", getAllTemperaments);

module.exports = router;
