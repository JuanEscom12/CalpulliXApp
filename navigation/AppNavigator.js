import ForgotUserPassword from '../forgotUserPassword/ForgotUserPassword';
import CalpulliX from '../login/CalpulliX';
import RegisterAccount from '../registerAccount/RegisterAccount';
import SideMenu from '../menu/SideMenu';
import ProductList from '../products/ProductList';
import ProductDetail from '../products/ProductDetail';
import BranchOffices from '../branchOffices/Offices';
import Products from '../productClasification/Products';
import Users from '../userClassification/Users';
import CustomerPromotions from '../userPromotions/Promotions';
import PurchaseOrder from '../purchaseOrder/PurchaseOrder';
import PurchaseOrderDetail from '../purchaseOrder/PurchaseOrderDetail';
import ProfilePromotions from '../promotions/ProfilePromotions';
import DetailPromotions from '../promotions/DetailPromotions';
import Sales from '../sales/Sales';
import Statistics from '../sales/Statistics';
import TwitterAnalysis from '../twitter/TwitterAnalysis';
import Regression from '../regression/Regression';
import ClassificationUsersDetail from '../userClassification/ClassificationUsersDetail';
import { createAppContainer, createDrawerNavigator } from "react-navigation";

const AppNavigator = createDrawerNavigator({
  Login: {
    screen: CalpulliX,
    navigationOptions: {
      header: null,
      drawerLockMode:'locked-closed',
    }
  },
  ForgotUserPassword: {
    screen: ForgotUserPassword,
    navigationOptions: {
      header: null,
      drawerLockMode:'locked-closed',
    }
  },
  RegisterAccount: {
    screen: RegisterAccount,
    navigationOptions: {
      header: null,
      drawerLockMode:'locked-closed',
    }
  },
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      header: null
    }
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      header: null
    }
  },
  Offices: {
    screen: BranchOffices,
  },
  ClassifyProducts: {
    screen: Products,
  },
  ClassifyUsers: {
    screen: Users,
    navigationOptions: {
      header: null,
    },
  },
  ClientPromotions: {
    screen: CustomerPromotions,
  },
  PurchaseOrder: {
    screen: PurchaseOrder,
    navigationOptions: {
      header: null
    },
  },
  PurchaseOrderDetail: {
    screen: PurchaseOrderDetail,
    navigationOptions: {
      header: null
    },
  },
  ProfilePromotions: {
    screen: ProfilePromotions,
    navigationOptions: {
      header: null
    },
  },
  DetailPromotions: {
    screen: DetailPromotions,
    navigationOptions: {
      header: null
    },
  },
  Sales: {
    screen: Sales,
    navigationOptions: {
      header: null
    },
  },
  TwitterAnalysis: {
    screen: TwitterAnalysis,
    navigationOptions: {
      header: null
    }
  },
  Regression: {
    screen: Regression,
    navigationOptions: {
      header: null
    }
  },
  Statistics: {
    screen: Statistics,
    navigationOptions: {
      header: null
    }
  },
  ClassificationUsersDetail: {
    screen: ClassificationUsersDetail,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'ProductList',
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);

const AppContainerNavigation = createAppContainer(AppNavigator);

export default AppContainerNavigation;