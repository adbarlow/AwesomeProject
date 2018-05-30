/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

import CodePush from 'react-native-code-push'

export default class AwesomeProject extends Component {
	sendEvent(){
		Analytics.trackEvent('My Custom Event', {
			prop1: new Date().getSeconds()
		});
	}
}

nativeCrash() {
	Crashes.generateTestCrash();
}

jsCrash() {
	this.func1();
}

func1() { this.func2(); }
func2() { this.func3(); }
func3() { this.func4(); }
func4() { this.func5(); }

func5(){
	throw new Error('My uncaught javascript exception');
}

codepushSync(){
	this.setState({logs : ['Started at ' + new Date().getTime()]});
	CodePush.sync({
		updateDialog: true,
		installMode: CodePush.installMode.IMMEDIATE
	}, (status) => {
		for(var key in CodePush.SyncStatus){
			if(status === CodePush.SyncStatus[key]{
				this.setState(preState => ({ logs: [...preState.logs, key.replace(/_/g, ' ')] }));
				break;
			}
		}
	});
}

constructor(props){
	super(props);
	this.state = {logs : []};
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
// export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
		<Button title="Send Event" onPress={()=> this.sendEvent()}/>
		<Button title="Native Crash" onPress={() => this.nativeCrash()}/>
		<Button title="JS Crash" onPress={() => this.jsCrash()}/>
		<Button title="Code Push" onPress={() => this.codepushSync()}/>
		<Text>{JSON.stringify(this.state.logs)}</Text>
      </View>
    );
  }
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
