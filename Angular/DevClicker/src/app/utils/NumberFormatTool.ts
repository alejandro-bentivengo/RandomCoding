export class NumberFormatTool {
  private static dictionary = [
    { letter: 'K' },
    { letter: 'M' },
    { letter: 'B' },
    { letter: 'T' }
  ];

  public static getNumberAsString(num: string): string {
    let found = false;
    let i = 0;
    let value = '';
    while (!found) {
      if (BigInt(num) < Math.pow(10, i)) {
        const n = this.getLetterValue(i);
        if (i > 3) {
          value =
            Number(BigInt(num) / BigInt(Math.pow(10, i - 5))) / 100 + ' ' + n;
        } else {
          value = num + ' ' + n;
        }
        found = true;
      } else {
        i += 3;
      }
    }
    return value;
  }

  private static getLetterValue(i: number): string {
    if (i <= 3) {
      return '';
    } else if (i > 3 && i <= (NumberFormatTool.dictionary.length + 1) * 3) {
      return NumberFormatTool.dictionary[i / 3 - 2].letter;
    } else {
      return NumberFormatTool.findNonDictionaryLetter(i);
    }
  }

  private static findNonDictionaryLetter(i: number): string {
    let index = i / 3 - 5;
    let s = '';
    let t: number;

    while (index > 0) {
      t = (index - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      index = ((index - t) / 26) | 0;
    }
    return s || undefined;
  }
}
