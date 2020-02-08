import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import style from './style';

export default class CalpulliXTable extends PureComponent {
    constructor(props) {
        super(props);
    }

    
    render() {
        const { headers, data, marginTop, textStyle } = this.props;
        var textStyleRow;
        if (textStyle) {
            textStyleRow = textStyle;
        } else {
            textStyleRow = style.textTable;
        }
        return (
            <View style={[style.containerTable, { marginTop: marginTop }]}>
                <Table style={{ borderRadius: 5, }} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={headers} style={style.headTable} textStyle={style.textTable} />
                    <Rows data={data} textStyle={textStyleRow} />
                </Table>
            </View>
        );
    }
}