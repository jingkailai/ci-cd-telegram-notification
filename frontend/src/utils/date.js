import moment from 'moment';
export const getDateString = (ISODate) => {
  const date = moment(ISODate).format("LL");

  return date;
};
export const getMonth3C = (ISODate) => {
  const date = moment(ISODate).format("MMM");

  return date;
};
export const getDate2C = (ISODate) => {
  const date = moment(ISODate).format("DD");

  return date;
};