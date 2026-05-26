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

//endpoint post que carga las tareas con el modelo adecuado
app.post('/tarea', (req,res) => {
    const tarea = req.body;
    if(!tarea.title){
        res.status(400).json({'mensaje':'Titulo no ingresado'});  
    }else{
        tareas.push({
        "id":(tareas.length+1),
        "title":tarea.title,
        "description":tarea.description || "",
        "completed":false,
        "createdAt":new Date().toISOString()
        })
        res.status(201).json({'mensaje':'Datos ingresados correctamente'})
    }
})

//endpoint get que filtra una tarea con su respectivo id
app.get('/tarea/:id',(req,res) => {
    const id = req.params.id;
    const tarea_id = tareas.find((elemento) => elemento.id===parseInt(id));
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        res.status(200).json({
        'mensaje':'Tarea encontrada',
        'tarea':tarea_id
        });
    }
})

//endpoint delete que elimina una tarea por su id
app.delete('/tarea/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const tarea_id = tareas.find((elemento) => elemento.id===id);
    if(!tarea_id){
        res.status(404).json({'mensaje':'La tarea no existe'});
    }else{
        tareas = tareas.filter((elemento) => elemento.id !== id);
        res.status(200).json({'mensaje':'La tarea se elimino correctamente'});
    }
})

app.listen(PORT,() => {
    console.log(`Servidor corriendo en localhost:${PORT}`);
});
