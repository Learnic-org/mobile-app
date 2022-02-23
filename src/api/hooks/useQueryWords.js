import db from '../db';
import {useQuery} from 'react-query';
import {useAuthContext} from '../../core/auth/authContext';

const fetchWords = async uid => {
  try {
    const wordsRef = db.collection('users').doc(uid).collection('words');
    const words = await wordsRef.get();
    const result = {};
    words.forEach(doc => {
      const data = doc.data();
      result[doc.id] = {
        ...data,
        date: data.date.toDate(),
      };
    });
    console.log('WORDS', result);
    return result;
  } catch (error) {
    throw new Error('Error while fetching words: ' + error);
  }
};

const useQueryWords = () => {
  const {getUser} = useAuthContext();
  const userData = getUser() || {};
  const {uid} = userData;

  const {
    isLoading,
    isError,
    data: words,
    error,
  } = useQuery('words', () => fetchWords(uid), {
    enabled: !!uid,
  });

  return {
    words,
  };
};

export default useQueryWords;
