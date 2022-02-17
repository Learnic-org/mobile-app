import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon/Icon';

const Tab = createBottomTabNavigator();

const Tabs = ({tabs}) => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => <Icon name={route.name.toLowerCase()} />,
        tabBarActiveTintColor: '#7c83fd',
        tabBarInactiveTintColor: 'gray',
      })}>
      {tabs.map(({name, Component}) => (
        <Tab.Screen key={name} name={name} component={Component} />
      ))}
    </Tab.Navigator>
  </NavigationContainer>
);

export {Tabs};
