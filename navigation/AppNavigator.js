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
  ProductDetail : {
    screen: ProductDetail,
    navigationOptions: {
      header: null
    }
  },
  Offices:{
    screen: BranchOffices,
  },
  ClassifyProducts:{
    screen: Products,
  },
  ClassifyUsers:{
    screen: Users,
  },
  ClientPromotions:{
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
  }
}, 
{
  initialRouteName: 'Sales',
  contentComponent: SideMenu,
  drawerWidth: 300
}
);

const AppContainerNavigation = createAppContainer(AppNavigator);

export default AppContainerNavigation;