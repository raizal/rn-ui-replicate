import getDayOfYear from 'date-fns/getDayOfYear';
import {
  getDateFromPickerFormat,
  generateRangeOfDates,
  formatDateForPicker,
} from './utils';

//generateRangeOfDates
describe('test generateRangeOfDates', function () {
  it('range 30 should generate 30 dates & last date equal range', () => {
    const range = 30;
    const dates = generateRangeOfDates(range);
    expect(dates).toHaveLength(range);
    const lastDate = dates[dates.length - 1];
    // +1 since now should be included as in range
    expect(getDayOfYear(lastDate) - getDayOfYear(Date.now()) + 1).toEqual(
      range,
    );
  });
  it('range 0 should generate nothing', () => {
    const range = 0;
    const dates = generateRangeOfDates(range);
    expect(dates).toHaveLength(range);
  });

  it('range below 0 should generate nothing', () => {
    const range = -5;
    const dates = generateRangeOfDates(range);
    expect(dates).toHaveLength(0);
  });
});

//formatDateForPicker
describe('test formatDateForPicker', function () {
  it('2020-08-27 should return Thu\\nAug, 27 2020', () => {
    const result = formatDateForPicker(new Date(2020, 7, 27));
    expect(result).toEqual('Thu\nAug, 27 2020');
  });
});
//getDateFromPickerFormat
describe('test getDateFromPickerFormat', () => {
  it('convert string Thu\\nAug, 27 2020 should return correct date', () => {
    const date = getDateFromPickerFormat('Thu\nAug, 27 2020');
    expect(date).not.toBeNull();
    expect(date?.getDate()).toEqual(27);
    expect(date?.getMonth()).toEqual(7);
    expect(date?.getFullYear()).toEqual(2020);
  });

  it('convert string Thu\\nAug, 32 2020 should return null', () => {
    const date = getDateFromPickerFormat('Thu\nAug, 32 2020');
    expect(date).toEqual(null);
  });

  it('on error return null', () => {
    const date = getDateFromPickerFormat('Thu\nAuag, 27 2020');
    expect(date).toEqual(null);
  });
});
