const express = require('express');
const app = express();
const PORT=3000;

app.use(express.json());

app.get('/',(req,res) => {
    res.json({'mensaje':'servidor funcionando'});
});

tareas = [] //Array que se utiliza para guardar las tareas.

//Endpoint get que muestra todas las tareas.
app.get('/tarea',(req,res) => {
    if(tareas.length===0){
        res.status(200).json({'mensaje':'Aun no hay tareas'});
    }else{
        res.status(200).json(tareas);
    }
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo en localhost:${PORT}`);
});
