import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

import './style.css';
import {validateInput, validateTime} from './utils.js'
import { client } from './api_client.js';

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

let allCurrencies = await client.currencies();
console.log(allCurrencies)
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

