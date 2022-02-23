import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Button,
} from 'react-native';
import useQueryWords from '../../api/hooks/useQueryWords';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WordCard from './WordCard/WordCard';
import NewWord from './NewWord/NewWord';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const Stack = createNativeStackNavigator();

const prepareWords = words => {
  if (!words) return [];
  const groupedByDate = {};
  Object.entries(words).forEach(entry => {
    const [id, data] = entry;
    const date = dayjs(data.date);
    const stringDate =
      date.year() === dayjs().year()
        ? date.format('DD MMMM')
        : date.format('DD MMMM YYYY');

    if (groupedByDate[stringDate]) {
      groupedByDate[stringDate] = [...groupedByDate[stringDate], {id, ...data}];
    } else {
      groupedByDate[stringDate] = [{id, ...data}];
    }
  });

  return groupedByDate;
};

const Dictionary = ({navigation}) => {
  const {words} = useQueryWords();
  const [activeWordId, setActiveWordId] = useState(null);

  useEffect(() => {
    if (activeWordId) {
      navigation.navigate('WordCard');
    }
  }, [navigation, activeWordId]);

  const preparedWords = useMemo(() => {
    return prepareWords(words);
  }, [words]);

  const openNewWord = () => {
    navigation.navigate('NewWord');
  };

  const List = () => (
    <>
      <ScrollView>
        <View style={styles.dictionary}>
          {Object.keys(preparedWords).map(date => (
            <View style={styles.group}>
              <Text style={styles.date}>{date}</Text>
              {preparedWords[date].map(({id, word, translate}) => (
                <TouchableHighlight
                  style={styles.word}
                  key={id}
                  onPress={() => setActiveWordId(id)}>
                  <>
                    <Text
                      style={styles.wordText}>{`${word} - ${translate}`}</Text>
                  </>
                </TouchableHighlight>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addNewButtonContainer}>
        <TouchableHighlight style={styles.addButton} onPress={openNewWord}>
          <Text style={styles.addButtonText}>+ Add new word</Text>
        </TouchableHighlight>
      </View>
    </>
  );

  const NoWord = () => (
    <View style={styles.noWordsContainer}>
      <Text style={styles.noWordsText}>No words in dictionary. </Text>
      <Button onPress={openNewWord} title="Add the first one!" />
    </View>
  );

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={!words ? NoWord : List} />
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
    padding: 16,
  },
  word: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 6,
    borderRadius: 8,
  },
  wordText: {
    fontSize: 20,
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
  group: {
    marginBottom: 12,
    padding: 10,
  },
  date: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  noWordsContainer: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
  },
  noWordsText: {
    fontSize: 20,
  },
});

export default Dictionary;
