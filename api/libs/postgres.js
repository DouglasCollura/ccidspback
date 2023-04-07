const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host:"localhost",
    port:'5432',
    user: 'postgres',
    password:'123456',
    database:'postgres'
  })

  await client.connect();
  return client;
}

module.exports = getConnection;
