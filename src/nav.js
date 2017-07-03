import { StackNavigator } from "react-navigation";

import Home from "./components/Home";
import Login from "./components/Login";
import Single from "./components/Single";

const routeConfigs = {
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Single: {
    screen: Single
  }
};

export default StackNavigator(routeConfigs);
