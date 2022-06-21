const express = require('express')
const cors=require('cors') 
const morgan = require('morgan')
const fileUp = require('express-fileupload')
const app=express()


// middlewares
app.use(cors())
app.use(express.json()) // para que se pueda utilizar el formato js
app.use(morgan('dev'))
app.use(express.json())
//Recibir archivos
app.use(fileUp({
    useTempFiles: true, //Guarde en memoria
    tempFileDir: './uploads' //Subir en uploads
}));

//Configuraciones
app.set('port',process.env.PORT || 8000 ) //8000

app.get('/',(req,res)=>{
    res.send('Bienvenidos a TLÀLOC')
})

//Rutas para nuestra coleccion de datos
app.use('/api/image',require('./routes/imageRouter'));
app.use('/api/actividad',require('./routes/actividadRouter'));


//Exportaciones de todas las configuraciones que van a index.js
module.exports =app;