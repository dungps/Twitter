import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Profile from "./components/Profile";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import Single from "./components/Single";

const InnerNavigator = DrawerNavigator(
  {
    Profile: {
      path: "/",
      screen: Profile,
      navigationOptions: {
        title: "Profile"
      }
    },
    Timeline: {
      path: "/timeline",
      screen: Timeline,
      navigationOptions: {
        title: "Timeline"
      }
    }
  },
  {
    initialRouteName: "Profile",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

const routeConfigs = {
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: InnerNavigator,
    navigationOptions: ({ navigation }) => {
      console.log(navigation);
      return {
        headerLeft: (
          <Icon
            type="font-awesome"
            name="bars"
            onPress={() => navigation.navigate("DrawerOpen")}
          />
        )
      };
    }
  },
  Single: {
    screen: Single
  }
};

export default StackNavigator(routeConfigs);
