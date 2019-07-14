import axios from 'axios';

class TxService {
  async getTx(path) {
    try {
      const {data} = await axios.get(path);
      return data[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }; 

  async getTotalSupply() {
    try {
      const mintTxs = await this.getTx('/api/tx/mint');
      return this.calcTotalSupply(mintTxs);
    } catch (err) {
      console.log(err);
      return 0;  
    }
  }

  calcTotalSupply(mintTxs) {
    let total = 0;
    for (let tx of mintTxs ) {
      total += tx.amount; 
    }
    return total;
  }
}

module.exports = TxService;