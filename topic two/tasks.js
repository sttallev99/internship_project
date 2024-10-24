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

task03_selection([1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1]);


