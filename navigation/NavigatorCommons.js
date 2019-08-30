import { StackActions, NavigationActions } from "react-navigation";

const navigateTo = (_navigation, _keyNavigation) => {
  const navigateAction = NavigationActions.navigate({
    routeName: _keyNavigation
  });
   _navigation.dispatch(navigateAction);
  }
  
  export default {
      navigateTo,
  }