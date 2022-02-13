/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Image,
   TouchableOpacity,
   ScrollView,
   TouchableHighlight
 } from 'react-native';
 import {
   GoogleSignin,
   statusCodes,
 } from '@react-native-google-signin/google-signin';
 import * as firebase from "firebase";
 
const Statuses = {
  Loading: 'loading',
  SignedIn: 'signed-in',
  Unauthorised: 'unauthorised',
  Cancelled: 'sign-in-cancelled',
  InProgress: 'sign-in-progress',
  ServicesNotAvailable: 'sign-in-services-not-available',
  UnknownError: 'unknown-sign-in-error'
}
 
 
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
      const credential = await firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      await firebase.auth().signInWithCredential(credential);
      const additionalUserData = await firebase.auth().currentUser;

      setUser({...userInfo, ...additionalUserData});
    }
  } 

  React.useEffect(() => {
    setInitialStatus();
  }, [])

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
  }

  const signOut = async () => {
    await GoogleSignin.signOut();
    setStatus(Statuses.Unauthorised);
    setUser(null);
  }

  const getStatus = () => status;
  const getUser = () => user ? user : null;

  const value = {
    signIn,
    signOut,
    getStatus,
    getUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {status === Statuses.Loading ? <Text>Loading...</Text> : children}
    </AuthContext.Provider>
  )
}
 
const useAuthContext = () => {
  const value = React.useContext(AuthContext);

  return value;
}
 
 
 const firebaseConfig = {
   // config
 };
 let app = null
 if (!firebase.apps.length) {
   app = firebase.initializeApp(firebaseConfig);
 }
 
 const db = firebase.firestore()
 
 GoogleSignin.configure({
   scopes: ['email', 'profile'],
   webClientId:
     '51326144321-8nu0hecpklv0ejn0scv9urb7sub8oqmp.apps.googleusercontent.com', 
   offlineAccess: true,
   iosClientId: 
     '51326144321-qe2vbcvq287imih6vf7ktdhtjteq4hb2.apps.googleusercontent.com', 
 });

const Dictionary = () => {
  const {getUser} = useAuthContext();
  const [words, setWords] = React.useState({});

  const getWords = React.useCallback(async () => {
    const user = getUser() || {};
    const { uid = null } = user;
    if (!uid) return;
    try {
      const wordsRef = db.collection('users').doc(uid).collection('words');
      const words = await wordsRef.get();
      const result = {};
      words.forEach(doc => {
        result[doc.id] = doc.data();
      })
      setWords(result);
    } catch(error) {
      console.log('Error: ', error)
    }

  }, [getUser])

  useEffect(() => {
    getWords();
  }, [getWords]);

  if (!words) return null;

  return (
    <ScrollView>
      <View style={styles.dictionary}>
        {Object.entries(words).map(entry => {
          const [id, data] = entry;
          const {word, translate} = data;

          return <TouchableHighlight style={styles.word} key={id}><Text style={styles.wordText}>{`${word} - ${translate}`}</Text></TouchableHighlight>
        })}
      </View>
    </ScrollView>
  );
}
 

const Home = () => {
  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
      <SafeAreaView>
        <Dictionary />
      </SafeAreaView>
    </View>
  )
}

const SignIn = () => {
  const {signIn, signOut, getStatus} = useAuthContext();

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Image
        source={require('./static/logo.png')}
        style={{ width: 200, height: 60 }}
      />
      <View style={styles.providers}>
        <TouchableOpacity
          style={styles.button}
          onPress={signIn}
        >
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}

const App = () => {
  const {getStatus} = useAuthContext();
  const isSignedIn = getStatus() === Statuses.SignedIn

  if (isSignedIn) {
    return <Home />;
  }

  return <SignIn />;
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
     backgroundColor: "#DDDDDD",
     borderRadius: 8,
     paddingTop: 8,
     paddingBottom: 8,
     paddingLeft: 16,
     paddingRight: 16,
   },
   dictionary: {
     paddingTop: 16,
     paddingBottom: 16,
     paddingLeft: 16,
     paddingRight: 16,
   },
   word: {
     paddingTop: 6,
     paddingBottom: 6,
     paddingLeft: 10,
     paddingRight: 10,
     marginTop: 4,
     marginBottom: 4,
     backgroundColor: '#fff',
     borderRadius: 8,
   },
   wordText: {
    fontSize: 22,
   }
 });

export default () => <AuthContextProvider><App /></AuthContextProvider>
 