function memoize(func) {
    const cache = {}
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.hasOwnProperty(func.name)) {
            if (cache[func.name][key]) {
                return cache[func.name][key]
            } else {
                const result = func.apply(this, args);
                return cache[func.name][key] = result;
            }
        } else {
            const result = func.apply(this, args);
            cache[func.name] = {[key]: result}
            return cache[func.name][key];
        }
    }
}

function factorial(n) {
    if (n === 0) {
        return 1;
    }

    return n * factorial(n - 1);
}

function sumNums(a, b) {
    return a + b;
}


const memoizedFactorial = memoize(factorial);
const memoizedSumNums = memoize(sumNums);

const buttonElement = document.querySelector('button');
const firstNumElement = document.querySelector('.first-num');
const secondNumElement = document.querySelector('.second-num');
const resultContainer = document.querySelector('.result');

buttonElement.addEventListener('click', (e) => {
    const firstNum = Number(firstNumElement.value);
    const secondNum = Number(secondNumElement.value);

    const result = memoizedSumNums(firstNum, secondNum);

    resultContainer.textContent = result;
});
