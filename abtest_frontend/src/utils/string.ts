import _ from 'lodash'

export const ABTestTimeList = _.range(0, 24 * 60, 15).map(minutes => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
});