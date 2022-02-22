import {useMemo, useState} from 'react';
import db from './db';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useAuthContext} from '../core/auth/authContext';

const fetchWords = async uid => {
  try {
    const wordsRef = db.collection('users').doc(uid).collection('words');
    const words = await wordsRef.orderBy('date', 'desc').get();
    const result = {};
    words.forEach(doc => {
      const data = doc.data();
      result[doc.id] = {
        ...data,
        date: data.date.toDate(),
      };
    });
    return result;
  } catch (error) {
    throw new Error('Error while fetching words: ' + error);
  }
};

const addNewWordRequest = async ({uid, word, translate}) => {
  const request = db.collection('users').doc(uid).collection('words');

  try {
    const ref = await request.add({
      word,
      translate,
      step: 0,
      date: new Date(),
      repeat: new Date(),
      audio: '',
      transcription: '',
    });
    const snapshot = await ref.get();
    const data = snapshot.data();
    const newWordId = snapshot.id;

    return {
      id: newWordId,
      ...data,
    };
  } catch (e) {
    console.log('Error: ', e);
  }
};

const useDictionary = () => {
  const queryClient = useQueryClient();
  const {getUser} = useAuthContext();
  const userData = getUser() || {};
  const {uid} = userData;
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    isError,
    data: words,
    error,
  } = useQuery('words', () => fetchWords(uid), {
    enabled: !!uid,
  });

  const addNewWordMutation = useMutation(addNewWordRequest, {
    onSuccess: newData => {
      queryClient.setQueryData('words', oldData => {
        setLoading(false);
        return {
          newData,
          ...oldData,
        };
      });
    },
    onError: () => {
      // .. do something
    },
  });

  const getWord = wordId => {
    return words[wordId];
  };

  const addNewWord = async ({word, translate}) => {
    setLoading(true);
    addNewWordMutation.mutate({
      uid,
      word,
      translate,
    });
  };

  return {
    words,
    getWord,
    loading,
    addNewWord,
  };
};

export {useDictionary};
