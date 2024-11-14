import { client } from './api_client';

const getCurrencies = async function() {
    let allCurrencies = await client.currencies();
    console.log(allCurrencies)
    return Object.keys(allCurrencies.data);
}

export async function validateInput(inp) {
    const allCurrencies = await getCurrencies();
    return inp.split(',').map(curr => {
        if(!allCurrencies.includes(curr.trim())) {
            throw new Error(`Currency type ${curr} do not exist`);
        } else {
            return curr.trim();
        }
    });
}

export function validateTime(timesArr) {
    const timeNow = new Date().getTime();

    timesArr.forEach(t => {
        const currTime = new Date(t).getTime();
        if(currTime > timeNow) {
            throw new Error('Please select dates in the past.')
        }
    });
    return timesArr
}
