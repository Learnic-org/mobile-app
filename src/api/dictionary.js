import db from './db';

const getDictionary = async uid => {
  try {
    const wordsRef = db.collection('users').doc(uid).collection('words');
    const words = await wordsRef.get();
    const result = {};
    words.forEach(doc => {
      result[doc.id] = doc.data();
    });
    return result;
  } catch (error) {
    console.log('Error: ', error);
  }
};

export {getDictionary};
