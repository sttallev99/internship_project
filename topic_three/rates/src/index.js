import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import currencyapi from '@everapi/currencyapi-js';
import './style.css';

const calendarEl = document.querySelector('.calendar');
const formEl = document.querySelector('.currency-container');
const baseCurrencyImp = document.querySelector('.base-currency-inp');
const desiredCurrenciesImp = document.querySelector('.desired_currency-inp');
const ratesTableEl = document.querySelector('.rates-info-container');
let datesArr;
let baseCurrency;
let desiredCurrArr;


function showCalendar() {
    const options =  {
        settings: {
            selection: {
                day: 'multiple-ranged',
            },
        },
        actions: {
            clickDay(event, self) {
                datesArr = self.selectedDates;
            }
        }
    };

    const calendar = new VanillaCalendar('.calendar', options);
    calendar.init();
    return calendar;
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerHTML = message;
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerHTML = '';
}

export function validateInput(inp) {
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

function createTableHeader(desiredCurrArr) {
    let headerRow = document.createElement('tr');
    let dateCell = document.createElement('td');
    dateCell.innerHTML = 'date';
    headerRow.appendChild(dateCell);
    desiredCurrArr.forEach(curr => {
        let currNameCell = document.createElement('td');
        currNameCell.innerHTML = curr
        headerRow.appendChild(currNameCell);
    });

    return headerRow;
}

function createRow(date, currenciesData) {
    let tableRow = document.createElement('tr');
    let dateCellEl = document.createElement('td');
    dateCellEl.innerHTML = date;
    tableRow.appendChild(dateCellEl);
    for(const currency of Object.values(currenciesData)) {
        let currencyRateEl = document.createElement('td');
        currencyRateEl.innerHTML = currency.value.toFixed(2);
        tableRow.appendChild(currencyRateEl);

    }

    return tableRow;
}

let client = new currencyapi(process.env.API_TOKEN)
let allCurrencies = await client.currencies();
allCurrencies = Object.keys(allCurrencies.data);


formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        datesArr = validateTime(datesArr);
        setSuccess(calendarEl)
    } catch(err) {
        setError(calendarEl, err.message);
        return
    }
    try {
        baseCurrency = validateInput(baseCurrencyImp.value);
        setSuccess(baseCurrencyImp)
    } catch(err) {
        setError(baseCurrencyImp, err.message);
        return
    }
    try {
        desiredCurrArr = validateInput(desiredCurrenciesImp.value);
        setSuccess(desiredCurrenciesImp)
    } catch(err) {
        setError(desiredCurrenciesImp, err.message)
        return
    }
    ratesTableEl.innerHTML = '';
    const tableHeaderEl = createTableHeader(desiredCurrArr);
    ratesTableEl.appendChild(tableHeaderEl);

    const datesPromisify = datesArr.map(d => {
        return client.historical({
            date: d,
            base_currency: baseCurrency,
            currencies: desiredCurrArr
        })
    });

    const allPromises = Promise.all(datesPromisify);

    allPromises
    .then(result => {
        result.forEach(currRecord => {
            console.log(currRecord)
            const currDate = currRecord.meta.last_updated_at.split('T')[0];
            console.log(currDate)
            const currRow = createRow(currDate, currRecord.data)
            ratesTableEl.appendChild(currRow);
        })
    })
});


showCalendar();

