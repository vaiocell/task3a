export default function checkWord(word) {
  const words = [
    'concat',
    'entries',
    'fill',
    'find',
    'forEach',
    'join',
    'lastIndexOf',
    'map',
    'push',
    'reduceRight',
    'shift',
    'some',
    'splice',
    'copyWithin',
    'every',
    'filter',
    'findIndex',
    'indexOf',
    'keys',
    'length',
    'pop',
    'reduce',
    'reverse',
    'slice',
    'sort',
    'unshift',
  ];

  if (words.indexOf(word) !== -1) return true;
}
