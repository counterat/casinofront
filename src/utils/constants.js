export const DOUBLE = '×2';
export const ONE_AND_A_HALF = '×1,5';
export const HALF = '÷2';
export const MAX = 'MAX';
export const USD_SYMBOL = '$';
export const LIGHT = 'light';
export const DARK = 'dark';
export const MIN_RATE_INPUT_VALUE = 0;
export const MIN_MULTIPLIER_INPUT_VALUE = 1.1;
export const INITIAL_RATE_VALUE = 2.5;
export const MIN_WITHDRAWAL_AMOUNT = 10;
export const MIN_REFILL_AMOUNT = 5;

export const INCREASE = 'increase';
export const DECREASE = 'decrease';
export const DIVIDE = 'divide';
export const MULTIPLY_TWICE = 'twice';
export const MULTIPLY_ONE_AND_A_HALF = 'multiply_one_and_a_half';
export const MAKE_MAX = 'make_max';
export const SET_BY_USER = 'set_by_user';
export const CHANGE_USER_BALANCE = 'change_user_balance';

export const buttonStyle = {

    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    WebkitTapHighlightColor: 'transparent'
  };

export const MODAL_TYPES = {
  WITHDRAWAL: 'withdrawal',
  REFILL: 'refill',
  REFERAL: 'referal',
  PROMOCODE: 'promocode',
  SUPPORT: 'support',
  LANGUAGE: 'language',
}

export const CUSTOM_MULTIPLY = 'custom_multiply';

export const userDeviceWidth = window.innerWidth;

export const MESSAGES = {
  NO_BETS: 'Ставок еще не было',
  NO_SERVER_RESPONSE: 'Что-то пошло не так...',
  NOT_ENOUGH_MONEY: 'У вас недостаточно средств',
  EMPTY_REFIL_AMOUNT_INPUT: 'Сумма должна быть больше 5$',
  EMPTY_WITHDRAWAL_AMOUNT_INPUT: 'Сумма должна быть больше 10$',
  EMPTY_CURRENCY: 'Выберите валюту',
  EMPTY_NETWORK: 'Выберите сеть',
  EMPTY_WITHDRAWAL_INPUT: 'Введите адрес кошелька',
  WIN_TEXT: 'Вы выиграли',
  LOSE_TEXT: 'Вы проиграли',
  COPIED: 'Скопировано',
  TOOLTIP_COPY: 'Скопировать',
};

export const HEADER_DROPDOWN_OPTIONS = [
  { balance: 'mainBalance', title: 'Основной' },
  { balance: 'bonusBalance', title: 'Бонусный' }
];

export const BALANCE_BUTTONS = [
  { title: 'Основной баланс', balance: 'mainBalance', id: 1 },
  { title: 'Бонусный баланс', balance: 'bonusBalance', id: 2 },
];

export const iconTypes = {
  giftIcon: 'gift-icon',
  promocodeIcon: 'promocode-icon',
  supportIcon: 'support-icon',
  flagIcon: 'flag-icon'
};

export const USER_OPTIONS = [
  { title: 'Реферальная программа', icon: iconTypes.giftIcon, modalType: MODAL_TYPES.REFERAL },
  { title: 'Введите промокод', icon: iconTypes.promocodeIcon, modalType: MODAL_TYPES.PROMOCODE },
  { title: 'Поддержка', icon: iconTypes.supportIcon, modalType: MODAL_TYPES.SUPPORT },
  { title: 'Язык', icon: iconTypes.flagIcon, modalType: MODAL_TYPES.LANGUAGE },
];

export const CURRENCIESANDNETWORKS = { 'TON': ['TON'], 'ETH': ['BSC', 'ARBITRUM', 'ETH'],   'USDT': ['ARBITRUM', 'ETH', 'BSC', 'TRON', 'SOL', 'AVALANCHE', 'POLYGON'], 'TRX': ['TRON'],   'BTC': ['BTC'], 'LTC': ['LTC']}

export const CURRENCY = [
  { id: 1, label: 'USDT' },
  { id: 2, label: 'BTC' },
  { id: 3, label: 'MATIC' }
];

export const NETWORK = [
  { id: 1, label: 'TRC20' },
  { id: 2, label: 'ERC20' },
  { id: 3, label: 'USDT' }
];

export const REFILL_MODAL_TITLE = {
  CHOOSE_METHOD: 'Выберите платежный метод',
  REFILL: 'Пополнение баланса',
  SUCCESS: 'Оплата прошла!',
};

export const WITHDRAWAL_MODAL_TITLE = {
  CHOOSE_METHOD: 'Выберите платежный метод',
  REFILL: 'Вывод средств',
  SUCCESS: 'Вывод средств в обработке',
};

export const REFERAL_MODAL_TITLE = {
  TITLE: 'Реферальная программа',
};
export const PROMOCODE_MODAL_TITLE = {
  TITLE: 'Система промокодов',
};











////////////////////////// remove after connection to database
export const BETS = ['1.00', '2.00', '5.00', '1.25', '1.5', '1.8', '2.5', '3.00', '5.01', '1.27', '1.55', '1.85', '2.55'];

export const USER = {
  userName: 'userName',
  registration: '24.03.2024',
  avatar: '',
  bet: '1.25',
  id: '1',
  mainBalance: 100,
  bonusBalance: 0,
  invitationUrl: 'invite'
}

export const USERS = [
  { userName: 'userName1', avatar: '', bet: '1.25', id: '1', },
  { userName: 'userName2', avatar: '', bet: '1.26', id: '2', },
  { userName: 'userName3', avatar: '', bet: '1.27', id: '3', },
  { userName: 'userName4', avatar: '', bet: '1.28', id: '4', },
  { userName: 'userName5', avatar: '', bet: '1.29', id: '5', },
  { userName: 'userName6', avatar: '', bet: '1.30', id: '6', },
  { userName: 'userName6', avatar: '', bet: '1.31', id: '7', },
  { userName: 'userName6', avatar: '', bet: '1.32', id: '8', },
];


export const WIN_AMOUNT = 1000;
///////////////////////////////
