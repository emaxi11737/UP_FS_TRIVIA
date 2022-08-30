# TRIVIA-BACKEND

## STEPS

1. Install docker and docker-compose
2. Copy the file .env.example to .env
3. Complete the params into .env file
4. Run `'docker-compose up -d --build'`
    - -d: detach (for background)
    - --build: to build the container
5. The service will run in background with the port detailed in the .env file

## TESTS

1. Run `'docker-compose up -d'`
2. Tests for check:
    - Use cases: `'docker exec -it trivia-backend-api-db yarn test'`
    - Use cases with coverage: `'docker exec -it trivia-backend-api-db yarn test-coverage'`

## SWAGGER DOCUMENTATION
1. Open in browser `'http://localhost:3000/api-docs/swagger'`
