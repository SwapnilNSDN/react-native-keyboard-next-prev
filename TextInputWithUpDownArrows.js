/*
* Swapnil Nandapure
* Commands : npm install react-native-keyboard-aware-scroll-view --save
*            npm install react-native-keyboard-accessory --save
*/

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Switch,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';

class TextInputWithUpDownArrows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeInputRef: null,
      nextFocusDisabled: false,
      previousFocusDisabled: false,
      buttonsDisabled: false,
      buttonsHidden: false,
    };
  }

  handleFocus(ref) {
    this.setState({
      nextFocusDisabled: ref === 3,
      previousFocusDisabled: ref === 1,
      activeInputRef: ref,
    });
  }

  changeInputFocus(direction = 1) {
    if ((this.state.nextFocusDisabled && direction === 1) ||
      (this.state.previousFocusDisabled && direction === -1)) {
      return;
    }

    const focusingRef = this.state.activeInputRef + direction;
    this.refs[`${focusingRef}`].focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.switchInput}>
            <Switch
              value={this.state.buttonsHidden}
              onValueChange={() => {
                this.setState({
                  buttonsHidden: !this.state.buttonsHidden
                })
              }}
            />
            <Text style={styles.switchInputText}>
              Hide Navigation arrows
              </Text>
          </View>
          <TextInput
            style={styles.textInput}
            ref="1"
            underlineColorAndroid="transparent"
            placeholder="Enter Name"
            blurOnSubmit={false}
            onFocus={this.handleFocus.bind(this, 1)}
          />
          <TextInput
            style={styles.textInput}
            ref="2"
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            placeholder="Enter Email"
            blurOnSubmit={false}
            onFocus={this.handleFocus.bind(this, 2)}
          />
          <TextInput
            style={styles.textInput}
            ref="3"
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="Enter Phone"
            blurOnSubmit={false}
            onFocus={this.handleFocus.bind(this, 3)}
          />
        </KeyboardAwareScrollView>
        <KeyboardAccessoryNavigation
          nextDisabled={this.state.nextFocusDisabled}
          previousDisabled={this.state.previousFocusDisabled}
          nextHidden={this.state.buttonsHidden}
          previousHidden={this.state.buttonsHidden}
          onNext={this.changeInputFocus.bind(this, 1)}
          onPrevious={this.changeInputFocus.bind(this, -1)}
        />
      </View>
    );
  }
}
NextInputWithArrow.navigationOptions = {
  title: 'Navigation View Example',
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 30,
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  switchInput: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  switchInputText: {
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default TextInputWithUpDownArrows;

