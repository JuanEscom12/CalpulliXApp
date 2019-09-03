import ForgotUserPassword from '../forgotUserPassword/ForgotUserPassword';
import CalpulliX from '../login/CalpulliX';
import HomeTest from '../homeTest/HomeTest';
import SideMenu from '../menu/SideMenu';


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
  Home: {
    screen: HomeTest,
  },
}, {
  initialRouteName: 'Login',
  contentComponent: SideMenu,
  drawerWidth: 300
}

);

const AppContainerNavigation = createAppContainer(AppNavigator);

export default AppContainerNavigation;
