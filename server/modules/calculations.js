function calculation(calcObject) {
    if (calcObject.symbol === '+') {
        let total = Number(calcObject.first) + Number(calcObject.second);
        calcObject.total = total;
        calcObject.history = `${calcObject.first} ${calcObject.symbol} ${calcObject.second} = ${calcObject.total}`;
    }
    else if (calcObject.symbol === '-') {
        let total = Number(calcObject.first) - Number(calcObject.second);
        calcObject.total = total;
        calcObject.history = `${calcObject.first} ${calcObject.symbol} ${calcObject.second} = ${calcObject.total}`;

    }
    else if (calcObject.symbol === '*') {
        let total = Number(calcObject.first) * Number(calcObject.second);
        calcObject.total = total;
        calcObject.history = `${calcObject.first} ${calcObject.symbol} ${calcObject.second} = ${calcObject.total}`;

    }
    else if (calcObject.symbol === '/') {
        let total = Number(calcObject.first) / Number(calcObject.second);
        calcObject.total = total;
        calcObject.history = `${calcObject.first} ${calcObject.symbol} ${calcObject.second} = ${calcObject.total}`;
    }

    return calcObject;
}

module.exports = calculation;