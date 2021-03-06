import React from 'react'
import Layout from '../components/layout/Layout';
import ColumnContainer from '../components/containers/ColumnContainer';


const Home = () => (
  <Layout>
    <ColumnContainer>
      <h2 style={ styles.title }>Smart Contract Event Watcher</h2>
    </ColumnContainer>
  </Layout>
)

const styles = {
  title: {
    color: 'grey',
    fontWeight: 'normal'
  }
}

export default Home
