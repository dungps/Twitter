import React, { Component } from "react";
import { Text, ListView, View, Image } from "react-native";
import { connect } from "react-redux";

import { CONSUMER_KEY, CONSUMER_SECRET } from "../config";

import { getHeaders } from "react-native-simple-auth/lib/utils/oauth1";

import List from "./common/List";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class Single extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.user.name
    };
  };

  state = {
    userTimeline: ds.cloneWithRows([])
  };

  componentWillMount() {
    this._getHomeTimeLine();
  }

  onEndReached() {}

  _getHomeTimeLine() {
    const { credentials: { oauth_token, oauth_token_secret } } = this.props;
    const { user } = this.props.navigation.state.params;
    let url = `https://api.twitter.com/1.1/users/show.json?screen_name=${user.screen_name}`;

    const headers = getHeaders(
      url,
      {},
      {},
      CONSUMER_KEY,
      CONSUMER_SECRET,
      "GET",
      oauth_token,
      oauth_token_secret
    );

    const response = fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
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
    const { user } = this.props.navigation.state.params;
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
    credentials: state.login.data.credentials
  };
};

export default connect(mapStateToProps)(Single);
