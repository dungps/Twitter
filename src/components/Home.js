import React, { Component } from "react";
import { View } from "react-native";
import { Tabs, Tab, Icon } from "react-native-elements";
import { connect } from "react-redux";

import Profile from "./Profile";
import Timeline from "./Timeline";

class Home extends Component {
  state = {
    currentTab: "profile"
  };

  render() {
    return (
      <Tabs>
        <Tab
          selected={this.state.currentTab === "profile"}
          title="Profile"
          renderIcon={() => <Icon name="user" type="font-awesome" size={30} />}
          onPress={() => {
            this.setState({
              currentTab: "profile"
            });
          }}
        >
          <Profile />
        </Tab>
        <Tab
          selected={this.state.currentTab === "timeline"}
          title="Timeline"
          renderIcon={() => <Icon name="home" type="font-awesome" size={30} />}
          onPress={() => {
            this.setState({
              currentTab: "timeline"
            });
          }}
        >
          <Timeline navigation={this.props.navigation} />
        </Tab>
      </Tabs>
    );
  }
}

export default connect()(Home);
