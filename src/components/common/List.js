import React, { Component } from "react";
import { ListView, View, Text } from "react-native";
import { List, ListItem, Icon } from "react-native-elements";

class ListComponent extends Component {
  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        hideChevron
        key={sectionID}
        title={rowData.user.name}
        subtitle={
          <View>
            <Text>
              {rowData.text}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginTop: 5,
                alignItems: "center"
              }}
            >
              <View>
                <Icon type="font-awesome" name="reply" size={16} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {rowData.retweet_count}
                </Text>
                <Icon
                  type="font-awesome"
                  name="retweet"
                  size={16}
                  color={rowData.retweeted ? "blue" : ""}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {rowData.favorite_count}
                </Text>
                <Icon
                  type="font-awesome"
                  name="heart-o"
                  size={16}
                  color={rowData.favorited ? "red" : ""}
                />
              </View>
            </View>
          </View>
        }
        avatar={rowData.user.profile_image_url}
        subtitleNumberOfLines={10}
        onPress={() => {
          this.props.onPress(rowData);
        }}
        onLongPress={() => {
          this.props.onPress(rowData);
        }}
      />
    );
  }

  render() {
    return (
      <List containerStyle={{ flex: 1 }}>
        <ListView
          enableEmptySections
          dataSource={this.props.dataSource}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.props.onEndReached}
        />
      </List>
    );
  }
}

export default ListComponent;
