export const parsePascal = (input: string): Array<string> => {
  const output = input.replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .split(' ');

  output.shift();

  return output;
};
