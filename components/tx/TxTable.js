import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TxService from '../../services/tx';
import ColumnContainer from '../containers/ColumnContainer';
import RowContainer from '../containers/RowContainer';
import { Table, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';


export default function TxTable() {
  const [ txs, setTxs ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  useEffect(() => {
    fetchTx('tx');
  }, []);

  const fetchTx = async( type ) => {
    setIsLoading(true);
    let txService = new TxService();
    const tx = await txService.getTx(`/api/${type}`); 
    setTxs(tx);
    setIsLoading(false);
  };

  const showJST = (time) => {
    return moment(time).add("h", 9).format("YYYY/MM/DD HH:mm");
  };

  return (
    <ColumnContainer>
      { isLoading && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>)
      }

      <RowContainer>
        <Button size="small" style={ styles.transfer_button } onClick={ () => fetchTx('tx/transfer') }>Transfer</Button>
        <Button size="small" style={ styles.mint_button } onClick={ () => fetchTx('tx/mint') }>Mint</Button>
      </RowContainer>

      <Table basic='very' celled style={ styles.table }>
        <Table.Header>
          <Table.Row textAlign="left">
            <Table.HeaderCell><div style={ styles.table_header }>Time</div></Table.HeaderCell>
            <Table.HeaderCell><div style={ styles.table_header }>From</div></Table.HeaderCell>
            <Table.HeaderCell><div style={ styles.table_header }>To</div></Table.HeaderCell>
            <Table.HeaderCell><div style={ styles.table_header }>Amount</div></Table.HeaderCell>
            <Table.HeaderCell><div style={ styles.table_header }>Type</div></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { txs.map( tx => (
            <Table.Row textAlign='left' key={ tx.trans_id }>
              <Table.Cell>
                <div style={ styles.time }>{ showJST(tx.tran_date) }</div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <div>{ tx.from_address === "0" ? "ADMIN": tx.from_address  }</div>
                  <div style={ styles.user_name }>username: { tx.from_user_name ? tx.from_user_name: "ADMIN"}</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <div>{ tx.to_address === "0" ? "BURN": tx.to_address }</div>
                  <div style={ styles.user_name }>username: { tx.to_user_name ? tx.to_user_name: "BURN"}</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  { tx.amount }
                </div>
              </Table.Cell>
              <Table.Cell>
                <div style={ tx.detail === "transfer" ? styles.transfer: styles.mint}>
                  { tx.detail }
                </div>
              </Table.Cell>
            </Table.Row>)
          )}
        </Table.Body>
      </Table>
      <div style={ styles.buttons_container }>
        <Button compact >
          <Icon name="angle left"/>Prev
        </Button>
        <Button compact >
          Next<Icon name="angle right"/>
        </Button>
      </div>
    </ColumnContainer>      
  )
};

const styles = {
  time: {
    fontSize: "0.9rem",
    marginBottom: "3px",
    color: 'grey'
  },
  transfer: {
    color: "#067df7",
  },
  mint: {
    color: "green"
  },
  table: {
    margin: "15px",
    width: "80vw"
  },
  table_header: {
    color: "#0b2940",
    fontSize: "1.1rem"
  },
  buttons_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: "30px"
  },
  transfer_button: {
    width: "90px",
    backgroundColor: 'white',
    color: '#067df7',
    marginRight: "20px"
  },
  mint_button: {
    width: "90px",
    backgroundColor: 'white',
    color: 'green'
  },
  user_name: {
    color: 'grey'
  }
};

