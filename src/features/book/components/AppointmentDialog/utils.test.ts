import {getDateFromPickerFormat} from './utils';

//generateRangeOfDates
//formatDateForPicker
//getDateFromPickerFormat
it('convert string Thu\\nAug, 27 2020 should return correct date', () => {
  const date = getDateFromPickerFormat('Thu\nAug, 27 2020');
  expect(date.getDate()).toEqual(27);
  expect(date.getMonth()).toEqual(7);
  expect(date.getFullYear()).toEqual(2020);
});

it('convert string Thu\\nAug, 32 2020 should return null', () => {
  const date = getDateFromPickerFormat('Thu\nAug, 32 2020');
  expect(date).toEqual(null);
});

it('on error return null', () => {
  const date = getDateFromPickerFormat('Thu\nAuag, 27 2020');
  expect(date).toEqual(null);
});
