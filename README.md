# GENERADOR DE BLOGS WEB.

Prototipo generador de código automatico para la creación de blogs personalizados, 
basado en las metodologías MDA y MDE. 

## instalación para S.O. windows🚀

1. Clona este repositorio citado al inicio.
2. Ve al directorio del proyecto.
3. Asegurate de tener instalado python en la version 3.9 en adelante.
4. Abre el proyecto en un Visual Studio Code.
5. Abre la consola o terminal del Visual Studio Code.
6. Ubicate en la ruta //creador-blogs-back.
7. Ahora ejecuta los siguientes 4 comandos uno por uno:
      - python3 -m venv venv
      - .\venv\Scripts\activate
      - pip install -r .\requirement
      - hypercorn main:app --bind 0.0.0.00.0.0:8000
   En este momento ya debe estarse ejecutando el back
8. Abre otra terminal, situate en la ruta //creador-blogs y ejecuta los siguientes 2 comandos:
      - npm install
      - npm start.\
   En este momento se esta ejecutando el front, debe abrirse el navegador, en caso de no hacerlo
   abre el navegador y ve a la ruta localhost:3000
9. Encontraras 3 pestañas, en la pestaña"Upload File" se podra cargar un archivo .xml y se validara si cumple la estructura del XSD.
    En la pestaña Form XSD se podra elegir los componentes que se quiera que contenga la pagina web, una vez seleccionados se envian y el software hace la validacion de la esctructura con el metamodelo, si es valida entonces crea la pagina web que se podra descargar en un archivo .zip el cual se puede descomprimir y dentro de el estara el archivo index.html si se abre este archivo se podra visualisar la pagina generada.

### Pre-requisitos 📋

Entorno Visual Studio code

# Estructura.

- Header
    - logo
    - enlace
    - barra de busqueda
- columna principal
    - contenido
        - titulo 
        - imagen 
        - texto 
        - autor
        - fecha
- barra lateral  >> posicion 
    - menu 
- footer
    - texto
    - enlace
    - logo

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Plantillas.

- Header
- Imagen blog
- Contenido del blog


## Construido con 🛠️

* [Python](https://github.com/dashboard) - sub lenguaje 
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS


## Documentación 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [repositorio](https://udistritaleduco-my.sharepoint.com/:f:/g/personal/ksholguinb_udistrital_edu_co/EpDgaxeFhLRLvLNo-SCdBwcBDaIaxu8c2unbEvkR_Uj5Sw?e=1peHeX)

## Version 📌

version 1.0 


## Autores ✒️
Estudiantes del grupo Tendencias Avanzadas de software

* **Kevin Holguín** - *Developer* - [Kevin-HB18](https://github.com/alejandrob46)
* **Bryan Muñoz** - *Scrum Master* - [swsbmm](https://github.com/swsbmm)
* **Alejandro Bustamante** - *Developer* - [alejandrob46](https://github.com/alejandrob46)
* **Esteban Riveros** - *Poduct Owner* - [riverosp](https://github.com/reriverosp)


# REFERENCIAS:
- https://learn.microsoft.com/es-es/visualstudio/modeling/walkthrough-generating-code-by-using-text-templates?view=vs-2022 
- https://pleybast.com/blog/estructura-de-un-blog/#:~:text=La%20estructura%20de%20un%20blog%20se%20compone%20principalmente%20de%204,main%20column%2C%20sidebar%20y%20footer.
- https://github.com/Akash1362000/Django_BlogApp 

