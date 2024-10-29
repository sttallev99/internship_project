//find a continuous subarray whose sum of elements is maximal. O(n)
function task01_getMaxSubSum(arr) {
    let maxSum = 0;
    let currSum = 0;

    for(let currNum of arr) {
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
        for (let j = i; j < arr.length; j++) {
            currSum += arr[j];
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

    median_value = total_sum / arr.length;

    console.log(`
        Minimum value is: ${min_elem}
        Maximum value is: ${max_elem}
        Median valie is: ${median_value}
    `)
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
                }
                increasing_seq = []
                increasing_seq.unshift(num)
            }
        }
    }
    console.log(`increasing sequence of maximum length is: ${Math.max(longest_seq_lenght, increasing_seq.length)}`);
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
            const validateData = (month, day) => {
                month = Number(month);
                day = Number(day);
                if((month < 1 || month > 12) || (day < 1 || day > 31)) {
                    return {success: false, message: 'Invalid day or month'}
                }
                else {
                    return {success: true, message: ''}
                }
            }
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
                        const {success, message} = validateData(month, day);
                        if(!success) {
                            console.log(message);
                            return;
                        }
                        this.date = createDate(year, month, day);
                    }
                },
                'YYYY-MM-DD': () => {
                    if (this.date) {
                        const {year, month, day} = getDateValues();
                        return `${year}-${month}-${day}`
                    } else {
                        const [year, month, day] = this.dateInp.split('-');
                        const {success, message} = validateData(month, day);

                        if(!success) {
                            console.log(message);
                            return;
                        }

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
                        const {success, message} = validateData(month, day);
                        if (!success) {
                            console.log(message);
                            return
                        }

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

                        const {success, message} = validateData(monthIndex, day);

                        if (!success) {
                            console.log(message);
                            return;
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
                        if(dateInp.length < 8) {
                            console.log('Incorect date length please use valid date.');
                            return
                        }

                        if (this.dateFormarts.hasOwnProperty(this.inpFormat)) {
                            this.dateFormarts[this.inpFormat]();
                        } else {
                            console.log(`Incorect format type: Please check valid format types [${Object.keys(dateFormarts)}]`)
                        }
                    } else if(inpType === 'number') {
                        this.date = new Date(this.dateInp);
                    }
                }

                
            }
            
            this.formatInput();
        }


        format(outputFormat) {
            if(this.dateFormarts.hasOwnProperty(outputFormat)) {
                return this.dateFormarts[outputFormat]();
            } else {
                console.log(`Incorect format type: Please check valid format types [${Object.keys(dateFormarts)}]`)
            }
        }

        fromNow() {
            const oldDate = this.date
            const currentDate = new Date();
            const oneDay = 1000 * 60 * 60 * 24;
            const oneHour = 1000 * 60 * 60

            let resultInDays = Math.round((currentDate.getTime() - oldDate.getTime()) / oneDay);

            if (resultInDays >= 365) {
                const years = currentDate.getFullYear() - oldDate.getFullYear();
                console.log(`${years} year${years > 1 ? 's' : ''} ago`);
            } else if (resultInDays >= 31) {
                const months = currentDate.getMonth() - oldDate.getMonth();
                console.log(`${months} month${months > 1 ? 's' : ''} ago`);
            } else if (resultInDays <= 31) {
                console.log(`${resultInDays} day${resultInDays > 1 ? 's' : ''} ago`)
            }
        }
    }

    const test = new DateParser('30102024', 'DDMMYYYY');
    const output = test.format('Month D, Yr');
    console.log(output);
    test.fromNow()
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
    
            return stack.pop();
        },
    
        isOperator: function(token) {
            return ['+', '-', '*', '/'].includes(token);
        }
    };
    
    try {
        console.log(Calculator.calculateExpression("(1 + 2) * 3 - (4 / 2)")); 
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
            console.log(arr)
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

    const result = sorter.quickSort([5, 6, 1, 3]);
    console.log(result)
}

function task08_binaryConverter() {
    const binaryConverter = {
        converte: (inp, outputNumSystem) => {
            if (typeof(inp) === 'string') {
                return parseInt(inp, outputNumSystem);
            } else if (typeof(inp) == 'number') {
                return inp.toString(outputNumSystem);
            }
        }
    }

    const result = binaryConverter.converte("1010", 2);
    console.log(result)
}


// const formatedText = task05_textFormatter("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", 40, 4, 'sentence wrap');
// console.log(formatedText)

// task06_stringCalculator()

task08_binaryConverter()
