import React, { Component } from 'react';
import { View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import AccordionCalpulliX from '../common/AccordionCalpulliX';
import HeaderCalpulliX from '../common/HeaderCalpulliX';
import styles from './style'

const BACON_IPSUM =
  '\n   Row 1                                                       100$ \n' +
  '\n   Row 2                                                      100$ \n' +
  '\n   Row 3                                                       100$ \n' +
  '\n   Row 4                                                       100$ \n' +
  '\n   Row 5                                                       100$ \n' +
  '\n   Row 6                                                       100$ \n' +
  '\n   Row 7                                                       100$ \n' +
  '\n   Row 8                                                       100$ \n' +
  '\n   Row 9                                                       100$ \n';

const CONTENT = [
  {
    id: 'Item 1',
    content: BACON_IPSUM,
  },
  {
    id: 'Item 2',
    content: BACON_IPSUM,
  },
  {
    id: 'Item 3',
    content: BACON_IPSUM,
  },
  {
    id: 'Item 4',
    content: BACON_IPSUM,
  },
  {
    id: 'Item 5',
    content: BACON_IPSUM,
  },
];

idValue = 0;

export default class HomeTest extends Component {
  state = {
    tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
    tableData: [
      ['1', '2', '3', '4'],
      ['a', 'b', 'c', 'd'],
      ['1', '2', '3', '456'],
      ['a', 'b', 'c', 'd']
    ]
  };

  render() {
    const { tableHead, tableData } = this.state;
    return (
      <BackgroundScrollCalpulliX
        addHeight={50}>
        <View>
          <HeaderCalpulliX />
          <View style={{ marginTop: 15, marginBottom: 15 }}>
          <AccordionCalpulliX 
              content={CONTENT}
              path={'/calpullix/login'}
              screen={'ForgotUserPassword'}
              navigation={this.props.navigation} 
              renderDetailButton={true}
              titleButton={'Ver Detalle'} />
          </View>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}


