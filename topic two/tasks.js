//find a continuous subarray whose sum of elements is maximal. O(n)
function task01_getMaxSubSum(arr) {
    let maxSum = 0;
    let currSum = 0;

    for(let currNum of arr) {
        if(typeof(currNum) !== 'number') {
            currSum = 0
            continue;
        }
        currSum += currNum;
        
        if (currSum > maxSum) {
            maxSum = currSum;
        }

        if (currSum < 0) {
            currSum = 0;
        }
    }

    return maxSum;
}

//find a continuous subarray whose sum of elements is maximal. O(n * n)
function task01_getMaxSubSum_NOT_OPTIMAZED(arr) {
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let currSum = 0;
        if (typeof(arr[i]) != 'number') {
            continue;
        }
        for (let j = i; j < arr.length; j++) {
            currSum += arr[j];
            if (typeof(arr[j]) !== 'number') {
                currSum = 0
                continue;
            }
            maxSum = Math.max(maxSum, currSum);
        }
    }

    return maxSum;
}

//find the minimum, maximum, median value in an array.
function task02_search(arr) {
    let max_elem = Number.MIN_VALUE;
    let min_elem = Number.MAX_VALUE;
    let total_sum = 0;

    for (let curr_num of arr) {
        total_sum += curr_num;

        if(curr_num > max_elem) {
            max_elem = curr_num
        }

        if(curr_num < min_elem) {
            min_elem = curr_num
        }
    }

    median_value = (total_sum / arr.length).toFixed(2);

    return `Minimum value is: ${min_elem}\nMaximum value is: ${max_elem}\nMedian valie is: ${median_value}`
}

// searching for an increasing sequence of maximum length in the original array.
function task03_selection(arr) {
    let longest_seq_lenght = 0;
    let increasing_seq = [];

    for (let num of arr) {
        if(increasing_seq.length == 0) {
            increasing_seq.unshift(num);
        } else {
            if(num > increasing_seq[0]) {
                increasing_seq.unshift(num);
            } else {
                if (increasing_seq.length > longest_seq_lenght) {
                    longest_seq_lenght = increasing_seq.length;
                } else {
                    increasing_seq = []
                    increasing_seq.unshift(num)
                }
            }
        }
    }
    return`increasing sequence of maximum length is: ${Math.max(longest_seq_lenght, increasing_seq.length)}`;
}

