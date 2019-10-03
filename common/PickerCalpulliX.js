import React, { PureComponent } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';


var props;

export default class PickerCalpulliX extends PureComponent {
  
  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
     props.functionClearPicker(clear);
     return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <TouchableOpacity 
                id='clearProductList' 
                style={styles.clearButton} 
                onPress={clear}>
                <Text style={{ color: '#fff' }}>Clear</Text>
              </TouchableOpacity>
              <Text style={[styles.text]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>
        <View style={styles.innerContainer}>
          <Text style={{ alignSelf: 'flex-start', marginLeft: '5%', color: '#4C4C4C' }}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }

  render() {
    const {
        data,
        updateState,
        placeholder,
    } = this.props
    props = this.props;
    return (
          <CustomPicker
            placeholder={placeholder}
            options={data}
            getLabel={item => item.name}
            fieldTemplate={this.renderField}
            optionTemplate={this.renderOption}
            onValueChange={value => {
              updateState(value);
            }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#F49315',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    marginTop: 5,
    padding: 15,
    backgroundColor: '#FDFDFD',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 14
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center'
  },
  clearButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 5,
    marginRight: 10,
    padding: 3,
    marginBottom: 10
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})

