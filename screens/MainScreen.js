import React, { Component, MapHTMLAttributes } from 'react';
import { View, Platform, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions';
import PropTypes from 'prop-types';

import { STATUS_BAR_HEIGHT } from '../constants';

import StartGame from '../logic/startGame';
import ResetGame from '../logic/resetGame';
import GameOver from '../logic/gameOver'

class MainScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      initialState: this.props.state.GameReducer
    }
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.numberClick = this.numberClick.bind(this);
  }

  static navigationOptions = () => ({
    title: 'Target Sum Game',
    headerStyle: {
      height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
      backgroundColor: '#2196F3'
    },
    headerStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
      backgroundColor: 'white'
    },
    headerLeft: <View><Text>I</Text></View>

  })

  startGame() {

    console.log(this.props);

    let newState = this.props.gameActions.startGame(StartGame(this.state.initialState, 0));

    this.startCountDown();

    return newState;

  }

  resetGame() {
    let newState = this.props.gameActions.resetGame(ResetGame(this.state.initialState));

    this.stopCountDown();

    return newState;
  }


  gameOver() {
    let newState = this.props.gameActions.gameOver(GameOver(this.state.initialState));

    this.stopCountDown();

    return newState;
  }


  numberClick(number) {

    let newState = this.state.initialState;
    newState.initialSum += number;


    if (newState.targetNumber === newState.initialSum) {
      return this.props.gameActions.startGame(StartGame(newState, newState.timesOfPlay + 1));
    }

    if (newState.targetNumber < newState.initialSum) {
      this.gameOver();
    }
    this.props.gameActions.numberClick(number);

    return newState;
  }


  startCountDown() {
    this.interval = setInterval(() => {
      let newState = this.state.initialState;
      newState.initialSeconds = newState.initialSeconds - 1
      if (newState.initialSeconds === 0) {
        this.gameOver();
      }
      return this.props.gameActions.startCountDown(newState);
    }, 1000);
  }

  stopCountDown() {
    setTimeout(() => {
      clearInterval(this.interval);
      let newState = this.state.initialState;
      newState.initialSeconds = 120;
      return this.props.gameActions.startCountDown(newState);
    }, 500);
  }


  render() {
    let buttonName = this.state.initialState.numbers[0] + '';
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 10, fontSize: 50 }}>
            {this.state.initialState.targetNumber}
          </Text>
          <View style={{margin: 30, marginTop: 10 }}>
            <Text
              style={{ textAlign: 'left', fontWeight: 'bold', }}>
              Win Count: {this.state.initialState.timesOfPlay}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
              Initial sum : {this.state.initialState.initialSum}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 50 }}>
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[0])}
              title={this.state.initialState.numbers[0] + ''}
            />
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[1])}
              title={this.state.initialState.numbers[1] + ''}
            />
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[2])}
              title={this.state.initialState.numbers[2] + ''}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 50 }}>
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[3])}
              title={this.state.initialState.numbers[3] + ''}
            />
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[4])}
              title={this.state.initialState.numbers[4] + ''}
            />
            <Button
              disabled={this.state.initialState.numberButtonDisabled}
              onPress={() => this.numberClick(this.state.initialState.numbers[5])}
              title={this.state.initialState.numbers[5] + ''}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 50 }}>
            <View>
              <Text>{this.state.initialState.initialSeconds}</Text>
            </View>

            <Button
              disabled={this.state.initialState.startButtonDisabled}
              onPress={this.startGame}
              title="Start"
            />
            <Button
              disabled={this.state.initialState.resetButtonDisabled}
              onPress={this.resetGame}
              title="Reset"
            />

          </View>
        </View>


      </View>
    )
  }
}






function mapStateToProps(state) {
  return { state: state };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}

MainScreen.propTypes = {
  gameActions: PropTypes.object,
  initialState: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);

