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
        fontSize: 14,
        fontWeight: '500',
        color: '#FFF'
    },
    headerTextInactive: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    titleSection: {
        fontSize: 15, 
        marginLeft: '10%',  
        color: '#F49315',
    },
    titleSectionStrong: {
        fontSize: 15, 
        marginLeft: '10%',  
        color: '#db7c02',
    },
    titleSectionStronger: {
        fontSize: 14, 
        marginLeft: '10%',  
        color: '#D17E11',
    },
    titleSectionGreen: {
        fontSize: 14, 
        marginLeft: '10%',  
        color: '#048585',
    },
    labelText: {
        fontSize: 13, 
        textAlign: 'center', 
    },
    content: {
        backgroundColor: '#EDEDED',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#F49315',
        width: '90%',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    contentLight: {
        backgroundColor: '#F3F9FA',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#F49315',
        width: '90%',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    contentText: {
        backgroundColor: '#EDEDED',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contentTextLight: {
        backgroundColor: '#F3F9FA',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    textInputCalpulliX: {
        height: 45, 
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 6,
        borderWidth: 1, 
        borderRadius: 5
    },
    errorMessage: {
        color: '#f03000', 
        textAlign: 'center',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 20
    },

    active: {
        backgroundColor: '#F0AB53',
        
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
    },
    containerTable: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 5
    },
    headTable: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    textTable: {
        margin: 6,
        fontSize: 12,
    },
});

export default styles;