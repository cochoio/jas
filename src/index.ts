interface String {
  checkPassword(): boolean;
  checkPhoneNumber(): boolean;
}

interface Number {
  toKorean(): string;
  toFormat(): string;
}

/**
 * 비밀번호를 체크합니다.
 *
 * 숫자, 문자, 특수문자가 8자 이상 포함되어야 합니다.
 * @returns {boolean}
 */
String.prototype.checkPassword = function (): boolean {
  var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return reg.test(this.toString());
};

/**
 * 휴대폰번호 유효성검사
 *
 * @returns {boolean}
 */
String.prototype.checkPhoneNumber = function (): boolean {
  const str = this.toString().replace(/(-)/g, "");
  return /(01[016789])(\d{3,4})(\d{4})/.test(str);
};

/**
 * 숫자를 한글로 치환합니다. (ex. 1234 -> 일천이백삼십사)
 *
 * 숫자만 허용됩니다.
 * @returns {String}
 */
Number.prototype.toKorean = function (): string {
  let result = "";
  const textSymbol = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const powerSymbol = ["", "십", "백", "천"];
  const dotSymbol = ["", "만", "억", "조", "경"];

  let inputArr = this.toString()
    .split("")
    .reverse()
    .map((numText) => parseInt(numText, 10));

  inputArr.forEach(function (element, index) {
    let subResult = "";
    if (element !== 0) {
      subResult = textSymbol[element] + powerSymbol[index % 4];
    }
    if (index % 4 === 0) {
      subResult += dotSymbol[index / 4];
    }
    result = subResult + result;
  });

  return result;
};

/**
 * 숫자를 포맷에 맞춰 ',' 표시합니다.  (ex. 123456 -> 123,456)
 *
 * 숫자만 허용됩니다.
 * @returns {String}
 */
Number.prototype.toFormat = function (): string {
  let result = "";

  let inputArr = this.toString().split("").reverse();

  inputArr.forEach(function (element, index) {
    let subResult = "";
    if (index !== 0 && index % 3 === 0) {
      subResult = element + ",";
    } else {
      subResult = element;
    }
    result = subResult + result;
  });

  return result;
};
