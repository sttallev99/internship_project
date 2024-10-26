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
    longest_seq_lenght = 0;
    increasing_seq = [];

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
    console.log(`increasing sequence of maximum length is: ${longest_seq_lenght}`);
}

function task04_dateFormatter(inp) {
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
                if((month < 1 || month > 11) || (day < 1 || day > 31)) {
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

    const test = new DateParser('01102024', 'DDMMYYYY');
    const output = test.format('Month D, Yr');
    console.log(output);
    test.fromNow()
}


task04_dateFormatter()


