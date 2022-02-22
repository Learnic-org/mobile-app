import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {useDictionary} from '../../../api/dictionary';
import Icon from '../../../components/Icon/Icon';

const NewWord = ({navigation}) => {
  const {addNewWord, loading} = useDictionary();
  const [word, setWord] = useState('');
  const [translate, setTranslate] = useState('');

  const handleSave = async () => {
    await addNewWord({word, translate});
    setWord('');
    setTranslate('');
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Icon name="arrowLeft" style={{color: '#000'}} />
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          placeholder="Word"
          value={word}
          onChangeText={setWord}
        />
        <TextInput
          style={styles.input}
          placeholder="Translate"
          value={translate}
          onChangeText={setTranslate}
        />
        <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    height: 50,
    fontSize: 16,
  },
  saveButton: {
    height: 50,
    backgroundColor: '#344CB7',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NewWord;
