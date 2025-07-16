const db = require("./db");

class Finance {
  create(annual_income, year, expenses, risk_appetite) {
    const result = db.query(
      `INSERT INTO  finance (annual_income,year,expenses,risk_appetite) VALUES (${annual_income},${year},${expenses},'${risk_appetite}')`
    );
    return result;
  }

  get() {
    const result = db.query(`SELECT * FROM finance`);
    return result;
  }

  delete(id) {
    const result = db.query(`DELETE FROM finance WHERE id = ${Number(id)}`);
    return result;
  }
  getFinanceById(id) {
    const result = db.query(`SELECT * FROM finance WHERE id = ${Number(id)}`);
    return result;
  }
}

module.exports = Finance;
