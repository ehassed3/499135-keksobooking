'use strict';

var USER_ADDRESS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

var getNumberAddress = function (arrNumbers) {
  return '0' + arrNumbers.splice(0, 1)[0];
};

var ads = [
  {
    'author': {
      'avatar': 'img/avatars/user' + getNumberAddress(USER_ADDRESS_NUMBERS)
    }
  }
];
