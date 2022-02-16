import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import db from '../../api/db';
import {useAuthContext} from '../../core/auth/authContext';

const Dictionary = () => {
  const {getUser} = useAuthContext();
  const [words, setWords] = React.useState({});

  const getWords = React.useCallback(async () => {
    const user = getUser() || {};
    const {uid = null} = user;
    if (!uid) return;
    try {
      const wordsRef = db.collection('users').doc(uid).collection('words');
      const words = await wordsRef.get();
      const result = {};
      words.forEach(doc => {
        result[doc.id] = doc.data();
      });
      setWords(result);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [getUser]);

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

          return (
            <TouchableHighlight style={styles.word} key={id}>
              <>
                <Text style={styles.wordText}>{`${word} - ${translate}`}</Text>
                <Svg
                  style={styles.icon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <Path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="m184 112 144 144-144 144"
                  />
                </Svg>
              </>
            </TouchableHighlight>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dictionary: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  word: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 22,
    width: '80%',
  },
  icon: {
    width: 30,
    height: 30,
    color: '#7c83fd',
  },
});

export default Dictionary;
