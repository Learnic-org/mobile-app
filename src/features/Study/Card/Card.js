import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Card = ({id, word}) => {
  return (
    <>
      <View key={id} style={styles.card}>
        <Text style={styles.word}>{word}</Text>
      </View>
      <View style={styles.footer}>
        <Text>How quickly did you remember the translate?</Text>
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.button}>
            <Text>🔥 +2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text>🤔 +1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text>😰 0</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: 'rgb(243, 242, 255) ',
    borderRadius: 16,
    borderColor: '#344CB7',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontSize: 22,
  },
  footer: {
    marginTop: 12,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: 40,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    borderRadius: 6,
  },
});

export default Card;
