export function generateRandomNumberWithLength(number: number): string {
  const add = 1;
  let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (number > max) {
    return generateRandomNumberWithLength(max) + generateRandomNumberWithLength(number - max);
  }

  max = Math.pow(10, number + add);
  const min = max / 10; // Math.pow(10, n) basically
  number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}
