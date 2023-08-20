require('dotenv').config();
// TODO const initModel =require('./models/initModels')

//console.log("Hello from server.js blog app")
const app = require('./app');
const { db } = require('./database/config');

//Autenticación en la base de datos
db.authenticate()
  .then(() => {
    console.log('Database Connected ...😊');
  })
  .catch((error) => {
    console.log('Error when authenticating to db. ☠️ ');
  });

  // inicializacion de las relaciones del modelo
  // TODO initModel();

//Sincronización con la base de datos
db.sync()
  .then(() => {
    console.log('Database Synchronized...😀');
  })
  .catch((error) => {
    console.log('Error sychronizing to db. ☠️');
  });

const PORT = process.env.PORT || 3200;

//Start listening
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
