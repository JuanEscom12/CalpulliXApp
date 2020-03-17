import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    textDetail: {
        marginLeft: 20, 
        fontSize: 11,
    },
    tabBar: {
        backgroundColor: '#f1f8ff',
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
    },
    tabView: {
        width: '100%', 
        height: '100%',
        marginTop: 20, 
        marginBottom: 50,
        marginLeft: 'auto', 
        marginRight: 'auto', 
        backgroundColor: 'transparent',
        borderTopLeftRadius: 5, 
        borderRadius: 5,
        borderColor: '#F49315', 
        borderWidth: 0.5,
    }
});

export default styles;