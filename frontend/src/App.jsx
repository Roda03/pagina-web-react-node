import { useState } from "react";
import { useEffect } from "react";

function App(){

  const [tareas,setTareas] = useState([]);
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

  if(loading){
    return <p>Cargando...</p>
  }
  if(error){
    return <p>{error}</p>
  }

  return(
    <div style={{padding:"20px"}}>
      <h1 style={{display:"flex",justifyContent:"center"}}>Administrador de Tareas</h1>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>
        <div>
          <input type="text" placeholder="Buscar por Id"/>
          <button>Buscar</button>
        </div>

        <button>Nueva Tarea</button>
      </div>

      <div style={{border:"1px solid gray",padding:"10px"}}>
        {tareas.length === 0 ? <p style={{display:"flex",justifyContent:"center"}}>No existen tareas</p>
        : tareas.map((e) => (
          <div key={e.id}>
            <h2>Titulo:{e.title}</h2>
            <p>Descripcion:{e.description}</p>
            <p>Estado:{e.completed ? "Completado" : "Pendiente"}</p>

            <button>Editar</button>
            <button>Eliminar</button>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;