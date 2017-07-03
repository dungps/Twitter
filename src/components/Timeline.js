import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import { connect } from "react-redux";

import { CONSUMER_KEY, CONSUMER_SECRET } from "../config";

import { getHeaders } from "react-native-simple-auth/lib/utils/oauth1";

import List from "./common/List";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class Timeline extends Component {
  state = {
    userTimeline: ds.cloneWithRows([])
  };

  componentWillMount() {
    this._getHomeTimeLine();
  }

  onEndReached() {}

  onPress(rowData) {
    this.props.navigation.navigate("Single", { user: rowData.user });
  }

  _getHomeTimeLine(params = {}) {
    const { credentials } = this.props;
    const url = "https://api.twitter.com/1.1/statuses/home_timeline.json";
    const headers = getHeaders(
      url,
      params,
      {},
      CONSUMER_KEY,
      CONSUMER_SECRET,
      "GET",
      credentials.oauth_token,
      credentials.oauth_token_secret
    );

    const response = fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          userTimeline: this.state.userTimeline.cloneWithRows(json),
          onLoad: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <List
          onEndReached={this.onEndReached.bind(this)}
          dataSource={this.state.userTimeline}
          onPress={this.onPress.bind(this)}
          onLongPress={this.onPress.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.data.user,
    credentials: state.login.data.credentials
  };
};

export default connect(mapStateToProps)(Timeline);
