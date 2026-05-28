function App(){

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
        <h2>Titulo:</h2>
        <p>Descripcion:</p>
        <p>Estado:</p>

        <button>Editar</button>
        <button>Eliminar</button>

      </div>
    </div>
  )
}

export default App;