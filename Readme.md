# PROYECTO: FitnessGym

![Logo](Imagenes/logo.png)

## Objetivo del Proyecto: 
Crear una aplicacion tanto en nativo como en hibrido que gestione los clientes que tiene un gimnasio, gestionara a su vez los grupos a los que pertenecen y la duracion de su inscripcion. La aplicacion esta orientada a la administracion del gimnasio

## Base de datos:
La base de datos sera en firebase y se usara en ambas aplicaciones. Un Empleado puede estar en muchos grupos, pero un grupo solo puede tener un empleado. Un grupo puede tener muchos clientes y un cliente puede estar en muchos grupos.

La aplicación consta de 3 modelos. El modelo usuarios refiere a los clientes del gimnasio (usuarios_gym). De estos se necesita su nombre, apellidos, email, fecha de nacimiento, código postal, número de teléfono, DNI/NIE, una foto de perfil y la duración de su suscripción. Luego tenemos la entidad grupos, que refiere a los clases y actividades que se imparten en el gimnasio. Necesitan nombre, descripción y foto. Un usuario puede estar en muchos grupos y un grupo tiene muchos usuarios. Al cargo de cada grupo esta un monitor, que es un empleado del gimnasio (empleado_gym). De estos se necesita su nombre, apellidos, nombre de usuario, fecha de nacimiento, email, contraseña, numero de telefono, DNI/NIE y foto de perfil. Un empleado puede tener muchos grupos a su cargo pero un grupo solo puede un empleado al frente.

### Modelado de la base de datos. (Puede cambiar) - 13/04/2023
![Modelado](Imagenes/ModeloDB.png)

## Requisitos Específicos del Módulo Sistemas de Gestión Empresiaral (SGE)
Para esta asignatura procederemos a descargar los datos de los clientes (CSV o JSON), manipularlos con Pandas y crear un nuevo fichero que le sirva de entrada a PowerBI.

## Requisitos Específicos del Módulo Desarrollo de Interfaces
Para la asignatura de diseño de interfaces crearemos un informe a partir de esos datos en el que mostraremos gráficas como rangos de edad, grupos más/menos solicitados, monitores que están a cargo de más/menos grupos. Se subirá al repositorio del proyecto y también se publicará en Power BI, compartiéndolo con la dirección de correo educativa del profesor.

## Trello
Este proyecto utiliza Trello para la gestión de las tareas a realizar
https://trello.com/b/bwXyty7u/fitnessgym

## Anteproyecto: 
https://www.figma.com/file/kvU6qBh4NmjaGoooBiBPvJ/Anteproyecto-Fitness-Gym?node-id=0%3A1&t=e7FTqe0I8Yq6Mbhf-1

## [Vídeo Checkout 05/05/2023](https://www.youtube.com/watch?v=go-7G-VvBFE)

## Desarrollado por Jose Antonio Benitez (Hibrido) y Alberto Moreno (Nativo)
