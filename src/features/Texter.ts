const transl: any = {
  А: "A",
  а: "a",
  Б: "B",
  б: "b",
  В: "V",
  в: "v",
  Г: "G",
  г: "g",
  Д: "D",
  д: "d",
  Е: "E",
  е: "e",
  Ё: "Yo",
  ё: "yo",
  Ж: "Zh",
  ж: "zh",
  З: "Z",
  з: "z",
  И: "I",
  и: "i",
  Й: "iy",
  й: "iy",
  К: "K",
  к: "k",
  Л: "L",
  л: "l",
  М: "M",
  м: "m",
  Н: "N",
  н: "n",
  О: "O",
  о: "o",
  П: "P",
  п: "p",
  Р: "R",
  р: "r",
  С: "S",
  с: "s",
  Т: "T",
  т: "t",
  У: "U",
  у: "u",
  Ф: "F",
  ф: "f",
  Х: "H",
  х: "h",
  Ц: "C",
  ц: "c",
  Ч: "Ch",
  ч: "ch",
  Ш: "Sh",
  ш: "sh",
  Щ: "Shh",
  щ: "shh",
  Ъ: "",
  ъ: "",
  Ы: "I",
  ы: "i",
  Ь: "",
  ь: "",
  Э: "E",
  э: "e",
  Ю: "Yu",
  ю: "yu",
  Я: "Ya",
  я: "ya",
};

type Translit = (text: string, options?: { lowerCase?: boolean }) => string;

export class Texter {
  static translit: Translit = (text: string, options) => {
    let newText = `${text}`;
    let result = "";

    if (options?.lowerCase) {
      newText = newText.toLowerCase();
    }

    for (let i = 0; i < newText.length; i++) {
      if (transl[newText[i]] != undefined) {
        result += transl[newText[i]];
      } else {
        result += newText[i];
      }
    }

    return result;
  };

  static slugify(text: string) {
    return this.translit(text, { lowerCase: true })
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/!/g, "")
      .replace(/,/g, "");
  }
}
