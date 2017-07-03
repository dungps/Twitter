import React, { Component } from "react";
import { Text, View, Image, ListView } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import * as Progress from "react-native-progress";

import { CONSUMER_KEY, CONSUMER_SECRET } from "../config";

import { getHeaders } from "react-native-simple-auth/lib/utils/oauth1";

import List from "./common/List";

class Profile extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      userTimeline: ds.cloneWithRows([]),
      onLoad: true,
      isOpen: false
    };

    this._getHomeTimeLine = this._getHomeTimeLine.bind(this);
  }

  componentWillMount() {
    this._getHomeTimeLine();
  }

  _getHomeTimeLine(params = {}) {
    const { credentials } = this.props;
    let url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
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

  onEndReached() {}

  render() {
    const { user } = this.props;
    console.log(this.state.userTimeline);
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}
      >
        <View
          style={{
            flex: 0.1,
            padding: 20,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Image
            source={{ uri: user.profile_image_url }}
            style={{
              height: 82,
              width: 82,
              borderRadius: 50,
              flex: 0.2,
              marginRight: 30
            }}
          />
          <View
            style={{
              flex: 0.7,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                {user.statuses_count}
              </Text>
              <Text>Tweets</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                {user.followers_count ? user.followers_count : "0"}
              </Text>
              <Text>Followers</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                {user.friends_count ? user.friends_count : "0"}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <List
            onEndReached={this.onEndReached.bind(this)}
            dataSource={this.state.userTimeline}
          />
        </View>
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

export default connect(mapStateToProps)(Profile);
