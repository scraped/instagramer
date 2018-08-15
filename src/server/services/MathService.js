const Decimal = require('decimal.js');


function parseDecimalNumber(number) {
    if ((typeof number) === 'string') {
        return parseFloat(number);
    } else {
        return number;
    }
}


function add(...numbers) {
    if (numbers && numbers.length > 0) {
        return numbers.reduce((prevNumber, current) => {
            let number = parseDecimalNumber(current);
            return prevNumber.plus(new Decimal(number));
        }, new Decimal(0)).toNumber();
    } else {
        throw new Error('There are no numbers have been specified.');
    }
}


function subtract(...numbers) {
    if (numbers && numbers.length > 0) {
        return numbers.reduce((prev, current, index) => {
            let number = parseDecimalNumber(current);
            let prevNumber = (index - 1) && prev || new Decimal(prev);
            return prevNumber.minus(new Decimal(number));
        }).toNumber();
    } else {
        throw new Error('There are no numbers have been specified.');
    }
}


function multiply(...numbers) {
    if (numbers && numbers.length > 0) {
        return numbers.reduce((prevNumber, current) => {
            let number = parseDecimalNumber(current);
            return prevNumber.mul(new Decimal(number));
        }, new Decimal(1)).toNumber();
    } else {
        throw new Error('There are no numbers have been specified.');
    }
}


function divide(...numbers) {
    if (numbers && numbers.length > 0) {
        return numbers.reduce((prev, current, index) => {
            let number = parseDecimalNumber(current);
            let prevNumber = (index - 1) && prev || new Decimal(prev);
            return prevNumber.dividedBy(new Decimal(number));
        }).toNumber();
    } else {
        throw new Error('There are no numbers have been specified.');
    }
}


module.exports.add = add;
module.exports.subtract = subtract;
module.exports.multiply = multiply;
module.exports.divide = divide;
