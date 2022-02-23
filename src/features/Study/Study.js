import React, {useState, useMemo} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useQueryWords from '../../api/hooks/useQueryWords';
import Card from './Card/Card';

const prepareWords = words => {
  if (!words) return [];

  return Object.entries(words).map(entry => {
    const [id, data] = entry;
    return {
      id,
      ...data,
    };
  });
};

const Study = () => {
  const {words = {}} = useQueryWords();
  const [index, setIndex] = useState(0);

  const preparedWords = useMemo(() => {
    return prepareWords(words);
  }, [words]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`${index + 1}/${
        preparedWords.length
      }`}</Text>
      <Carousel
        layout={'default'}
        data={preparedWords}
        sliderWidth={300}
        itemWidth={300}
        renderItem={({item: {id, word, translate}}) => (
          <Card id={id} word={word} translate={translate} />
        )}
        onSnapToItem={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    paddingTop: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    marginBottom: 12,
    fontSize: 18,
  },
});

export default Study;
