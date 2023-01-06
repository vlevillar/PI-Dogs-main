# **Proyecto Individual - Henry dogs**

<img height="200" src="./dog.png" />

Bienvenido a mi resumen de mi proyecto individual "dogs"

En este proyecto, utilizaremos una API externa llamada "Dogs" para obtener información sobre diferentes razas de perros. Utilizaremos esta información para crear una aplicación web que permita a los usuarios buscar razas de perros por nombre y ver información detallada sobre cada raza, tambien, poder crear nuestro propio perro dentro de la pagina!

A este proyecto individual lo hice aplicando mis conocimientos en base de datos, backend y frontend. Con la ayuda de las tecnologias React, Redux, Postgress, Express y entre otras.

# **Base de datos**

Primero, cree un archivo .env, en la cual tengo la informacion para acceder a la base de datos, es decir, el usuario, contraseña, host y tambien, la api key.

Despues, empecé haciendo la base de datos, creando dos modelos; Dog y Temperament (con su respectivas entidades, por ejemplo el name, id, etc). Y despues hago las relaciones.

```bash
Dog.belongsToMany(Temperament, { through: "dog_temperament"})
Temperament.belongsToMany(Dog, { through: "dog_temperament"})
```

# **Backend**

Al back lo arranqué haciendo primero los controladores, yo hice dos controladores llamados dogController y temperamentController. En estos mismos hice funciones asincronas ¿porque asincronas? para poder ejecutar otras tareas mientras esperan la respuesta de una operacion asincrona y utilizo la palabra clave await para esperar que se complete una promesa.

## Controladores y que hace cada función en los controladores:
`1. dogController:`
```bash
# getApiInfo:
Esta función crea una solicitud a la API externa y procesa la respuesta para crear un array de objetos con algunos de los datos de la respuesta, y por ultimo, devuelve un array de objetos que representan a los datos de la API llamado "dogsApi".
```
```bash
# getDbInfo:
Esta función realiza una consulta a la base de datos y retorna información de dos colecciones relacionadas a traves de una tabla intermedia excluyendo los atributos de la tabla intermedia de los resultados de la consulta.
```
```bash
# getAllDogs:
Esta función junta a traves de un concat toda la información de la api y de la base de datos y las devuelve en un array llamado "allDogs".
```
```bash
# getAllDogsOrByQuery:
Esta función obtiene los datos de todos los perros y si se proporciona un parametro de consulta ("req.query.name"), filtra el array "allDogs" para obtener solo aquellos elementos con el atributo "name" (ignorando mayusculas y minusculas). Despues envia una respuesta con todos los datos filtrados dependendiendo del paramentro de consulta.
```
```bash
# getDogsById:
Esta función obtiene todos los datos de los perros a traves de la función "getAllDogs" y busca un elemento en el array que tenga de atributo "id" igual al parametro de ruta "id". Si se encuentra, se envia una respuesta con el elemento como cuerpo de la respuesta. Si no se encuentra el elemento, se envia una respuesta con un mensaje de error indicando que el perro no está disponible.
```
```bash
# createDog:
Esta funcion obtiene varios atributos del body de la solicitud y los almacena en variables con el mismo nombre. Luego utiliza sequelize para crear un nuevo documento en la colección "Dog" con los atributos obtenidos del body de la solicitud.
```
`2. temperamentController:`
```bash
# getAllTemperaments:
Esta función realiza una solicitud a la API, procesa los datos de la respuesta y crea documentos en una colección de base de datos ("Temperaments"), despues obtiene todos los documentos de la colección y los envia en una respuesta HTTP.
```

## Rutas
Las rutas las definí en un index.js (dentro de la carpeta routes), importando a cada una de las funciones que necesite, en este caso importé a `getAllDogsOrByQuery`, `getDogsById`, `createDog` y `getAllTemperaments`. Luego, configué todos los routers.
```bash
router.get("/dogs", getAllDogsOrByQuery);
```
```bash
router.get("/dogs/:id", getDogsById);
```
```bash
router.post("/dog", createDog);
```
```bash
router.get("/temperament", getAllTemperaments);
```

## Tests
Los tests los hice en la base de datos y en los controladores. En la base de datos cree tests "simples" como por ejemplo comprobar si en un modelo una entidad es null (es decir si tiene o no el allowNull). Y en los tests de los controladores verifico que los routers anden bien, por ejemplo, comprobar si un name por query me llega correctamente o incorrectamente.

