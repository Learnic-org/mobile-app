import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from '../../../components/Icon/Icon';
import useQueryWordById from '../../../api/hooks/useQueryWordById';

const WordCard = ({navigation, route}) => {
  const {getWordById} = useQueryWordById();
  const {itemId} = route.params;
  const {word, translate} = getWordById(itemId);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.goBack()}>
        <Icon name="arrowLeft" />
      </TouchableHighlight>
      <Text style={styles.word}>{`${word} - ${translate}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  word: {
    fontSize: 28,
  },
  container: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingTop: 8,
    paddingLeft: 8,
  },
});

export default WordCard;
