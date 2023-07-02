import React, { useState } from 'react';
import './App.css';

function App() {
  const [header, setHeader] = useState(false);
  const [menu, setMenu] = useState(false);
  const [escribirOpcion, setEscribirOpcion] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica adicional para enviar el formulario o manejar los datos
    console.log('Datos enviados:', {
      header,
      menu,
      escribirOpcion,
      columnaPrincipal,
      posts,
      nombreAutor,
      fecha,
      nombreArticulo,
      contenido,
      imagen,
      footer,
      imagenFooter,
      textoFooter
    });
  };

  return (
    <div className='formulario-container'>      
      <form className='formulario' onSubmit={handleSubmit}>
      <h2>Formulario para crear Blog</h2>
        <div className="formulario-grupo">
          <label htmlFor="header">Header:</label>
          <select id="header" onChange={(e) => setHeader(e.target.value === 'si')}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </div>

        {header && (
          <>
            <div className="formulario-grupo">
              <label htmlFor="menu">Menu:</label>
              <select id="menu" onChange={(e) => setMenu(e.target.value === 'si')}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>

            {menu && (
              <>
            <div className="formulario-grupo">
              <label htmlFor="escribirOpcion">Escribir opción 1:</label>
              <input
                type="text"
                id="escribirOpcion"
                value={escribirOpcion}
                onChange={(e) => setEscribirOpcion(e.target.value)}
              />
            </div>

            <div className="formulario-grupo">
              <label htmlFor="escribirOpcion">Escribir opción 2:</label>
              <input
                type="text"
                id="escribirOpcion"
                value={escribirOpcion}
                onChange={(e) => setEscribirOpcion(e.target.value)}
              />
            </div>
           
            </>
            )}
          </>
        )}

        <div className="formulario-grupo">
          <label htmlFor="columnaPrincipal">Columna principal:</label>
          <select
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
              <select id="posts" onChange={(e) => setPosts(e.target.value === 'si')}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>

            {posts && (
              <>
                <div className="formulario-grupo">
                  <label htmlFor="nombreAutor">Nombre autor:</label>
                  <input
                    type="text"
                    id="nombreAutor"
                    value={nombreAutor}
                    onChange={(e) => setNombreAutor(e.target.value)}
                  />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="fecha">Fecha:</label>
                  <input
                    type="text"
                    id="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="nombreArticulo">Nombre artículo:</label>
                  <input
                    type="text"
                    id="nombreArticulo"
                    value={nombreArticulo}
                    onChange={(e) => setNombreArticulo(e.target.value)}
                  />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="contenido">Contenido:</label>
                  <textarea
                    id="contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                  ></textarea>
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="imagen">Imagen:</label>
                  <input
                    type="file"
                    id="imagen"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="formulario-grupo">
          <label htmlFor="footer">Footer:</label>
          <select id="footer" onChange={(e) => setFooter(e.target.value === 'si')}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </div>

        {footer && (
          <>
            <div className="formulario-grupo">
              <label htmlFor="imagenFooter">Imagen:</label>
              <input
                type="file"
                id="imagenFooter"
                value={imagenFooter}
                onChange={(e) => setImagenFooter(e.target.value)}
              />
            </div>

            <div className="formulario-grupo">
              <label htmlFor="textoFooter">Texto:</label>
              <input
                type="text"
                id="textoFooter"
                value={textoFooter}
                onChange={(e) => setTextoFooter(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit" className="formulario-button">Enviar</button>
      </form>
    </div>
  );
}

export default App;