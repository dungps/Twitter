/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry } from "react-native";

import App from "./src/app";

export default class twitter2 extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent("twitter2", () => twitter2);
