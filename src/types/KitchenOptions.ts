// Стили кухни

export enum KitchensOptions {
  loft = "loft",
  classic = "classic",
  minimalism = "minimalism",
  hightech = "hightech",
  chalet = "chalet",
};

export const kitchensTranslate = {
  loft: "Лофт",
  classic: "Классика",
  minimalism: "Минимализм",
  hightech: "Хай-тек",
  chalet: "Шале",
};

// Типы кухни
export enum KitchensStyles {
  straight = 'straight',
  corner = 'corner',
  UShaped = 'UShaped',
  fullWidth = 'fullWidth',
};

export const kitchensStylesTranslate = {
  straight: 'Прямая',
  corner: 'Угловая',
  UShaped: 'П-образная',
  fullWidth: 'Во всю ширину',
}

export interface IBudgetOption {
  label: string;
  min: number,
  max: number,
}

export interface IDaysOption {
  label: string;
  min: number;
  max: number;
}

export const kitchensBudget: IBudgetOption[] = [
  {
    label: 'Все',
    max: 999_999_999,
    min: 0,
  },
  {
    label: 'до 200 000',
    max: 200000,
    min: 0,
  },
  {
    label: 'до 300 000',
    max: 300000,
    min: 0,
  },
  {
    label: 'до 500 000',
    max: 500000,
    min: 0,
  },
  {
    label: 'до 800 000',
    max: 800000,
    min: 0,
  },
  {
    label: 'от 800 000',
    min: 800000,
    max: 999_999_999,
  },
];

export const kitchensDays: IDaysOption[] = [
  {
    label: 'Все',
    max: 1000,
    min: 0,
  },
  {
    label: 'до 14 дней',
    max: 14,
    min: 0,
  },
  {
    label: 'до 20 дней',
    max: 20,
    min: 0,
  },
  {
    label: 'до 30 дней',
    max: 30,
    min: 0,
  },
  {
    label: 'до 40 дней',
    max: 40,
    min: 0,
  },
]