<h1 align="center">PROYECTO: FitnessGym</h1>

<p align="center">
  <img src="Imagenes/logo.png" alt="Logo">
</p>

<p align="center">Crear una aplicación tanto en nativo como en híbrido que gestione los clientes de un gimnasio, los grupos a los que pertenecen y la duración de su inscripción. La aplicación está orientada a la administración del gimnasio.</p>

## Base de datos
La base de datos será en Firebase y se utilizará en ambas aplicaciones. Un empleado puede estar en muchos grupos, pero un grupo solo puede tener un empleado. Un grupo puede tener muchos clientes y un cliente puede estar en un grupo.

La aplicación consta de 3 modelos:

### Modelo "clientes"
- Nombre
- Apellidos
- Email
- Fecha de nacimiento
- Código postal
- Número de teléfono
- DNI/NIE
- Foto de perfil
- Inscripción

### Modelo "grupos"
- Nombre
- Descripción
- Foto

### Modelo "empleado_gym" (usuario y monitor)
- Nombre
- Apellidos
- Fecha de nacimiento
- Email
- Contraseña
- Número de teléfono
- DNI/NIE
- Foto de perfil

Al cargo de cada grupo está un monitor, que es un empleado del gimnasio. Un empleado puede tener muchos grupos a su cargo, pero un grupo solo puede tener un empleado al frente.

### Modelado de la base de datos (puede cambiar) - 13/04/2023
<p align="center">
  <img src="Imagenes/ModeloDB.png" alt="Modelo de base de datos">
</p>

## Requisitos Específicos del Módulo Sistemas de Gestión Empresarial (SGE)
Para esta asignatura, se descargaron los datos de los clientes en formato CSV o JSON, se manipularon con Pandas y se creó un nuevo archivo que sirve como entrada a PowerBI.

Para descargar los datos de los clientes, se utilizó el paquete de node `node-firestore-import-export`. A continuación, se muestra un ejemplo de cómo se puede instalar y utilizar:

npm install -g node-firestore-import-export

firestore-export --accountCredentials path/to/credentials/file.json --backupFile /backups/myDatabase.json remplazando las rutas por las nuestras propias rutas, para obtener las credenciales tuvimos que generar una nueva key en firebase.

Una vez teniendo el backup desarollamos usando la libreria de pandas el siguiente archivo:
<p align="center">
  <img src="Imagenes/ConvertirEnCSV.png" alt="archivoPython">
</p>

