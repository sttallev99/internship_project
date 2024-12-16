export function getPaginationItems(currentPage, lastPage, maxLength) {
    const res = [];
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
