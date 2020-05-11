import React, { PureComponent } from 'react';
import { StyleSheet,  View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class CalpullixSpinner extends PureComponent {

    constructor(props) {
      super(props);
    }

    render() {
        const {spinner} = this.props;
        console.log('************* spinner ', spinner);
        return (
            <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });