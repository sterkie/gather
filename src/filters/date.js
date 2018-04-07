import moment from "moment";

export const monthday = value => {
  return moment(value).format("MMMM Do");
};

export const shortdate = value => {
  return moment(value).format("ddd MMM Do");
};
