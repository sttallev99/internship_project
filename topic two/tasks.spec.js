const {task01_getMaxSubSum, task01_getMaxSubSum_NOT_OPTIMAZED, task02_search, task03_selection, task04_dateFormatter, task05_textFormatter, task06_stringCalculator, task07_arraySorter, task08_binaryConverter} = require('./tasks');
describe('all tests', () => {
    describe('task_01', () => {
        test('should return 11 after invoce function with given parameter: [-1, 2, 3, \'test\', 11]', () => {
            const result = task01_getMaxSubSum([-1, 2, 3, 'test', 11]);
            expect(result).toBe(11);
        })
    });

    describe('task_01_not_optimized', () => {
        test('should return 11 after invoce function with given parameter: [-1, 2, 3, \'test\', 11]', () => {
            const result = task01_getMaxSubSum_NOT_OPTIMAZED([-1, 2, 3, 'test', 11]);
            expect(result).toBe(11);
        })
    });

    describe('task_02', () => {
        test('should return -1 for min value, 6 for max value and 2.82 for median value after invoce a function with given parameter: [1, 2, 5, -1, 4, 6]', () => {
            expect(task02_search([1, 2, 5, -1, 4, 6])).toMatch("Minimum value is: -1\nMaximum value is: 6\nMedian valie is: 2.83")
        })
    })

    describe('task_03', () => {
        test('should return 6 when invoce function with giver parameter: [1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1]', () => {
            expect(task03_selection([1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1])).toMatch('increasing sequence of maximum length is: 6');
        });
        
    });

    describe('task_04', () => {
        const dateParser = task04_dateFormatter();

        function getTestDate(daysCount) {    
            const currDate = new Date();    
            const currDateInMs = currDate.valueOf();    
            const days15InMs = daysCount * 24 * 60 * 60 * 1000;    
            const days15Ago = new Date(currDateInMs - days15InMs);    
            const monthsStr = (days15Ago.getMonth() + 1).toString().padStart(2, '0');    
            const dayStr = days15Ago.getDate().toString().padStart(2, '0');    
            const yearStr = days15Ago.getFullYear().toString();        
            return `${dayStr}${monthsStr}${yearStr}`;
        }

        test('Object is instance of DateParser class', () => {
            const date = new dateParser();
          expect(date).toBeInstanceOf(dateParser)
        });
        test('create date in specific date format - YYYYMMDD', () => {
            const date = new dateParser('20241030', 'YYYYMMDD');
            expect(date).toBeInstanceOf(dateParser);
        });
        test('create date in specific date format - YYYY-MM-DD', () => {
            const date = new dateParser('2024-10-30', 'YYYY-MM-DD');
            expect(date).toBeInstanceOf(dateParser);
        });
        test('create date in specific date format - Month D, Yrr', () => {
            const date = new dateParser('October 30, 2024', 'Month D, Yr');
            expect(date).toBeInstanceOf(dateParser);
        });
        test('create date from miliseconds', () => {
            const date = new dateParser(1730386989098, 'YYYY-MM-DD');
            expect(date).toBeInstanceOf(dateParser);
        })
        test('throw error when create dateParser object with wrong data type', () => {
            const date = new dateParser('30102024', 'DDMMYYYYY');
            expect(typeof(date) instanceof dateParser).toBe(false)
        });
        test('change date format to specific YYYYMMDD', () => {
            const date = new dateParser('08012024', 'DDMMYYYY');
            const output = date.format('YYYYMMDD');
            expect(output).toMatch('20240108');
        });
        test('change date format to specific YYYY-MM-DD', () => {
            const date = new dateParser('08012024', 'DDMMYYYY');
            const output = date.format('YYYY-MM-DD');
            expect(output).toMatch('2024-01-08');
        });
        test('change date format to specific DDMMYYYY', () => {
            const date = new dateParser('20240108', 'YYYYMMDD');
            const output = date.format('DDMMYYYY');
            expect(output).toMatch('08012024');
        });
        test('change date format to specific Month D, Yr', () => {
            const date = new dateParser('20240108', 'YYYYMMDD');
            const output = date.format('Month D, Yr');
            expect(output).toMatch('January 08, 2024');
        });
        test('throw error when try to format date object with unexisting format', () => {
            const date = new dateParser('30102024', 'DDMMYYYY');
            const output = date.format('Month D, Yrr');
            expect(output).toBe(undefined);
        });
        test('expect to see "1 year ago" after invoce fromNow method with a date which is one year back from current date', () => {
            const date = new dateParser(getTestDate(365), 'DDMMYYYY');
            console.log(date.fromNow())
            expect(date.fromNow()).toEqual('1 year ago')
        });
        test('expect to see "2 years ago" after invoce fromNow method with a date which is two year back from current date', () => {
            const date = new dateParser(getTestDate(730), 'DDMMYYYY');
            expect(date.fromNow()).toEqual('2 years ago')
        });
        test('expect to see "1 month ago" after invoce fromNow method with a date which is one month back from current date', () => {
            const date = new dateParser(getTestDate(31), 'DDMMYYYY');
            expect(date.fromNow()).toEqual('1 month ago')
        });
        test('expect to see "2 months ago" after invoce fromNow method with a date which is two months back from current date', () => {
            const date = new dateParser(getTestDate(31), 'DDMMYYYY');
            expect(date.fromNow()).toEqual('1 month ago')
        });
        test('expect to see "1 day ago" after invoce fromNow method with a date which is one day back from current date', () => {
            const date = new dateParser(getTestDate(1), 'DDMMYYYY');
            expect(date.fromNow()).toEqual('1 day ago')
        });
        test('expect to see "22 days ago" after invoce fromNow method with a date which is 22 days back from current date', () => {
            const date = new dateParser(getTestDate(22), 'DDMMYYYY');
            expect(date.fromNow()).toEqual('22 days ago')
        });
        test('expect to see "1 hour ago" after invoce fromNow method with a date which is 1 hour back from current date', () => {
            const date = new dateParser(getTestDate(0), 'DDMMYYYY');
            currentHours = new Date().getHours();
            date.date.setHours(currentHours - 1)
            expect(date.fromNow()).toEqual('1 hour ago')
        });
        test('expect to see "2 hours ago" after invoce fromNow method with a date which is 2 hours back from current date', () => {
            const date = new dateParser(getTestDate(0), 'DDMMYYYY');
            currentHours = new Date().getHours();
            date.date.setHours(currentHours - 2)
            expect(date.fromNow()).toEqual('2 hours ago')
        });
        test('get warning message after pass future date to date object', () => {
            const date = new dateParser('10122024', 'DDMMYYYY');
            expect(date.fromNow()).toContain('Please do not use future dates.')
        });
    });

    describe('task_05', () => {
        test('if it is a function', () => {
            const formater = task05_textFormatter;
            expect(typeof formater).toBe('function')
        })
        test('get formated text when pass args to function like - (text, 40, 5, word wrap)', () => {
            let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            const result = task05_textFormatter(text, 40, 5, 'word wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the
printing and typesetting industry. Lorem
Ipsum has been the industry's standard
dummy text ever since the 1500s`)
        });
        test('get formated text when pass args to function like - (text, 40, 5, symbol wrap', () => {
            const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            const result = task05_textFormatter(text, 40, Infinity, 'symbol wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the \nprinting and typesetting industry. Lorem\nIpsum has been the industry's standard \ndummy text ever since the 1500s`);
        });
        test('get formated text when pass args to function like - (text, 40, 5, sentance wrap', () => {
            let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'sentence wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the
printing and typesetting industry.
Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s`)
        });
        test('get formated text when pass args to function like - (text, 40, 5, sentance wrap', () => {
            let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'no wrap');
            expect(result).toMatch("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s")
        });
        test('get unformated input if we pass unexisting text formatting type', () => {
            let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'test');
            expect(result).toMatch(text)
        })
    });

    describe('task_06', () => {
        test('expect (1.2 + 222) * 3 - (4 / 2) to be equal to 667.90', () => {
            const Calculator = task06_stringCalculator();
            let result;
            try {
                result = Calculator.calculateExpression("(1.3 + 222) * 3 - (4 / 2)");
            } catch (error) {
                return error.message;
            }
            expect(result).toMatch('667.90');
        });
        test('should throw an error if we divide by zero', () => {
            const Calculator = task06_stringCalculator();
            let result;
            try {
                result = Calculator.calculateExpression("(1.3 + 222) * 3 - (4 / 0)");
                console.log(result)
                return result; 
            } catch (error) {
                result = error.message;
            }
            expect(result).toEqual('Division by zero is not allowed.');
        });

    });

    describe('task_07', () => {
        test('use selection sort to sort an a array [5, 2, 6, 1]', () => {
            const sorter = task07_arraySorter();
            const sortedArray = sorter.selectionSort([5, 2, 6, 1])
            expect(sortedArray).toMatchObject([1, 2, 5, 6])
        });
        test('use bubble sort to sort an a array [5, 2, 6, 1]', () => {
            const sorter = task07_arraySorter();
            const sortedArray = sorter.bubbleSort([5, 2, 6, 1])
            expect(sortedArray).toMatchObject([1, 2, 5, 6])
        });
        test('use bubble sort to sort an a array [1, 2, 5, 6]', () => {
            const sorter = task07_arraySorter();
            const sortedArray = sorter.bubbleSort([1, 2, 5, 6])
            expect(sortedArray).toMatchObject([1, 2, 5, 6])
        });
        test('use insertion sort to sort an a array [5, 2, 6, 1]', () => {
            const sorter = task07_arraySorter();
            const sortedArray = sorter.insertionSort([5, 2, 6, 1])
            expect(sortedArray).toMatchObject([1, 2, 5, 6])
        });
        test('use quick sort to sort an a array [5, 2, 6, 1]', () => {
            const sorter = task07_arraySorter();
            const sortedArray = sorter.quickSort([5, 2, 6, 1])
            expect(sortedArray).toMatchObject([1, 2, 5, 6])
        });
    });

    describe('task_08', () => {
        test('converte decimal to binary', () => {
            const converter = task08_binaryConverter();
            const result = converter.converte(90071992547409913333n, 2);
            expect(result).toMatch('1001110000111111111111111111111111111111111111111111110010111110101');
        })
    })
    
    
})
