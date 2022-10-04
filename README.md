# TRIVIA-BACKEND

## Sobre el proyecto

Nuestro servicio backend está desarrollado en NodeJs, utilizando el framework ExpressJs con el lenguaje Typescript, brindando la ventaja de que es fuertemente tipado y así evitar errores tanto en la traspilación como en tiempo de ejecución. 
<br> Disponibilizamos una serie de endpoints, a fin de administrar los distintos objetos de dominio, específicamente los usuarios, juegos, categorías de preguntas, preguntas, respuestas y la autenticación.
<br> La estructura del proyecto es en base a una arquitectura limpia o capa cebolla, dividiéndose en capa de dominio, capa de casos de uso, capa de servicios, capa de repositorios y por último capa de los controladores. 
<br> También usamos el patrón inyección de dependencias, service locator y singleton con los principios SOLID, para que nuestro producto sea robusto, fácil de mantener y escalable en el tiempo.
<br> Implementamos una base de datos no relacional MongoDB y el ODM Mongoose,
para poder mapear nuestros datos con nuestros objetos de dominio.
<br> También sumamos una capa de seguridad, siendo JWT la librería que maneja los tokens, tanto para la creación como para la verificación de los mismos.
<br> Por último, adicionamos middlewares para verificar los tokens y los roles de los usuarios(de tipo admin y user).
<br> (PRÓXIMAMENTE) Como complemento, agregaremos tests unitarios a los casos de uso, para poder verificar que nuestro código es de calidad.
<br>
<br>

## Requerimientos funcionales
Especificar los requerimientos
<br>
<br>

## Pasos para levantar los servicios
1. Instalar **docker** y **docker-compose**.
2. Clonar el repositorio.
3. Copiar el archivo **.env.example** a uno nuevo llamado **.env**
4. Completar las variables de entorno del archivo nuevo **.env**:
    - APP_PORT: número del puerto de la api encargada de mapear nuestro sistema operativo con el servicio.
    - SECRET_KEY: string correspondiente al hash que funcionará tanto para firmar como para verificar los tokens de los clientes (se recomienda cargar un hash complejo por seguridad). El access token otorgado perdura un tiempo de 10 minutos.
    - REFRESH_SECRET_KEY: string correspondiente al hash que funcionará tanto para firmar como para verificar los refresh tokens de los clientes (se recomienda cargar un hash complejo por seguridad). El refresh token otorgado al cliente dura 24 hs.
5. Ejecutar `'docker-compose up -d'` dentro de la ruta principal del proyecto. El parámetro -d es opcional. Si se quiere ver en la propia consola el log de los servicios levantados, ejecutar `'docker-compose up'` discriminando este último parámetro.
6. La api se levantará en el puerto especificado en el archivo .env, mientras que la base de datos correrá en el puerto 27017 por default especificado en el archivo **docker-compose.yml**.
<br>
<br>

## Tests
Para correr los tests, es necesario tener levantado los servicios anteriormente mencionados.
1. En caso que no se hayan levantado los servicios, ejecutar `'docker-compose up -d'`.
2. Test a correr:
    - Casos de uso: `'docker exec -it trivia-api yarn test'`
    - Casos de uso con el detalle de la cobertura: `'docker exec -it trivia-api yarn test-coverage'`
<br>
<br>

## Documentación Swagger
1. Abrir en una pestaña de un navegador la siguiente ruta: `'http://localhost:{APP_PORT}/api-docs/swagger'`, donde la variable APP_PORT corresponderá al puerto cargado en el archivo **.env**. 
<br> A continuación presento un ejemplo de como sería la URL: http://localhost:3000/api-docs/swagger
<br>
<br>

## Documentación Postman
1. Abrir Postman.
2. Seleccionar:
    - Select File 
    - Import 
    - Upload Files
3. Buscar el archivo **API_TRIVIA.postman_collection** y el archivo **DEV.postman_environment.json** que se encuentran en este repositorio para cargar la collección de endpoints como el ambiente de desarrollo.
4. Seleccionar el ambiente **DEV**.
5. Usar Postman para enviar los requests a los endpoints.