function task04_dateFormatter() {
    class DateParser {
        #monthNames

        constructor(dateInp, inpFormat) {
            this.dateInp = dateInp;
            this.inpFormat = inpFormat;
            this.date = undefined;
            this.#monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'
            ]

            const createDate = (year, month, day) => new Date(year, month - 1, day);
            const getDateValues = () => {
                let year = this.date.getFullYear();
                let month = this.date.getMonth() + 1;
                let day = this.date.getDate();
                if (month < 10) {
                    month = `0${month}`
                }
                if (day < 10) {
                    day = `0${day}`
                }

                return {year, month, day}
            }
            
            this.dateFormarts = {
                'YYYYMMDD': () => {
                    if (this.date) {
                        const {year, month, day} = getDateValues();
                        return `${year}${month}${day}`;
                    } else {
                        const year = this.dateInp.slice(0, 4);
                        const month = this.dateInp.slice(4, 6);
                        const day = this.dateInp.slice(6);
                        this.date = createDate(year, month, day);
                    }
                },
                'YYYY-MM-DD': () => {
                    if (this.date) {
                        const {year, month, day} = getDateValues();
                        return `${year}-${month}-${day}`
                    } else {
                        const [year, month, day] = this.dateInp.split('-');
                        this.date = createDate(year, month, day);
                    }
                },
                'DDMMYYYY': () => {
                    if (this.date) {
                        const {year, month, day} = getDateValues();
                        return `${day}${month}${year}`;
                    } else {
                        const day = this.dateInp.slice(0, 2);
                        const month = this.dateInp.slice(2, 4);
                        const year = this.dateInp.slice(4);

                        this.date = createDate(year, month, day);
                    }
                },
                'Month D, Yr': () => {
                    if (this.date) {
                        let year = this.date.getFullYear();
                        let month = this.date.getMonth();
                        let day = this.date.getDate();

                        month = this.#monthNames[month];
                        if (day < 10) {
                            day = `0${day}`
                        }

                        return `${month} ${day}, ${year}`;

                    } else {
                        const [rest, year] = this.dateInp.split(', ');
                        const [month, day] = rest.split(' ');
                        let monthIndex = undefined

                        if (this.#monthNames.includes(month)) {
                            monthIndex = this.#monthNames.indexOf(month) + 1;
                        }

                        this.date = createDate(year, monthIndex, day);
                    }
                }
            }

            this.formatInput = function() {
                const inpType = typeof(this.dateInp);
            
                if(inpType != 'string' && inpType != 'number') {
                    console.log('Incorect date type please use valid date.');
                    return;
                } else {
                    if (inpType === 'string') {
                        if (this.dateFormarts.hasOwnProperty(this.inpFormat)) {
                            this.dateFormarts[this.inpFormat]();
                        } else {
                            throw new Error(`Incorect format type: Please check valid format types [${Object.keys(this.dateFormarts)}]`)
                        }
                    } else if(inpType === 'number') {
                        this.date = new Date(this.dateInp);
                    }
                }

                
            }
            try {
                this.formatInput();
            } catch(err) {
                return err
            }
        }


        format(outputFormat) {
            if(this.dateFormarts.hasOwnProperty(outputFormat)) {
                return this.dateFormarts[outputFormat]();
            } else {
                console.log(`Incorect format type: Please check valid format types [${Object.keys(this.dateFormarts)}]`)
            }
        }

        fromNow() {
            const oldDate = this.date
            const currentDate = new Date();
            const oneDay = 1000 * 60 * 60 * 24;
            const oneHour = 1000 * 60 * 60

            let resultInDays = Math.floor((currentDate.getTime() - oldDate.getTime()) / oneDay);
            let resultInHours = Math.floor((currentDate.getTime() - oldDate.getTime()) / oneHour);
            if (resultInDays < 0) {
                return 'Please do not use future dates.'
            }

            if (resultInDays >= 365) {
                const years = currentDate.getFullYear() - oldDate.getFullYear();
                return`${years} year${years > 1 ? 's' : ''} ago`;
            } else if (resultInDays >= 31) {
                const months = currentDate.getMonth() - oldDate.getMonth();
                return`${months} month${months > 1 ? 's' : ''} ago`;
            } else if (resultInDays <= 31) {
                if (resultInDays == 0) {
                    return`${resultInHours} hour${resultInHours > 1 ? 's' : ''} ago`;
                }
                return`${resultInDays} day${resultInDays > 1 ? 's' : ''} ago`;
            }
        }
    }
    return DateParser;
}

function task05_textFormatter(input, maxLineSize = Infinity, maxNewLines = Infinity, formatType = 'word wrap') {
    
    switch (formatType) {
        case 'word wrap':
            return wordWrap(input, maxLineSize);
        case 'symbol wrap':
            return symbolWrap(input, maxLineSize);
        case 'sentence wrap':
            return sentanceWrap(input, maxLineSize);
        case 'no wrap':
            return input;
        default:
            return input;
    }

    function getLines(text) {
        if(maxNewLines != Infinity) {
            const lines = text.split('\n').slice(0, maxNewLines);
            return lines.join('\n');
        } else {
            return text
        }
    }

    function wordWrap(text, maxLineSize) {
        const words = text.split(' ');
        let wrappedText = '';
        let currentLine = '';

        words.forEach(word => {
            if (currentLine.length + word.length + 1 > maxLineSize) {
                wrappedText += currentLine.trim() + '\n';
                currentLine = ''
            }
            currentLine += (currentLine.length ? ' ' : '') + word;
        });

        wrappedText += currentLine.trim();
        return getLines(wrappedText);
    }

    function symbolWrap(text, maxLineSize) {
        words = text.split(' ');
        wrappedText = "";
        currentLine = "";

        words.forEach(word => {

            if (currentLine.length + word.length + 1 > maxLineSize) {
                let leftSpace = maxLineSize - currentLine.length;
                
                if(leftSpace == 0) {
                    wrappedText += currentLine + "\n"
                    currentLine = "";
                } else if(leftSpace <= 2) {
                    wrappedText += currentLine + " \n";
                    currentLine = "";
                } else {
                    word_symbols_old_line = word.slice(0, leftSpace - 2)
                    word_symbold_new_line = word.slice(leftSpace - 2)
                    wrappedText += currentLine + ` ${word_symbols_old_line}-\n`;
                    currentLine = `${word_symbold_new_line}`
                }
            }
            currentLine += (currentLine.length ? " " : "") + word
        });

        wrappedText += currentLine.trim();
        return getLines(wrappedText);
    }

    function sentanceWrap(text, maxLineSize) {
        sentances = text.split(/(?<=[.!?])\s+/);
        let wrappedText = '';

        sentances.forEach(sentance => {
            wrappedText += wordWrap(sentance, maxLineSize) + '\n';
        });

        return getLines(wrappedText.trim());
    }
}

