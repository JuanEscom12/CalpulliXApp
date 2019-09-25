import ForgotUserPassword from '../forgotUserPassword/ForgotUserPassword';
import CalpulliX from '../login/CalpulliX';
import HomeTest from '../homeTest/HomeTest';
import RegisterAccount from '../registerAccount/RegisterAccount';
import SideMenu from '../menu/SideMenu';

import ProductList from '../products/ProductList';
import BranchOffices from '../branchOffices/Offices';
import Products from '../productClasification/Products';

import { createAppContainer, createDrawerNavigator } from "react-navigation";

const AppNavigator = createDrawerNavigator({
  Login: {
    screen: CalpulliX,
    navigationOptions: {
      header: null
    }
  },
  ForgotUserPassword: {
    screen: ForgotUserPassword,
    navigationOptions: {
      header: null
    }
  },
  RegisterAccount: {
    screen: RegisterAccount,
    navigationOptions: {
      header: null
    }
  },
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: HomeTest,
  },
  Offices:{
    screen: BranchOffices,
  },
  ClassifyProducts:{
    screen:Products,
  },
}, 
{
  initialRouteName: 'ProductList',
  contentComponent: SideMenu,
  drawerWidth: 300
}
);

const AppContainerNavigation = createAppContainer(AppNavigator);

export default AppContainerNavigation;
