const {task01_getMaxSubSum, task01_getMaxSubSum_NOT_OPTIMAZED, task02_search, task03_selection, task04_dateFormatter, task05_textFormatter, task06_stringCalculator, task07_arraySorter, task08_binaryConverter} = require('./tasks');
describe('all tests', () => {
    describe('First group of tests', () => {
        test('task_01', () => {
            const result = task01_getMaxSubSum([-1, 2, 3, 'test', 11]);
            expect(result).toBe(11);
        });
        test('task_01_not_optimized', () => {
            const result = task01_getMaxSubSum_NOT_OPTIMAZED([-1, 2, 3, 'test', 11]);
            expect(result).toBe(11)
        });
        test('task_02', () => {
            expect(task02_search([1, 2, 5, -1, 4, 6])).toMatch("Minimum value is: -1\nMaximum value is: 6\nMedian valie is: 2.83")
        });
        test('task_03', () => {
            expect(task03_selection([1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1])).toMatch('increasing sequence of maximum length is: 6');
        });
        
    });
    describe('task_04', () => {
        const dateParser = task04_dateFormatter();

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
        test('time ago functionality after invoce fromNow function', () => {
            const date = new dateParser('30102024', 'DDMMYYYY');
            expect(date.fromNow()).toContain('ago')
        });
        test('get warning message after pass future date to date object', () => {
            const date = new dateParser('10122024', 'DDMMYYYY');
            expect(date.fromNow()).toContain('Please do not use future dates.')
        })
    });

    describe('task_05', () => {
        test('get formated text when pass args to function like - (text, 40, 5, word wrap)', () => {
            text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            const result = task05_textFormatter(text, 40, 5, 'word wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the
printing and typesetting industry. Lorem
Ipsum has been the industry's standard
dummy text ever since the 1500s`)
        });
        test('get formated text when pass args to function like - (text, 40, 5, symbol wrap', () => {
            text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            const result = task05_textFormatter(text, 40, 5, 'symbol wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the 
printing and typesetting industry. Lorem
Ipsum has been the industry's standard 
dummy text ever since the 1500s`);
        });
        test('get formated text when pass args to function like - (text, 40, 5, sentance wrap', () => {
            text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'sentence wrap');
            expect(result).toMatch(`Lorem Ipsum is simply dummy text of the
printing and typesetting industry.
Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s`)
        });
        test('get formated text when pass args to function like - (text, 40, 5, sentance wrap', () => {
            text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'no wrap');
            expect(result).toMatch("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s")
        });
        test('get unformated input if we pass unexisting text formatting type', () => {
            text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            result = task05_textFormatter(text, 40, 5, 'test');
            expect(result).toMatch(text)
        })
    });

    describe('task_06', () => {
        test('expect (1.2 + 222) * 3 - (4 / 2) to be equal to 667.90', () => {
            const result = task06_stringCalculator();
            expect(result).toMatch('667.90');
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
