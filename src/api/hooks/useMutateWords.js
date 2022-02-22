import {useState} from 'react';
import db from '../db';
import {useMutation, useQueryClient} from 'react-query';
import {useAuthContext} from '../../core/auth/authContext';

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

const useMutateWords = () => {
  const queryClient = useQueryClient();
  const {getUser} = useAuthContext();
  const userData = getUser() || {};
  const {uid} = userData;
  const [loading, setLoading] = useState(false);

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

  const addNewWord = async ({word, translate}) => {
    setLoading(true);
    addNewWordMutation.mutate({
      uid,
      word,
      translate,
    });
  };

  return {
    loading,
    addNewWord,
  };
};

export default useMutateWords;
