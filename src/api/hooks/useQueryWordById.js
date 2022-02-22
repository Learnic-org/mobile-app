import useQueryWords from './useQueryWords';

const useQueryWordById = () => {
  const {words} = useQueryWords();

  const getWordById = wordId => words[wordId];

  return {
    getWordById,
  };
};

export default useQueryWordById;
