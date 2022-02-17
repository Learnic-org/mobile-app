import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AuthContextProvider,
  useAuthContext,
  Statuses,
} from './core/auth/authContext';
import Home from './components/Home/Home';
import Login from './features/Login/Login';
import './api/db';

const App = () => {
  const {getStatus} = useAuthContext();
  const isSignedIn = getStatus() === Statuses.SignedIn;

  if (isSignedIn) {
    return <Home />;
  }

  return <Login />;
};

const HomeScreen = () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

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

export default HomeScreen;
