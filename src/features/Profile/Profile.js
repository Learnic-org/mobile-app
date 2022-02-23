import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useAuthContext} from '../../core/auth/authContext';

const ProfileScreen = () => {
  const {getUser, signOut} = useAuthContext();
  const {user} = getUser() || {};
  const {name, email, photo} = user;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.photo}
          source={{
            uri: photo,
          }}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableHighlight
          onPress={signOut}
          style={styles.signOutButton}
          underlayColor="#e3e3e3">
          <Text>Sign out</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    margin: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'flex-end',
  },
  signOutButton: {
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#d6d6d6',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default ProfileScreen;
