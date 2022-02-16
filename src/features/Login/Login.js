import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAuthContext} from '../../core/auth/authContext';

const Login = () => {
  const {signIn, signOut, getStatus} = useAuthContext();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../../../static/logo.png')}
          style={{width: 200, height: 60}}
        />
        <View style={styles.providers}>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
});

export default Login;
