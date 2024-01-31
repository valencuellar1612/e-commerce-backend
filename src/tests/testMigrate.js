const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newUser= {
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com",
            password: "1505",
            phone: "321463748"
        }
        await request(app).post('/users').send(newUser);

        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();