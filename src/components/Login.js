import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Icon, Button } from "react-native-elements";

import { userLogin } from "../actions";

class Login extends Component {
  componentWillMount() {
    const { user, navigation } = this.props;

    if (user && user.user && user.user.id) {
      navigation.navigate("Home");
    }
  }

  onPress() {
    this.props.userLogin(() => {
      this.props.navigation.navigate("Home");
    });
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Icon type="font-awesome" name="twitter" size={120} />
        {user == null &&
          <Button
            title="Login"
            onPress={this.onPress.bind(this)}
            longPress={this.onPress.bind(this)}
          />}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1dcaff"
  }
};

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.login.data,
    err: state.login.err
  };
};

export default connect(mapStateToProps, { userLogin })(Login);
