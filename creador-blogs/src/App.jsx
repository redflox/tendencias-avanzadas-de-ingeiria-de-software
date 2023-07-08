import React, { useState } from 'react';
import { create, element, text, fragment } from 'xmlbuilder2';
import './App.css';

function App() {
  const [header, setHeader] = useState(false);
  const [menu, setMenu] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [opcionesMenu, setOpcionesMenu] = useState([]);
  const [columnaPrincipal, setColumnaPrincipal] = useState(false);
  const [posts, setPosts] = useState(false);
  const [nombreAutor, setNombreAutor] = useState('');
  const [fecha, setFecha] = useState('');
  const [nombreArticulo, setNombreArticulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState('');
  const [footer, setFooter] = useState(false);
  const [imagenFooter, setImagenFooter] = useState('');
  const [textoFooter, setTextoFooter] = useState('');
  const [contenidoPost, setContenidoPost] = useState('');

  const handleAgregarOpcion = (e) => {
    e.preventDefault()
    setOpcionesMenu([...opcionesMenu, '']);
  };

  const handleEliminarOpcion = (e,index) => {
    e.preventDefault()
    const nuevasOpciones = [...opcionesMenu];
    nuevasOpciones.splice(index, 1);
    setOpcionesMenu(nuevasOpciones);
  };

  const handleEditarOpcion = (index, valor) => {
    const nuevasOpciones = [...opcionesMenu];
    nuevasOpciones[index] = valor;
    setOpcionesMenu(nuevasOpciones);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Código que puede generar una excepción
      const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('blog')
      // TITULO
      if(titulo.length >= 0){
        xml.ele('titulo').txt(titulo).up()
      }else{
        throw new Error("¡Se generó una excepción titulo!");
      }
      // DESCRIPCION
      if(descripcion.length >= 0){
        xml.ele('descripcion').txt(descripcion).up()
      }else{
        throw new Error("¡Se generó una excepción descripcion!");
      }
      // HEADER
      if(header){
        const headerElement = xml.ele('header');
        if(menu){
          const menuElement = headerElement.ele('menu')
          if(opcionesMenu.length > 0){
            opcionesMenu.map(element => {
              menuElement.ele('item').att('href', '/' + element).txt(element).up()
            })
          }
        }
      }
      // COLUMNA PRINCIPAL
      if(columnaPrincipal){
        const colprinElement = xml.ele('body');
        const contenidoElement = colprinElement.ele('contenido')
        if(posts){
          const postsElement = contenidoElement.ele('post');         
        }
      }

      //FOOTER
      if(footer){
        const footerElement = xml.ele('footer');        
      }      
      const xmlString = xml.end({ prettyPrint: true });
      console.log(xmlString);
    } catch (error) {
      // Manejo de la excepción
      console.error("Se capturó una excepción:", error.message);
      alert("REVISA EL FORMULARIO")
    } 

  };

  return (
    <div className='formulario-container'>      
      <form className='formulario' onSubmit={handleSubmit}>
      <h2>Formulario para crear Blog</h2>
        {/* TITULO */}
        <div className="margen card">
          <div class="card-body">
            <div className="formulario-grupo">
              <label htmlFor="titulo">Titulo:</label>
              <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
          </div>
        </div>

        {/* DESCRIPCION */}
        <div className="margen card">
          <div class="card-body">
            <div className="formulario-grupo">
              <label htmlFor="descripcion">Descripcion:</label>
              <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
          </div>
        </div>

        {/* HEADER */}

        <div className="margen card">
          <div class="card-body">

            <div className="formulario-grupo">
              <label htmlFor="header">Header:</label>
              <select className="form-select" aria-label="Default select example" id="header" onChange={(e) => setHeader(e.target.value === 'si')}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>


            {header && (
          <>
            <div className="formulario-grupo">
              <label htmlFor="menu">Menu:</label>
              <select className="form-select" aria-label="Default select example" id="menu" onChange={(e) => setMenu(e.target.value === 'si')}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>

            {menu && (
              <div>
                <button 
                  onClick={handleAgregarOpcion}
                  className="btn btn-outline-primary" 
                >Agregar opción</button>

                {opcionesMenu.map((opcion, index) => (
                  <div key={index} className="form-group">
                    <div key={index} className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre de la pagina" 
                        aria-label="Nombre de la pagina"
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleEditarOpcion(index, e.target.value)}/>
                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={(e) => handleEliminarOpcion(e,index)}
                          >Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
              </>
            )}


            
          </div>
        </div>


        {/* COLUMNA PRINCIPAL */}

        <div className="margen card">
          <div className="card-body">
            
            <div className="formulario-grupo">
              <label htmlFor="columnaPrincipal">Columna principal:</label>
              <select
                className="form-select" aria-label="Default select example"
                id="columnaPrincipal"
                onChange={(e) => setColumnaPrincipal(e.target.value === 'si')}
              >
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>

            {columnaPrincipal && (
              <>
                <div className="formulario-grupo">
                  <label htmlFor="posts">Posts:</label>
                  <select className="form-select" aria-label="Default select example" id="posts" onChange={(e) => setPosts(e.target.value === 'si')}>
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                  </select>
                </div>               
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div className="margen card">
          <div className="card-body">
            
            <div className="formulario-grupo">
              <label htmlFor="footer">Footer:</label>
              <select className="form-select" aria-label="Default select example" id="footer" onChange={(e) => setFooter(e.target.value === 'si')}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>           
          </div>
        </div>

        <button type="submit" className="formulario-button">Enviar</button>
      </form>
    </div>
  );
}

export default App;