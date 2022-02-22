import React, {useState, useEffect, useMemo} from 'react';
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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const Stack = createNativeStackNavigator();

const prepareWords = words => {
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
  const {words} = useDictionary();
  const [activeWordId, setActiveWordId] = useState(null);

  useEffect(() => {
    if (activeWordId) {
      navigation.navigate('WordCard');
    }
  }, [navigation, activeWordId]);

  const preparedWords = useMemo(() => {
    return prepareWords(words);
  }, [words]);

  if (!words) return null;

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    padding: 10,
  },
  date: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default Dictionary;
