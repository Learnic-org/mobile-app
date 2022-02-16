import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import Svg, {Path} from 'react-native-svg';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Training from '../../features/Training/Training';
import Profile from '../../features/Profile/Profile';
import Dictionary from '../../features/Dictionary/Dictionary';

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  providers: {
    marginTop: 22,
  },
  button: {
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  icon: {
    width: 30,
    height: 30,
    color: '#7c83fd',
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
});

const Tab = createBottomTabNavigator();

const Home = ({children}) => {
  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
      <SafeAreaView>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                if (route.name === 'Dictionary') {
                  return (
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={styles.icon}>
                      <Path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="32"
                        d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96zm0 0v288"
                      />
                    </Svg>
                  );
                }

                if (route.name === 'Trainings') {
                  return (
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={styles.icon}>
                      <Path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="32"
                        d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"
                      />
                    </Svg>
                  );
                }

                if (route.name === 'Profile') {
                  return (
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={styles.icon}>
                      <Path
                        fill="currentColor"
                        d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32 124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z"
                      />
                      <Path
                        fill="currentColor"
                        d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"
                      />
                    </Svg>
                  );
                }
              },
              tabBarActiveTintColor: '#7c83fd',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Dictionary" component={Dictionary} />
            <Tab.Screen name="Trainings" component={Training} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};

export default Home;
