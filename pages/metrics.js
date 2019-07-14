import React, { useEffect, useState } from 'react'
import TxService from '../services/tx';
import Layout from '../components/layout/Layout';
import ColumnContainer from '../components/containers/ColumnContainer';

export default function Metrics() {

  const [ totalSupply, setTotalSupply ] = useState(0);
  useEffect(() => {
    fetchTotalSupply();
  }, []);


  const fetchTotalSupply = async () => {
    let txService = new TxService();
    const totalSupply = await txService.getTotalSupply();
    setTotalSupply(totalSupply);
  };

  return (
    <Layout>
      <ColumnContainer>
        <div style={styles.total_supply_container }>TotalSupply: {totalSupply}</div>
      </ColumnContainer>
    </Layout>
  )
}

const styles = {
  total_supply_container: {
    marginTop: "20px",
    fontSize: "1.3rem"
  }
}
