/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.log('APP', App);
AppRegistry.registerComponent(appName, () => App);
