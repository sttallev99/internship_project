export function getPaginationItems(
    currentPage: number,
    lastPage: number,
    maxLength: number
) {
    const res: number[] = [];
    if(lastPage <= maxLength) {
        for(let i = 1; i <= lastPage; i++) {
            res.push(i);
        }
    } else {
        const firstPage = 1;
        const confirmedPagesCount = 3;
        const deductedMaxLength = maxLength - confirmedPagesCount;
        const sideLength = deductedMaxLength / 2;

        if(currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
            for(let i = 1; i <= firstPage + sideLength; i++) {
                res.push(i)
            }

            res.push(NaN)

            for(let i = lastPage - sideLength; i <= lastPage; i++) {
                res.push(i);
            }
        } else if(currentPage - firstPage >= deductedMaxLength && lastPage - currentPage >= deductedMaxLength) {
            const deductedSideLength = sideLength - 1;
            res.push(firstPage)
            res.push(NaN);

            for(let i = currentPage - deductedSideLength; i <= currentPage + deductedSideLength; i++) {
                res.push(i);
            }

            res.push(NaN);
            res.push(lastPage);
        } else {
            const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
            let remainingLength = maxLength;

            if(isNearFirstPage) {
                for(let i = 1; i <= currentPage + 1; i++) {
                    res.push(i);
                    remainingLength -= 1;
                }
                res.push(NaN);
                remainingLength -= 1;

                for(let i = lastPage - (remainingLength - 1); i <= lastPage; i++) {
                    res.push(i);
                }
            } else {
                for (let i = lastPage; i >= currentPage - 1; i--) {
                    res.unshift(i)
                    remainingLength -= 1
                }

                res.unshift(NaN);
                remainingLength -= 1;

                for(let i = remainingLength; i >= 1; i--) {
                    res.unshift(i);
                }
            }

        }
    }
    return res;
}

// console.log(getPaginationItems(1, 5, 7)) // [1, 2, 3, 4, 5]
// console.log(getPaginationItems(5, 7, 7)) // [1, 2, 3, 4, 5, 6, 7]
// console.log(getPaginationItems(1, 10, 7)) //[1, 2, 3, NaN, 8, 9, 10]
// console.log(getPaginationItems(2, 10, 7)) //[1, 2, 3, NaN, 8, 9, 10]
// console.log(getPaginationItems(9, 10, 7)) //[1, 2, 3, NaN, 8, 9, 10]
// console.log(getPaginationItems(10, 10, 7)) //[1, 2, 3, NaN, 8, 9, 10]
// console.log(getPaginationItems(5, 10, 7)) //[1, NaN, 4, 5, 6, NaN, 10]
// console.log(getPaginationItems(6, 10, 7)) //[1, NaN, 5, 6, 7, NaN, 10]
// console.log(getPaginationItems(3, 10, 7)) //[1, 2, 3, 4, NaN, 9, 10]
// console.log(getPaginationItems(4, 10, 7)) //[1, 2, 3, 4, 5, NaN, 10]
// console.log(getPaginationItems(7, 10, 7)) //[1, NaN, 6, 7, 8, 9, 10]
// console.log(getPaginationItems(8, 10, 7)) //[1, 2, NaN, 7, 8, 9, 10]
