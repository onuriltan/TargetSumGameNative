import React, { Component, MapHTMLAttributes } from 'react';
import { View, Platform, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions';
import PropTypes from 'prop-types';

import { STATUS_BAR_HEIGHT } from '../constants';

class MainScreen extends Component {

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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ddd' }}>
                

            </View>
        )
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
    
      startGame() {
        let newState = this.props.gameActions.startGame(StartGame(this.state.initialState, 0));
    
        this.startCountDown();
    
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
    
    
      gameOver() {
        let newState = this.props.gameActions.gameOver(GameOver(this.state.initialState));
    
        this.stopCountDown();
    
        return newState;
      }
    
      resetGame() {
        let newState = this.props.gameActions.resetGame(ResetGame(this.state.initialState));
    
        this.stopCountDown();
    
        return newState;
      }
    }
    
    MainScreen.propTypes = {
      gameActions: PropTypes.object,
      initialState: PropTypes.object
    };
    
    function mapStateToProps(state) {
      return { state: state };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        gameActions: bindActionCreators(gameActions, dispatch)
      };
    }
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(MainScreen);
    
