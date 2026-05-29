import { useState } from "react";
import { useEffect } from "react";

function App(){

  const [tareas,setTareas] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [completed,setCompleted] = useState(false);
  const [modo,setModo] = useState("normal");
  const [tareaEliminadaBoolean,setTareaEliminadaBoolean] = useState(false);
  const [tareaEliminada,setTareaEliminada] = useState(null)
  const [tareaEditar,setTareaEditar] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  const conseguirTareas = async () => {
    try{
      const respuesta = await fetch("http://localhost:3000/tarea")
      const datos = await respuesta.json();

      setTareas(datos);
    }
    catch(error){
      setError("Ocurrio un error");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    conseguirTareas();
  }, [])

  const cargarTarea = async () => {
    const nuevaTarea = {
      "title":title,
      "description" : description
    }

    if(!title.trim()){
      return;
    }

    try{
      const respuesta = await fetch("http://localhost:3000/tarea",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(nuevaTarea)
      });

      const tareaCreada = await respuesta.json();
      setTareas([
        ...tareas,
        tareaCreada
      ]);

      setTitle("");
      setDescription("");
      setModo("normal");
    }
    catch(error){
      setError("Ocurrio un error, no se pudo crear la tarea");
    }
  }
 
  const eliminarTarea = async (id) => {
    try{
      await fetch (`http://localhost:3000/tarea/${id}`, {
      method:"DELETE"
      })


      const tareasOptimizadas = tareas.filter((e) => e.id!==id);

      setTareas(tareasOptimizadas);
    }
    catch(error){
      setError("Ocurrio un error, no se pudo eliminar la tarea");
    }
  }
 
  const modificarTarea = async () => {
    const tareaModificada = {
      "title":title,
      "description":description,
      "completed":completed
    }

    try{
      await fetch(`http://localhost:3000/tarea/${tareaEditar.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(tareaModificada)
      });

      conseguirTareas();
      setModo("normal");
    }
    catch(error){
      setError("Se produjo un error, no se pudo modificar la tarea")
    }
  }


  if(loading){
    return <p style={{display:"flex",justifyContent:"center"}}>Cargando...</p>
  }
  if(error){
    return <p style={{display:"flex",justifyContent:"center"}}>{error}</p>
  }

  return(
    <div style={{padding:"20px"}}>
      <h1 style={{display:"flex",justifyContent:"center"}}>Administrador de Tareas</h1>

      {modo === "normal" && 
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>
        <button onClick={()=> setModo("crear")}>Nueva Tarea</button>
      </div>}

      {modo === "crear" &&
      <div style={{border:"1px solid gray",padding:"15px",borderRadius:"10px",margin:"20px auto",display:"flex",flexDirection:"column",gap:"10px",width:"300px"}}>

        <h2 style={{display:"flex",justifyContent:"center"}}> Crear Tarea</h2>
        <input type="text" placeholder="Titulo(Obligatorio)" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Descripcion" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <button onClick={cargarTarea}>Crear</button>
        <button onClick={() => setModo("normal")}>Cancelar</button>

      </div>
      }

      <div>
        {tareas.length === 0 ? <p style={{display:"flex",justifyContent:"center"}}>No existen tareas</p>
        : tareas.map((e) => (
          <div key={e.id} style={{border:"1px solid gray",padding:"10px",marginBottom:"10px",marginTop:"20px"}}>

            <h2>Titulo:{e.title}</h2>
            <p style={{overflowWrap:"break-word"}}><b>Descripcion:</b>{e.description}</p>
            <p>Estado:{e.completed ? "Completado" : "Pendiente"}</p>

            <div style={{display:"flex",gap:"10px"}}>

              <button onClick={() => {
                setTareaEditar(e);
                setModo("editar");
                setTitle(e.title);
                setDescription(e.description);
                setCompleted(e.completed);
              }}>Editar</button>

              <button onClick={() => {
                setTareaEliminadaBoolean(true);
                setTareaEliminada(e);
              }}>Eliminar</button>
            </div>
            {tareaEliminadaBoolean && tareaEliminada?.id === e.id &&
              <div style={{border:"1px solid red",padding:"15px",borderRadius:"10px",margin:"15px 0",backgroundColor:"#ffe5e5"}}>

                <p>Seguro que desea eliminar esta tarea?</p>
                <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>
                  <button onClick={() => {
                  eliminarTarea(tareaEliminada.id);
                  setTareaEliminadaBoolean(false)
                  }}>Si</button>

                  <button onClick={() => setTareaEliminadaBoolean(false)}>No</button>
                </div>
              
              </div>}
            
            {modo === "editar" && tareaEditar?.id === e.id &&
              <div style={{border:"1px solid gray",padding:"15px",borderRadius:"5px",marginTop:"15px",width:"350px",display:"flex",flexDirection:"column",gap:"10px",backgroundColor:"#f5f5f5"}}>

                <h2 style={{display:"flex",justifyContent:"center"}}> Modificar Tarea</h2>

                <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder="Descripcion" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <p>Estado:{completed ? "Completado" : "Pendiente"}</p>

                <button onClick={() => {
                  !completed ? setCompleted(true) : setCompleted(false);
                }}>Presione para cambiar estado</button>

                <button onClick={modificarTarea}>Modificar</button>
                <button onClick={() => setModo("normal")}>Cancelar</button>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;