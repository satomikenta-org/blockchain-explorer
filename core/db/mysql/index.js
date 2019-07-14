require('dotenv').config();
const mysql = require('mysql2/promise');

class MySQL {  
  // target_address is for burn tx; // TODO: change SmartContract Burn Event: (target_address => to);
  async insertTx(txLog) {
    const { from, to, from_id, to_id, value } = txLog;
    const detail = txLog.category;
    const sql = "INSERT INTO transaction VALUES (null, ?, ?, ?, ?, ?, ?, now());"
    const holder = [from_id, from, to_id, to, value, detail];
    const connection = await this.getConnection();
    await connection.execute(sql, holder)
  }

  async getAllTxs() {
    const sql = "SELECT trans_id, from_address, to_address, amount, detail, tran_date, A.name as from_user_name, B.name as to_user_name FROM transaction LEFT JOIN users as A ON transaction.from_address = A.wallet LEFT JOIN users as B ON transaction.to_address = B.wallet  ORDER BY transaction.tran_date DESC;";
    const connection = await this.getConnection();
    return await connection.execute(sql);
  }

  async getTransferTxs() {
    const sql = "SELECT trans_id, from_address, to_address, amount, detail, tran_date, A.name as from_user_name, B.name as to_user_name FROM transaction LEFT JOIN users as A ON transaction.from_address = A.wallet LEFT JOIN users as B ON transaction.to_address = B.wallet WHERE detail = ? ORDER BY transaction.tran_date DESC";
    const connection = await this.getConnection();
    return await connection.execute(sql, ['transfer'])
  }

  async getMintTxs() {
    const sql = "SELECT trans_id, from_address, to_address, amount, detail, tran_date, A.name as from_user_name, B.name as to_user_name FROM transaction LEFT JOIN users as A ON transaction.from_address = A.wallet LEFT JOIN users as B ON transaction.to_address = B.wallet WHERE detail = ? ORDER BY transaction.tran_date DESC";
    const connection = await this.getConnection();
    return await connection.execute(sql, ['mint'])
  }

  async getConnection() {
    return await mysql.createConnection(
      {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
      });
  }
}

module.exports = MySQL;