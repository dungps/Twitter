import React, { Component } from "react";
import { twitter } from "react-native-simple-auth";
import { Provider } from "react-redux";

import configureStore from "./store";
import NavWithRedux from "./components/Nav";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      store:
        module && module.hot && module.hot.data && module.hot.data.store
          ? module.hot.data.store
          : configureStore(() => {
              this.setState({
                isLoading: false
              });
            })
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <NavWithRedux />
      </Provider>
    );
  }
}

export default Home;
