import dayjs from 'dayjs';

const steps = {
  0: [0, 'second'],
  1: [30, 'minute'],
  2: [24, 'hour'],
  3: [7, 'day'],
  4: [14, 'day'],
  5: [1, 'month'],
  6: [2, 'month'],
};

const additionalTime = {
  fail: [24, 'hour'],
  repeatAgain: [12, 'hour'],
};

const getRepeatDateIfFail = () => {
  const now = dayjs();
  const newDateToRepeat = now.add(...additionalTime.fail).toDate();

  return newDateToRepeat;
};
const getRepeatDateIfRepeatAgain = () => {
  const now = dayjs();
  const newDateToRepeat = now.add(...additionalTime.repeatAgain).toDate();

  return newDateToRepeat;
};

const getNewRepeatDateByStep = step => {
  const now = dayjs();
  const newRepeatDate = now.add(...steps[step]).toDate();
  return newRepeatDate;
};

export {
  getRepeatDateIfFail,
  getRepeatDateIfRepeatAgain,
  getNewRepeatDateByStep,
};
