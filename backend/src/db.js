const { Pool,types} = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'finance',

});

types.setTypeParser(types.builtins.INT8, value => parseInt(value));

module.exports = {
  query: (text, params) => pool.query(text, params)
};


// / To create finance table 
// Create table finance (
//   id BIGSERIAL PRIMARY KEY ,
// year smallint unique,
// expenses bigint,
// risk_appetite varchar(4),
// annual_income bigint

// )