[Archivo del codigo python](https://github.com/jbenrui/fitness-gym/blob/master/fitnessgym_sources/csv_converter.py)

## Requisitos Específicos del Módulo Desarrollo de Interfaces (DI)
Para la asignatura de diseño de interfaces, crearemos un informe a partir de esos datos (Los datos de los clientes y los grupos a los que pertencen) en el que hemos mostrado gráficas como rangos de edad, grupos con mas clientes, monitores que están a cargo de más/menos grupos, el total de los clietnes, una tabla para visualizar todos los datos de los clientes y un mapa con la localidad de estos clientes. Se subirá al repositorio del proyecto y también se publicará en Power BI, compartiéndolo con la dirección de correo educativa del profesor.

<p align="center">
  <img src="Imagenes/PBI.png" alt="DI">
</p>

[Archivo del informe](https://github.com/jbenrui/fitness-gym/blob/master/fitnessgym_sources/FitnessGymCustomerReport.pbix)


## Manual de instalacion y dependencias: 
 ### Dependecias :
 - Tener instalado node.js y ionic framework
 - Equipo con espacio en el disco
 - Conexion a internet para poder conectar con el backend
 
 ### Instalacion :
 - Descargar este repositorio ya sea en formato zip o usando un git pull
 - Extraer los archivos del zip en caso de haber descargado el zip o en el caso del git pull abrir la carpeta
 - Abrir la carpeta del programa con visual studio code
 - Ejecutar en el terminal npm i 
 - Ejecutar ionic serve


## Tutorial de Como usar la App:
  
 ### Login, Registro y Recuperar la contraseña:
 <table align="center">
  <tr>
    <td align="center">
      <img src="Imagenes/login.png" alt="Login">
      <p>Login</p>
    </td>
    <td align="center">
      <img src="Imagenes/registro.png" alt="Registro">
      <p>Registro</p>
    </td>
    <td align="center">
      <img src="Imagenes/recuperarPassword.png" alt="Recuperar Contraseña">
      <p>Recuperar Contraseña</p>
    </td>
  </tr>
</table>
En esta seccion de la aplicacion vemos el login donde contamos con 4 botones, el primero es el de iniciar sesion (sing in), el segundo es el de (sing up) para acceder a la ventana de registro, 
el tercero es para recupera la contraseña (vemos una frase que nos pregunta si hemos olvidado la contraseña, al hacer click no abre una ventana para introducir nuestro email y recibir un correo).
Y por ultimo un boton abajo a la izquierda que nos sirve para cambiar el idioma de la aplicacion de español a ingles.

 ### Home y About Me
 <table align="center">
  <tr>
    <td align="center">
      <img src="Imagenes/home.png" alt="Home">
      <p>Home</p>
    </td>
    <td align="center">
      <img src="Imagenes/aboutme.png" alt="AboutMe">
      <p>About Me</p>
    </td>
  </tr>
</table>
En esta seccion de la aplicacion vemos el home de la aplicacion, en el nos encontramos una card con la foto de nuestro usuario y un mensaje de bienvenida, podemos ver tambien una barra con las distintas secciones de
la aplicaion entre ellas esta la de about me que contiene un poco de informacion sobre mi y algunos datos curiosos.

 ### Clientes Grupos y Perfil
 <table align="center">
  <tr>
    <td align="center">
      <img src="Imagenes/clientes.png" alt="clientes">
      <p>Clientes</p>
    </td>
    <td align="center">
      <img src="Imagenes/grupos.png" alt="grupos">
      <p>Grupos</p>
    </td>
    <td align="center">
      <img src="Imagenes/perfil.png" alt="perfil">
      <p>Perfil</p>
    </td>
  </tr>
</table>
En la seccion de clientes y grupos podemos ver una lista y botones para ver los editar, borrar y ver los detalles, ademas de un boton para añadir. En la seccion de perfil, nos encontramos informacion sobre el usuario de la aplicacion,
junto con varios botones para editar el usuario, borrarlo y hacer logout.

## Bibliografia:
 - [Ionic Framework](https://ionicframework.com/)
 - [Angular documentation](https://angular.io/docs)
 - [Firebase | Firestore - Importar y Exportar](https://www.youtube.com/watch?v=bAeF5Y6V4Sg)
 - [Ionic Storage](https://youtu.be/vCfAe2esboU)
 - [Ionic Storage doc](https://github.com/ionic-team/ionic-storage#readme)

## Despliegue:
https://fitness-gym-80s.web.app
 
## Presentacion: 
https://drive.google.com/file/d/1j8vYSBcmqcEUUONL-A385_57S6Y_TTgR/view?usp=sharing

## Trello
Este proyecto utiliza Trello para la gestión de las tareas a realizar.
[Trello FitnessGym](https://trello.com/b/bwXyty7u/fitnessgym)

## Anteproyecto
[Anteproyecto Fitness Gym](https://www.figma.com/file/kvU6qBh4NmjaGoooBiBPvJ/Anteproyecto-Fitness-Gym?node-id=0%3A1&t=e7FTqe0I8Yq6Mbhf-1)

## Vídeo Checkout 05/05/2023
[Ver vídeo en YouTube](https://www.youtube.com/watch?v=go-7G-VvBFE)

## Vídeo Final 16/06/2023
[Ver vídeo en YouTube](https://drive.google.com/file/d/1RwguJxcbambF5IbuNnkAMG5f5XpH9PET/view?usp=sharing)
## Desarrollado por:
- Jose Antonio Benitez (Híbrido)
- Alberto Moreno (Nativo)
