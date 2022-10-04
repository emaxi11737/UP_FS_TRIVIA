# TRIVIA-BACKEND

## ABOUT THE PROJECT
Nuestro servicio backend estará desarrollado en NodeJs, utilizando el framework
ExpressJs con el lenguaje Typescript, brindando la ventaja de que es fuertemente
tipado y así evitar errores tanto en la traspilación como en tiempo de ejecución.
Dispondremos de una serie de endpoints, a fin de administrar los distintos objetos
de dominio, específicamente los usuarios, turnos, exámenes, preguntas, respuestas,
cuestionarios y resultados.
La estructura del proyecto será en base a una arquitectura limpia o capa cebolla,
dividiéndose en la capa de dominio, capa de casos de uso, capa de servicios, capa
de repositorios y por último capa de los controladores.
Estara compuesto por:
- Repositorios
- Casos de uso
- Servicios
-Constantes
-Controladores
-Middleware
-Helpers
-Dominio
También usaremos el patrón inyección de dependencias, service locator, singleton
con los principios SOLID, para que nuestro producto sea robusto, fácil de mantener
y escalable en el tiempo.
Implementaremos una base de datos no relacional MongoDB y el ODM Mongoose,
para poder mapear nuestros datos con nuestros objetos de dominio.
También sumaremos una capa de seguridad, siendo JWT la librería que manejará
los tokens, tanto para la creación como para la verificación de los mismos.
Por último, sumaremos middlewares para verificar los tokens, los roles de los
usuarios(de tipo admin y user) y las claves de acceso a los exámenes.
Como complemento, agregaremos tests unitarios a los casos de uso, para poder
verificar que nuestro código es de calidad.

## STEPS

1. Install docker and docker-compose
2. Copy the file .env.example to .env
3. Complete the params into .env file
4. Run `'docker-compose up -d'`
    - -d: detach (for background)
5. The service will run in background with the port detailed in the .env file

## TESTS

1. Run `'docker-compose up -d'`
2. Tests for check:
    - Use cases: `'docker exec -it trivia-api yarn test'`
    - Use cases with coverage: `'docker exec -it trivia-api yarn test-coverage'`

## SWAGGER DOCUMENTATION
1. Open in browser `'http://localhost:{APP_PORT}/api-docs/swagger'`

## POSTMAN DOCUMENTATIO
1.Open Postman
2.Select File - Import - Upload Files
3.Select API TRIVIA.postman_collection in project
4.Use Postman to send requests to endpoints
