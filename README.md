# Tlaloc-Servidor

🌳​ Proyecto que da soporte al Backend del producto Tlaloc de BitJake. Contiene los modulos para gestion de eventos y blogs. Las tecnologias que se utilizaron para este proyecto son:

- Node js 🍄
- Express  🌼
- MongoDB ​☘

## ​🖥️​ Requerimientos necesarios para que el proyecto funcione
- Node js 👉🏼​ 16.14.2 
- Express 👉🏼​ 4.18.1
- MongoDB 👉🏼​ 1.32.2

## ⚙ Instalar dependencias 
```bash
npm i
```

```bash
npm i express
```
## ​🦜​ Descripción sobre Estructura de trabajo
En bitJAKE se trabaja con una estructura en base a funciones, es decir que clasificamos los archivos en carpetas de acuerdo a la funcion que tienen. La estructura es la siguiente:

```
- connection : destinada a gestionar y controlar la conexion a la BD
- controllers : destinada al desarrollo de los diferentes metodos para la creacion de CRUD
- general: destinada para funciones globales
- models : se encuentran todos los schemas
- routes : se encarga de la creacion y control de las rutas para acceder al CRUD
- utils : se encuentra la configuracion para acceder al repositorio de imágenes Cloudinary
```


## ​🦜​ Variables de Entorno
La estructura del archivo `.env` es la siguiente:

```
- MONGODB_URI : es la URL de la BD de mongoDB
- CLOUD_NAME : es el nombre del repositorio para las imàgenes en Cloudinary
- API_KEY: es la llave para acceder al repositorio de imàgenes Cloudinary
- API_SECRET: llave secreta para acceder a las funciones del repositorio de imàgenes Cloudinary
- CLOUDINARY_URL: es la URL de Cloudinary
- FOLDER : Nombre de la carpeta donde se almacenaran las imàgenes
```

## 🛠 Instalación

1. Clonar el proyecto
2. Verificar que se tenga el .env
3. Instala las dependencias
   `npm i`
4. Levantar el proyecto en entorno de desarrollo
   `npm run dev`
5. Levantar el proyecto en entorno de desarrollo
   `npm run start`

## 💻​🔨​ Iniciar con Tareas
- ⚡Si es para una caracteristica nueva crear una rama especifica desde develop, Con la siguiente estructura:
    `feature/caracteristica `

- ⚡Si es para corregir un error crear una rama especifica desde develop, Con la siguiente estructura:
    `hotfix/correcion `

## 🗂 Documentar
✍Colocar la documentacion de los endpoint en postman. Separar por cada modelo. La estructura es la siguiente
 
1.   🌿​ Nombre o titulo del enpoint 
2.   🐢​ Método Utilizado
3.   ​🌴​ Body o headers
4.   ✅ Respuestas
5.   🤙 Códigos
6.   ☠ Errores

## 💻​ Tecnologias (Documentación)
1.  [Node js y Express](https://nodejs.org/en/docs/) 🌹​
2.  [Express](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction) 🌳 
3.  [Mongo DB](https://www.mongodb.com/docs/) 🍁
4.  [Cloudinary](https://cloudinary.com/documentation) 🍀

## ​🦚​ Despliegue
Para desplegar se utilizo `HEROKU`, el cual nos facilita los despliegues por la conexion con Github. 
Se tienen dos entornos:
- **Entorno de producción**: se utiliza la version màs estable del proyecto y contiene la version de codigo que va a producciòn
- **Entorno de desarrollo**: se utilizara para realizar pruebas y para agregar nuevas caracteristicas

El reto en `HEROKU` es al configurar las variables de entorno, ya que se debe tener encuenta el tipo de variable y como estas cambian en cada entorno

## Autores ✒️

* **Zoila Sánchez** - *Desarrolladora Backend* - [ZoilaSanchez](https://github.com/ZoilaSanchez)
* **Andrea Morales** - *Desarrolladora Backend* - [AndreaMorales](https://github.com/AGMH16)