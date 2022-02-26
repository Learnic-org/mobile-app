import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import useUpdateWord from '../../../api/hooks/useUpdateWord';
import {
  getRepeatDateIfFail,
  getRepeatDateIfRepeatAgain,
  getNewRepeatDateByStep,
} from '../../../utils/getNewRepeatDate';

const Card = ({id, word, translate, step, onNext}) => {
  const {updateWord} = useUpdateWord();
  const [showTranslate, setShowTranslate] = useState(false);

  const updateStep = async () => {
    const newStep = step + 1;
    const newRepeatDate = getNewRepeatDateByStep(newStep);
    await updateWord(id, {
      step: newStep,
      repeat: newRepeatDate,
    });
    onNext();
  };

  const updateRepeatTime = async action => {
    if (action === 'fail') {
      const newRepeatDate = getRepeatDateIfFail();
      await updateWord(id, {
        repeat: newRepeatDate,
      });
    } else if (action === 'again') {
      const newRepeatDate = getRepeatDateIfRepeatAgain();
      await updateWord(id, {
        repeat: newRepeatDate,
      });
    }
    onNext();
  };

  return (
    <>
      <View key={id} style={styles.card}>
        <Text style={styles.word}>{word}</Text>
        <TouchableHighlight
          style={styles.showTranslate}
          onPress={() => setShowTranslate(oldValue => !oldValue)}
          underlayColor="#d4e5ff">
          {Boolean(showTranslate) ? (
            <Text>{translate}</Text>
          ) : (
            <Text>Show translate</Text>
          )}
        </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        <Text>How quickly did you remember the translate?</Text>
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.button} onPress={updateStep}>
            <Text>🔥 +2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => updateRepeatTime('again')}>
            <Text>🤔 +1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => updateRepeatTime('fail')}>
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
    backgroundColor: 'rgb(243, 242, 255)',
    borderRadius: 16,
    borderColor: '#344CB7',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontSize: 26,
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
  showTranslate: {
    marginTop: 8,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#bfd8ff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default Card;
