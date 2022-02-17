import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {useAuthContext} from '../../core/auth/authContext';
import {getDictionary} from '../../api/dictionary';
import Icon from '../../components/Icon/Icon';

const Dictionary = () => {
  const {getUser} = useAuthContext();
  const [words, setWords] = useState({});

  const getWords = useCallback(async () => {
    const user = getUser() || {};
    const {uid = null} = user;
    if (!uid) return;
    getDictionary(uid).then(setWords);
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
                <Icon name="arrowRight" />
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
