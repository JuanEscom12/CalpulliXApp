import {StyleSheet} from 'react-native';
const PaginatorStyles = StyleSheet.create({
    paginatorButton:{
        backgroundColor:'#F3F9FA',
        color:'#156869',
        borderColor:'#156869',
        width:'50',
        height:'50'
        
    },
    paginatorActiveButton:{
        backgroundColor:'#156869',
        color:'#F3F9FA',
        borderColor:'#156869'
    }
});

const Button = StyleSheet.flatten(PaginatorStyles.paginatorButton);
const ActiveButton = StyleSheet.flatten(PaginatorStyles.paginatorActiveButton);

export default{
      Button ,
      ActiveButton

}