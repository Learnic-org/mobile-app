import db from '../db';
import {useAuthContext} from '../../core/auth/authContext';

const updateWordRequest = async (uid, id, data) => {
  const wordRef = db.collection('users').doc(uid).collection('words').doc(id);
  return await wordRef.update(data);
};

const useUpdateWord = () => {
  const {getUser} = useAuthContext();
  const userData = getUser() || {};
  const {uid} = userData;

  const updateWord = async (id, data) => {
    return await updateWordRequest(uid, id, data);
  };

  return {
    updateWord,
  };
};

export default useUpdateWord;
