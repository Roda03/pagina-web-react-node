const express = require('express');
const app = express();
const cors = require("cors");
const PORT=3000;

app.use(cors());
app.use(express.json());

let tareas = [] 
let contadorId = 0; 



const generadorId = () => {
    contadorId++;
    return contadorId;
}

app.get('/',(req,res) => {
    res.json({'mensaje':'servidor funcionando'});
});

app.get('/tarea',(req,res) => {
    res.status(200).json(tareas);
});

app.get('/tarea/:id',(req,res) => {
    const id = req.params.id;
    const tarea_id = tareas.find((elemento) => elemento.id===id);
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        res.status(200).json(tarea_id);
    }
})

app.post('/tarea', (req,res) => {
    const tarea = req.body;
    if(!tarea.title){
        res.status(400).json({"mensaje":"El titulo es obligatorio"});  
    }else{
        const tareaCreada = {
        "id":String(generadorId()),
        "title":tarea.title,
        "description":tarea.description || "",
        "completed":false,
        "createdAt":new Date().toISOString()
        }
        tareas.push(tareaCreada);
        console.log(tareaCreada.id);
        res.status(201).json(tareaCreada);
    }
})

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