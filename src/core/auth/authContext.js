import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Text} from 'react-native';
import * as firebase from 'firebase';

const Statuses = {
  Loading: 'loading',
  SignedIn: 'signed-in',
  Unauthorised: 'unauthorised',
  Cancelled: 'sign-in-cancelled',
  InProgress: 'sign-in-progress',
  ServicesNotAvailable: 'sign-in-services-not-available',
  UnknownError: 'unknown-sign-in-error',
};

const AuthContext = React.createContext({});

const AuthContextProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState(Statuses.Loading);

  const setInitialStatus = async () => {
    await GoogleSignin.hasPlayServices();
    const isSignedIn = await GoogleSignin.isSignedIn();

    setStatus(isSignedIn ? Statuses.SignedIn : Statuses.Unauthorised);

    if (isSignedIn) {
      const userInfo = await GoogleSignin.signInSilently();
      const credential = await firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      await firebase.auth().signInWithCredential(credential);
      const additionalUserData = await firebase.auth().currentUser;

      setUser({...userInfo, ...additionalUserData});
    }
  };

  React.useEffect(() => {
    setInitialStatus();
  }, []);

  const signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setStatus(Statuses.SignedIn);
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setStatus(Statuses.Cancelled);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setStatus(Statuses.InProgress);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setStatus(Statuses.ServicesNotAvailable);
      } else {
        setStatus(Statuses.UnknownError);
      }
    }
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
    setStatus(Statuses.Unauthorised);
    setUser(null);
  };

  const getStatus = () => status;
  const getUser = () => (user ? user : null);

  const value = {
    signIn,
    signOut,
    getStatus,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {status === Statuses.Loading ? <Text>Loading...</Text> : children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const value = React.useContext(AuthContext);

  return value;
};

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '51326144321-8nu0hecpklv0ejn0scv9urb7sub8oqmp.apps.googleusercontent.com',
  offlineAccess: true,
  iosClientId:
    '51326144321-qe2vbcvq287imih6vf7ktdhtjteq4hb2.apps.googleusercontent.com',
});

export {AuthContextProvider, useAuthContext, Statuses};
