import React, { useState } from 'react';
import { create } from 'xmlbuilder2';
import axios from 'axios';

function FormXSD() {
    // States
    const [header, setHeader] = useState(false);
    const [menu, setMenu] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [opcionesMenu, setOpcionesMenu] = useState([]);
    const [columnaPrincipal, setColumnaPrincipal] = useState(false);
    const [posts, setPosts] = useState(false);
    const [footer, setFooter] = useState(false);

    // Handlers
    const handleHeaderChange = e => setHeader(e.target.value === 'si');
    const handleMenuChange = e => setMenu(e.target.value === 'si');
    const handleTituloChange = e => setTitulo(e.target.value);
    const handleDescripcionChange = e => setDescripcion(e.target.value);
    const handleColumnaPrincipalChange = e => setColumnaPrincipal(e.target.value === 'si');
    const handlePostsChange = e => setPosts(e.target.value === 'si');
    const handleFooterChange = e => setFooter(e.target.value === 'si');

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const xml = create({ version: '1.0', encoding: 'UTF-8' })
                .ele('blog')
                .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
                .att('xsi:noNamespaceSchemaLocation', 'blog.xsd')

            if (titulo.length > 0) {
                xml.ele('titulo').txt(titulo).up();
            } else {
                throw new Error("El campo título es obligatorio!");
            }

            if (descripcion.length > 0) {
                xml.ele('descripcion').txt(descripcion).up();
            } else {
                throw new Error("El campo descripción es obligatorio!");
            }

            if (header) {
                const headerElement = xml.ele('header');
                if (menu) {
                    const menuElement = headerElement.ele('menu');
                    if (opcionesMenu.length > 0) {
                        opcionesMenu.map(element => {
                            menuElement.ele('item').att('href', '/' + element).txt(element).up();
                        });
                    }
                }
            }

            if (columnaPrincipal) {
                const colprinElement = xml.ele('body');
                const contenidoElement = colprinElement.ele('contenido');
                if (posts) {
                    contenidoElement.ele('post');
                }
            }

            if (footer) {
                xml.ele('footer');
            }

            const xmlString = xml.end({ prettyPrint: true });
            console.log(xmlString);
            // Enviar el XML al backend para validación
            const response = await axios.post('http://localhost:8000/validate_xml', {
                xml: xmlString,
            });

            console.log(response.data);

        } catch (error) {
            console.error("Se capturó una excepción:", error.message);
            // alert("REVISA EL FORMULARIO: " + error.message);
        }
    };

    // Component render
    return (
        <div className='container mt-5'>
            <form className='formulario' onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Formulario para crear Blog</h2>

                <div className="mb-4 card">
                    <div className="card-body">
                        <label htmlFor="titulo" className="form-label">Titulo:</label>
                        <input type="text" id="titulo" value={titulo} onChange={handleTituloChange} className="form-control" />
                    </div>
                </div>

                <div className="mb-4 card">
                    <div className="card-body">
                        <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                        <input type="text" id="descripcion" value={descripcion} onChange={handleDescripcionChange} className="form-control" />
                    </div>
                </div>

                <div className="mb-4 card">
                    <div className="card-body">
                        <label htmlFor="header" className="form-label">Header:</label>
                        <select id="header" onChange={handleHeaderChange} className="form-select">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>

                        {header && (
                            <>
                                <label htmlFor="menu" className="form-label mt-3">Menu:</label>
                                <select id="menu" onChange={handleMenuChange} className="form-select">
                                    <option value="no">No</option>
                                    <option value="si">Sí</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>

                <div className="mb-4 card">
                    <div className="card-body">
                        <label htmlFor="columnaPrincipal" className="form-label">Columna principal:</label>
                        <select id="columnaPrincipal" onChange={handleColumnaPrincipalChange} className="form-select">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>

                        {columnaPrincipal && (
                            <>
                                <label htmlFor="posts" className="form-label mt-3">Posts:</label>
                                <select id="posts" onChange={handlePostsChange} className="form-select">
                                    <option value="no">No</option>
                                    <option value="si">Sí</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>

                <div className="mb-4 card">
                    <div className="card-body">
                        <label htmlFor="footer" className="form-label">Footer:</label>
                        <select id="footer" onChange={handleFooterChange} className="form-select">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>

    );
}

export default FormXSD;
