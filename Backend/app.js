const express = require('express');
const app = express();
const cors = require("cors");
const PORT=3000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.json({'mensaje':'servidor funcionando'});
});

tareas = [] //Array que se utiliza para guardar las tareas.

//Endpoint get que muestra todas las tareas.
app.get('/tarea',(req,res) => {
    res.status(200).json(tareas);
});

//endpoint get que filtra una tarea con su respectivo id
app.get('/tarea/:id',(req,res) => {
    const id = req.params.id;
    const tarea_id = tareas.find((elemento) => elemento.id===id);
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        res.status(200).json(tarea_id);
    }
})

//endpoint post que carga las tareas con el modelo adecuado
app.post('/tarea', (req,res) => {
    const tarea = req.body;
    if(!tarea.title){
        res.status(400).json(tarea);  
    }else{
        const tareaCreada = {
        "id":String(tareas.length+1),//Acabo de cambiar esto, por si algo falla despues
        "title":tarea.title,
        "description":tarea.description || "",
        "completed":false,
        "createdAt":new Date().toISOString()
        }
        tareas.push(tareaCreada);
        res.status(201).json(tareaCreada);
    }
})

//endpoint delete que elimina una tarea por su id
app.delete('/tarea/:id',(req,res) => {
    const id = req.params.id;
    const tarea_id = tareas.find((elemento) => elemento.id===id);
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        tareas = tareas.filter((elemento) => elemento.id !== id);
        res.status(200).json(tareas);
    }
})

//endpoint put que actualiza los datos de una tarea
app.put('/tarea/:id',(req,res) => {
    const id = req.params.id;
    const tarea_id = tareas.find((elemento) => elemento.id===id);
    const tarea_actualizada = req.body;
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        if(tarea_actualizada.title){
        tarea_id.title = tarea_actualizada.title;
        }
        if(tarea_actualizada.description){
            tarea_id.description=tarea_actualizada.description;
        }
        if(tarea_actualizada.completed !== undefined){
            tarea_id.completed = tarea_actualizada.completed;
        }
        res.status(200).json(tarea_id);
    };
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo en localhost:${PORT}`);
});