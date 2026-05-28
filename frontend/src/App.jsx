import { useState } from "react";
import { useEffect } from "react";

function App(){

  const [tareas,setTareas] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [modo,setModo] = useState("normal");//Con esto manejo los formularios
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

    if(!title){
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
    }
    catch(error){
      setError("Ocurrio un error, no se pudo crear la tarea");
    }
  }

  if(loading){
    return <p>Cargando...</p>
  }
  if(error){
    return <p>{error}</p>
  }

  return(
    <div style={{padding:"20px"}}>
      <h1 style={{display:"flex",justifyContent:"center"}}>Administrador de Tareas</h1>

      {modo === "normal" && 
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>
        <div>
          <input type="text" placeholder="Buscar por Id"/>
          <button>Buscar</button>
        </div>

        <button onClick={()=> setModo("crear")}>Nueva Tarea</button>
      </div>
      }

      {modo === "crear" &&
      <div style={{border:"1px solid gray",padding:"15px",borderRadius:"10px",margin:"20px auto",display:"flex",flexDirection:"column",gap:"10px",width:"300px"}}>
        <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)}/>
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
            <p>Descripcion:{e.description}</p>
            <p>Estado:{e.completed ? "Completado" : "Pendiente"}</p>

            <div style={{display:"flex",gap:"10px"}}>
              <button>Editar</button>
              <button>Eliminar</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;