export default (name, isMyself) => {
  return `${name}${isMyself ? ' (Me)' : ''}`;
};
