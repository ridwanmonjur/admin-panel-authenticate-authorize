<h1> Installation instructions </h1>

1. Setup Mongodb Database

a. Use  the docker containerized MongoDB and switch it on, if you don't have MongoDB installed. Type:

docker compose -f "docker-compose.yml" up -d --build

b. If you have a local running MongoDB, you can ignore this Docker step. Change the port as needed, by going to the .env in api/.env file
and edit the port (and url) at this line.

DB_CONNECTION=mongodb://localhost:27017/admin

2. Start backend

cd backend \
npm install \
npm run dev

3. Start frontend

cd admin \
npm install \
npm run dev

4. Seed database

Click: http://localhost:8000/api/v1/reset

5. View at http://localhost:3000 !