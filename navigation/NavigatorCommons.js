import { NavigationActions } from "react-navigation";

const navigateTo = (_navigation, _keyNavigation, _params) => {
  const navigateAction = NavigationActions.navigate({
    routeName: _keyNavigation,
    params: _params
  });
   _navigation.dispatch(navigateAction);
  }
  
  export default {
      navigateTo,
  }