# **Frontend**
## Store
Como primer paso, configuro el store de la siguiente manera (en este caso está configurado para poder usar una extensión de redux)
```bash
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
```
Luego, en el index.js del archivo raiz, importo el provider y el store. Despues los renderizo.
```bash
import {Provider} from "react-redux";
import {store} from "./redux/store"
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);
```
## Rutas
Las rutas las definí en el archivo raiz `app.js`. Estas mismas las definí con la etiqueta `Route`. Estas rutas tienen un atributo `path` que indica la URL a la que accederá para ver el contenido de la ruta y un atributo `component` que especifica que componente se debe mostrar en pantalla cuando se acceda a esa ruta. Las rutas son las siguientes:
```bash
<Route exact path="/" component={LandingPage}/>
Esta es la ruta principal de la aplicación y se va a mostrar cuando se ingrese a la URL base de la aplicación. El componente que se renderiza es "LandingPage".
```
```bash
<Route exact path="/home" component={Home}/>
El componente que se renderiza es "Home".
```
```bash
<Route exact path="/dog" component={DogCreate}/>
El componente que se renderiza es "DogCreate".
```
```bash
<Route exact path="/dogs/:id" component={Detail}/>
El componente que se renderiza es "Detail".
```

## Componentes
Un componente es una pieza de codigo reutilizable que representa un elemento de la interfaz de usuario en la apliación. Los componentes pueden tener su propio estado y lógica y pueden ser anidados para crear una jerarquía compleja de componentes.
En mi proyecto nos podemos encontrar con distintos componentes con su respectiva función, las cuales son los siguientes:
```bash
# Card:
Este componente sirve para renderizar cada una de las cards, esta toma varios argumentos ("name", "image", "temperament", etc), estos argumentos se utilizan para establecer los valores de diferentes atributos del componente. Es decir, acá es en donde se muestra información basica de un perro y tambien proporcionar un link a una pagina del detail a su respectivo perro.
```
```bash
# Detail:
Este componente sirve para renderizar informacion detallada sobre una raza de perro. Primero se verifica si la informacion de la raza de perro ha sido obtenida, si es asi, muestra la imagen, nombre, temperamento, altura, peso y esperanza de vida. Si no se obtiene, muestra una pantalla de carga. Al final de la pagina se muestra un botón "Home" que lleva al usuario a la pagina principal.
```
```bash
# DogCreate:
Este componente es un formulario de creacion de perros, el formulario incluye una serie de campos de entrada para el nombre del perro, peso, altura, esperanza de vida y subida de imagen. Tambien incluye un campo de seleccion para el temperamente del perro y una opcion de eliminar temperamentos. Al enviar el formulario se llama a la función "resState" y se espera que limpie el estado del formulario y envie la informacion del formulario a la base de datos.
```
```bash
# Home:
Este componente es la pagina principal. En el cual, se pueden encontrar las "cards", un "paginado", una "barra de busqueda", los "filtrados", un botón para "refrescar las cards" y otro boton con un "link al formulario de creación de perros".
    En este mismo, hago uso de los event handlers "handleSortName", "handleSortWeight", "handleFilterTemperaments" y "handleFilterExistingBreed" que se ejecutan cuando el usuario selecciona una opcion en uno de los "<select/>". Estos mismos se encargan de cambiar el estado de la aplicacion segun la opcion que haya elegido.
    Tambien, hago uso de distintas funciones. Estas son:
    * "handleClick": Esta se encarga de cuando se haga click en el boton "Refresh Dogs" se actualize toda la lista de perros que muestra en pantalla.
    * "setCurrentPage": Esta se encarga de cambiar la pagina actual cuando el usuario navega entre ellas.
    Ademas, hago uso dos componentes. Estos son:
    * "Searchbar": Este es un componente de busqueda que permite al usuaio filtrar la lista de perros por nombre .
    * "Pages": Este se encarga de mostrar los botones de paginación y se encarga de navegar entre ellas.
```
```bash
# LandingPage:
Este componente se encarga de renderizar una landingPage, con un mensaje de bienvenida y una frase relacionada a perros. Tambien incluye un botón con un "link" encargado de direccionar a "/home".
```
```bash
# Loading:
Este componente se encarga de renderizar un cartel de loading, con el mensaje "Loading dogs..." y un gif de carga.
```
```bash
# Pages:
Este componente se encarga de mostrar una lista de numeros de pagina que corresponden a la cantidad de perros que hay en la aplicación. Cada vez que el usuario hace clic en uno de los numeros, la función "paginado" es llamda y se usa para mostrar la lista de perros correspondientes a esa pagina en particular.
```
```bash
# SearchBar:
Este componente se encarga de mostrar una barra de busqueda. Este mismo tiene una función llamada "handleSubmit", la cual se encarga de enviar el formulario con el termino de busqueda ingresado en el input. La función "handleInputChange" se encarga de actualizar el valor del termino de busqueda del usuario mientras escribe en el input. Esto se legro asignando el valor de evento "e" al estado "name".
```

