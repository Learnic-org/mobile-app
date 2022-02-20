import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Icon from '../../components/Icon/Icon';
import {useDictionary} from '../../api/dictionary';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WordCard from './WordCard/WordCard';
import NewWord from './NewWord/NewWord';

const Stack = createNativeStackNavigator();

const Dictionary = ({navigation}) => {
  const {words} = useDictionary();
  const [activeWordId, setActiveWordId] = useState(null);

  useEffect(() => {
    if (activeWordId) {
      navigation.navigate('WordCard');
    }
  }, [navigation, activeWordId]);

  if (!words) return null;

  const openNewWord = () => {
    navigation.navigate('NewWord');
  };

  const List = () => (
    <>
      <ScrollView>
        <View style={styles.dictionary}>
          {Object.entries(words).map(entry => {
            const [id, data] = entry;
            const {word, translate} = data;

            return (
              <TouchableHighlight
                style={styles.word}
                key={id}
                onPress={() => setActiveWordId(id)}>
                <>
                  <Text
                    style={styles.wordText}>{`${word} - ${translate}`}</Text>
                  <Icon name="arrowRight" />
                </>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.addNewButtonContainer}>
        <TouchableHighlight style={styles.addButton} onPress={openNewWord}>
          <Text style={styles.addButtonText}>+ Add new word</Text>
        </TouchableHighlight>
      </View>
    </>
  );

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen
        name="WordCard"
        component={WordCard}
        initialParams={{itemId: activeWordId}}
      />
      <Stack.Screen name="NewWord" component={NewWord} />
    </Stack.Navigator>
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
  addButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#344CB7',
    padding: 6,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Dictionary;
