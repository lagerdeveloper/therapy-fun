import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import GamesScreen from './src/GamesScreen';
import SearchScreen from './src/SearchScreen';
import MyPlanScreen from './src/MyPlanScreen';
import AccountScreen from './src/AccountScreen';
import CategoryScreen from './src/CategoryScreen';
import GameScreen from './src/GameScreen';

const GamesStack = createStackNavigator({
  Games: GamesScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Category: CategoryScreen,
});

const MyPlanStack = createStackNavigator({
  MyPlan: MyPlanScreen,
});

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

const MainTabNavigator = createBottomTabNavigator({
  Games: {
    screen: GamesStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='gamepad' color={tintColor} size={30} />,
    }),
  },
  Search: {
    screen: SearchStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor}) => <Ionicons name='ios-search' color={tintColor} size={30} />,
    }),
  },
  MyPlan: {
    screen: MyPlanStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor}) => <Ionicons name='ios-list-box' color={tintColor} size={30} />,
    }),
  },
  Account: {
    screen: AccountStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor}) => <Ionicons name='ios-person' color={tintColor} size={30} />,
    }),
  },
}, {
  tabBarOptions: {
    activeTintColor: '#127eaf',
  },
});

const RootStack = createStackNavigator({
  Main: MainTabNavigator,
  Game: GameScreen,
}, {
  headerMode: 'none',
});

export default RootStack;