## Actions:
En las `actions` podemos encontrar un conjunto de funciones que se encargan de realizar diferentes acciones. Estas funciones estan diseñadas para interactuar con un servidor a traves de la librebría Axios, la cual se encarga de realizar solicitudes HTTP. Estas funciones son:
```bash
# getDogs:
Esta funcion se encarga de obtener una lista de perros almacenados en el servidor y retornar una accion que envia esta lista como payload al store de la aplicación. La accion retornada tiene un tipo y un payload.
```
```bash
# getTemperaments:
Esta funcion hace lo mismo que "getDogs" pero con los temperamentos de los perros.
```
```bash
# getDogName:
Esta función se encarga de obtener un perro especifico del servidor usando su nombre como parametro y retornar una acción que envia al perro obtenido como payload.
```
```bash
# getDetail:
Esta función se encarga de obtener los detalles de un perro en especifico del servidor usando su ID como parametro y retornar una acción que envia los detalles del perro obtenido como payload.
```
```bash
# orderByName, filterTemperament, filterExistingBreed y sortWeight:
Estas funciones se encargan de retornar acciones que envian un payload especifico para realizar ciertas acciones de filtrado y ordenamiento dentro del store de la pagina.
```
```bash
# postDogs:
Esta funcion se encarga de enviar un perro al servidor para que sea almacenado.
```
```bash
# resState:
Esta funcion se encarga de resetear el estado de algo.
```

## Reducer
Un reducer es una función que toma dos argumentos: el estado actual y una action, y devuelve un nuevo estado resultante.
En el caso de mi reducer, en la funcion `rootReducer` toma el state y una action como argumentos, y dependiendo del tipo de action, devuelve un nuevo estado. En el reducer tambien encontramos un Switch, el cual sirve para determinar que accion se debe realizar. Cada case del switch corresponde a un tipo de acción deferente, y el reduver actualiza el estado del aplicativo en consecuencia. 
En este proyecto se encuentran las siguientes acciones:
```bash
# GET_DOGS:
Esta accion hace una solicitud al backend en la direccion "/dogs" y almacena la respuesta en la variable "json", despues le envia un mensaje al reducer con el tipo "GET_DOGS" y el payload que es el contenido de la respuesta ("json.data").
```
```bash
# GET_TEMPERAMENTS:
Parecido a la action anterior, pero esta accion le hace una solicitud al back en la direccion "/temperament" y envia un mensaje al reducer con el tipo "GET_TEMPERAMENTS" y el payload que es el contenido de la respuesta ("json.data").
```
```bash
# GET_DOG-NAME:
Esta accion hace una solicitud al backend en la direccion "/dogs?name=${name}", donde "name" es un parametro que recibe la función. El servidor responderá con los perros que tengan el mismo nombre. Despues, envia un mensaje al reducer con el tipo "GET_DOG-NAME" y el payload del contenido de la respuesta ("json.data").
```
```bash
# GET_DETAIL:
Esta accion hace una solicitud al backend en la dirección "/dogs/${id}", donde "id" es un parametro que recibe la función. El servidor va a responder con el detalle del perro que tenga ese mismo id. Despues envia un mensaje al reducer con el tipo "GET_DETAIL" y el payload que es el contenido de la respuesta ("json.data").
```
```bash
# ORDER_BY_NAME:
Esta acción envia un mensaje al reducer con el tipo "ORDER_BY_NAME" y el payload que es el valor del parametro que recibe la función. Este valor puede ser "asc" (de la A a la Z) o "desc" (de la Z a la A).
```
```bash
# FILTER_TEMPERAMENT:
Esta acción envia un mensaje al reducer con el tipo "FILTER_TEMPERAMENT" y el payload que es el valor del parametro que recibe la función. Este valor es el nombre de un temperamento. Si el valor es "All", entonces la acción no se filtra por temperamento y retorna todos los perros.
```
```bash
# FILTER_EXISTING_BREED:
Esta acción filtra los perros de acuerdo si estan en la base de datos o en la API. Si recibe el valor "All", retorna todos los perros. Si recibe el valor "db", retora solo los perros que estan en la base de datos. Si recibe el valor "api", retorna solo los perros que estan en la API.
```
```bash
# SORT_WEIGHT:
Esta acción ordena los perros segun su peso. Si recibe el valor "All", retorna todos los perros sin ordenar. Si recibe el valor "small", retorna todos los perros ordenados de menor a mayor peso. Si recibe el valor "big", retorna todos los perros ordenados de mayor a menor peso.
```
# **Final**
En resumen, este proyecto es una aplicación web que utiliza React para crear componentes y navegación entre ellos. Utiliza Axios para hacer solicitudes HTTP a una API y almacena la información recibida en el estado de la aplicación mediante el uso de Redux. También permite a los usuarios crear y enviar datos a la API mediante formularios. En general, es una aplicación para ver y gestionar información sobre diferentes razas de perros.
Espero que les haya gustado :)

Con ♥ Valentino Villar.