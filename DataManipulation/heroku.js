const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://bgfccnftujnchm:f3e55a595741045397b9d3fd38636cf085fbf170cd31c02fb44d9406360e8593@ec2-54-154-101-45.eu-west-1.compute.amazonaws.com:5432/dbhqqep4d1t5r8',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});