function task06_stringCalculator() {
    const Calculator = {
        calculateExpression: function(expression) {
            const tokens = this.tokenize(expression);
            const postfix = this.infixToPostfix(tokens);
            return this.evaluatePostfix(postfix).toString();
        },
    
        tokenize: function(expression) {
            const regex = /\s*([\+\-\*\/\(\)]|[0-9]*\.?[0-9]+)\s*/g;
            const tokens = [];
            let match;
            while ((match = regex.exec(expression)) !== null) {
                tokens.push(match[1]);
            }
            return tokens;
        },
    
        infixToPostfix: function(tokens) {
            const output = [];
            const operators = [];
            
            const precedence = (op) => {
                if (op === '+' || op === '-') return 1;
                if (op === '*' || op === '/') return 2;
                return 0;
            };
    
            for (const token of tokens) {
                if (!isNaN(token)) {
                    output.push(parseFloat(token));
                } else if (token === '(') {
                    operators.push(token);
                } else if (token === ')') {
                    while (operators.length && operators[operators.length - 1] !== '(') {
                        output.push(operators.pop());
                    }
                    operators.pop();
                } else if (this.isOperator(token)) {
                    while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
                        output.push(operators.pop());
                    }
                    operators.push(token);
                }
            }
    
            while (operators.length) {
                output.push(operators.pop());
            }
    
            return output;
        },
    
        evaluatePostfix: function(postfix) {
            const stack = [];
    
            for (const token of postfix) {
                if (typeof token === 'number') {
                    stack.push(token);
                } else if (this.isOperator(token)) {
                    const b = stack.pop();
                    const a = stack.pop();
                    switch (token) {
                        case '+':
                            stack.push(a + b);
                            break;
                        case '-':
                            stack.push(a - b);
                            break;
                        case '*':
                            stack.push(a * b);
                            break;
                        case '/':
                            if (b === 0) throw new Error("Division by zero is not allowed.");
                            stack.push(a / b);
                            break;
                    }
                }
            }
    
            return (stack.pop()).toFixed(2);
        },
    
        isOperator: function(token) {
            return ['+', '-', '*', '/'].includes(token);
        }
    };
    
    try {
        const result = Calculator.calculateExpression("(1.3 + 222) * 3 - (4 / 2)");
        console.log(result)
        return result; 
    } catch (error) {
        console.error(error.message);
    }
    
}

function task07_arraySorter() {
    const sorter = {
        selectionSort: (arr) => {
            for(let i = 0; i < arr.length - 1; i++) {
                min_idx = i;

                for(let j = i + 1; j < arr.length; j++) {
                    if(arr[j] < arr[min_idx]) {
                        min_idx = j
                    }
                }

                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]]
            }

            return arr;
        },

        bubbleSort: (arr) => {
            let swapped;
            for(let i = 0; i < arr.length - 1; i++) {
                swapped = false;

                for(let j = 0; j < arr.length - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        swapped = true;
                    }
                }

                if (!swapped) {
                    break;
                }
            }

            return arr;
        },

        insertionSort: (arr) => {
            for (let i = 1; i < arr.length; i++) {
                let currentNum = arr[i];
                let j = i - 1;

                while (j >= 0 && arr[j] > currentNum) {
                    arr[j + 1] = arr[j];
                    j -= 1;
                }

                arr[j + 1] = currentNum;
            }
            return arr
        },
        quickSort: function(arr) {

            if (arr.length <= 1) {
                return arr;
            }

            let pivot = arr[0];
            let left = [];
            let right = [];

            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }

            return [...this.quickSort(left), pivot, ...this.quickSort(right)]
        }
    }

    return sorter;
}

function task08_binaryConverter() {
    const binaryConverter = {
        converte: (inp, outputNumSystem) => {
            return BigInt(inp).toString(outputNumSystem);
        }
    }
    const test = binaryConverter.converte(90071992547409913333n, 2)
    console.log(test)
    return binaryConverter;
}


module.exports = {
    task01_getMaxSubSum,
    task01_getMaxSubSum_NOT_OPTIMAZED,
    task02_search,
    task03_selection,
    task04_dateFormatter,
    task05_textFormatter,
    task06_stringCalculator,
    task07_arraySorter,
    task08_binaryConverter
}
