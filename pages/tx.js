import React from 'react'
import Layout from '../components/layout/Layout';
import ColumnContainer from '../components/containers/ColumnContainer';
import TxTable from '../components/tx/TxTable';

const Tx = () => (
  <Layout>
    <ColumnContainer>
      <TxTable/>
    </ColumnContainer>
  </Layout>
)

export default Tx
