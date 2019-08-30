import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    imageBackGround: {
        width: '100%',
        height: '100%'
    },
    avoidingScroll: {
        flex: 1
    },
    containerStyle: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F3F9FA',
        padding: 10,
        borderColor: '#F49315',
        width: '90%',
        borderWidth: 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    headerText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {

        backgroundColor: '#EDEDED',
        borderColor: '#F49315',
        width: '90%',
        borderWidth: 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
    },
    active: {
        backgroundColor: '#F3F9FA',

    },
    inactive: {
        backgroundColor: '#F3F9FA',
    },
    activeText: {
        backgroundColor: '#EDEDED',
        borderColor: '#EDEDED',
    },
    inactiveText: {
        backgroundColor: '#F3F9FA',
    },
    selectors: {

    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    head: { 
        height: 50, 
        backgroundColor: '#f1f8ff' },
    text: { 
        margin: 6 
    }
});

export default styles;