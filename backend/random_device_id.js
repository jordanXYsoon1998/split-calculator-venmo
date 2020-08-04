const randomDeviceId = () => {
  const clientId = '88884260-05O3-8U81-58I1-2WA76F357GR9';
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetLength = alphabets.length;
  const randomId = [...clientId].map(char => {
    if (char >= '0' && char <= '9') {
      return Math.floor(Math.random() * 10).toString();
    } else if (char == '-') {
      return char;
    } else {
      return alphabets[Math.floor(Math.random() * alphabetLength)];
    }
  });
  return randomId.join('');
};
