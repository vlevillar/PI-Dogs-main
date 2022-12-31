const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;


const getApiInfo = async () => {
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}');
    if (!data) throw new Error ("Error! status ${data.status}");
    const dogsApi = data.map( e => ({
        id: e.id,
        name: e.name,
        height: e.height.imperial,
        weight: e.weight.imperial,
        life_span: e.life_span,
        image: e.image.url,
        temperament: e.temperament,
        home_grown_data: false,
        bred_for: e.bred_for
    }));
    return dogsApi;
}

const getDbInfo = async () => {
    try {
        const dbInfo = await Dog.findAll({
            include: {
                model : Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        return dbInfo;
    }
    catch(e){
        console.log(e.message);
    }
    return [];
}

const getAllDogs = async () => {
    let ApiInfo = await getApiInfo();
    let DbInfo = await getDbInfo();
    let allDogs = ApiInfo.concat(DbInfo);
    return allDogs;
}

const getAllDogsOrByQuery = async (req, res) => {
    const name = req.query.name;
    const allBreeds = await getAllDogs();
    if (name) {
        const dogName = await allBreeds.filter(e => e.name?.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? res.status(200).send(dogName) : res.status(404).send("Dog not found");
    }else{
        res.status(200).send(allBreeds);
    }
}

const getDogsById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dogsTotales= await getAllDogs()
        
        const dog = dogsTotales.find(ele => ele.id == id);

        if(!dog){
            res.status(404).send("No esta disponible");
        } else {
            res.status(200).send(dog);
        }
    } catch (error) {
        next(error);
    }
}

const createDog = async (req, res) => {
    // const { name, heightMax, heightMin, weightMax, weightMin, life_spanMax, life_spanMin, image, temperament } = req.body;
    // let temperamentId = await Temperament.findOne({ 
    //     where: { name: temperament }
    // });
    // let dogName = await getApiInfo().then((d) => d.find((d) => d.name === name)); 

    //     if(!name || !heightMax || !heightMin || !weightMax || !weightMin || !temperament){
    //         res.status(400).send("Faltan datos");
    //     } else if (dogName){ 
    //         res.status(404).send("El nombre del perro ya existe"); 
    //     } else if (heightMax < heightMin || weightMax < weightMin || life_spanMax < life_spanMin){
    //         res.status(400).send("Los datos minimos no pueden ser mayor a los datos maximos"); 
    //     } else if (heightMax > 200 || heightMin < 0 || weightMax > 100 || weightMin < 0 || life_spanMax > 30 || life_spanMin < 0){
    //         res.status(400).send("Datos invalidos"); 
    //     } else if (temperamentId === null){
    //         res.status(400).send("Temperamento invalido"); 
    //     } else {
    //         Dog.create({ 
    //             name: name,
    //             heightMin: parseInt(heightMin),
    //             heightMax: parseInt(heightMax),
    //             weightMin: parseInt(weightMin),
    //             weightMax: parseInt(weightMax),
    //             life_spanMax: parseInt(life_spanMax),
    //             life_spanMin: parseInt(life_spanMin),
    //             createdInBd: true,
    //             image: image || "https://www.dogbreedslist.info/uploads/dog-pictures/beagle-2.jpg",
    //         })
    //         .then(async (dog) => {
    //             const temp = await Temperament.findAll({
    //                 where: { name: temperament }, 
    //             });
    //             await dog.addTemperament(temp);
    //             res.status(201).send(dog);
    //         }).catch(err => err)
    
    //         res.send("Perro creado");
    //     }
    const {
        name,
        height,
        weight,
        life_span,
        temperament,
        image,
      } = req.body;
    
      const createDog = await Dog.create({
        name:name,
        height: height,
        weight: weight,
        life_span: life_span,
        image: image,
        temperament: temperament,
        
      });
     if(createDog){
    res.status(200).json(createDog);
     }else{
       res.status(500).send('uncreated dog')
     }
}

module.exports = { getAllDogsOrByQuery,getDogsById, createDog }