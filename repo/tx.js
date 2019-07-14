class TxRepo {
  
  static async getAllTx(db) {
    return await new TxRepo(db).getAllTxs();
  }
  
  static async getTransferTx(db) {
    return await new TxRepo(db).getTransferTxs();
  }

  static async getMintTx(db) {
    return await new TxRepo(db).getMintTxs();
  }

  constructor(db) {
    this.db = db;
  }

  async getAllTxs() {
    return await this.db.getAllTxs();
  }

  async getTransferTxs() {
    return await this.db.getTransferTxs();
  }

  async getMintTxs() {
    return await this.db.getMintTxs();
  }
}

module.exports = TxRepo;