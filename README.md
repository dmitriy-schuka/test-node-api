# test-node-api
REST-full Node api

node - v18.17.0

**To launch the application**

Install modules and start the service.
Open the project in IntellijIdea, in the terminal in IntellijIdea:
1. npm install

Create a database in Postgresql.
In the terminal:
2. sudo su postgres – log in as the postgres user
3. psql – go to the postgres terminal
4. In the postgres terminal, enter the commands:
    1. ALTER USER postgres WITH PASSWORD ‘postgres’;
    2. CREATE DATABASE library;
    3. exit

Run migrations and set default seeds for Sequelize.
In the terminal in IntellijIdea:
5. npx sequelize db:migrate
6. npx sequelize db:seed:all

**Launch the application**

In the terminal in IntellijIdea:
1. npm run start
2. the server will start
3. open a new Session in the terminal in IntellijIdea
4. cd client
5. npm run start


Access for Admin:
password: "Admin",
login: "admin"