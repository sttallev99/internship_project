import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import currencyapi from '@everapi/currencyapi-js';
import './style.css';

let datesArr;

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

    const calendar = new VanillaCalendar('.calendar-container', options);
    calendar.init();
    return calendar;
}

function validateCurrency(inp) {
    return inp.split(',').map(curr => {
        if(!allCurrencies.includes(curr.trim())) {
            throw new Error(`Currency type ${curr} do not exist`);
        } else {
            return curr.trim();
        }
    });
}

function handleBaseCurrencyInp(event) {
    if(!baseCurrInfoTextEl.classList.contains('hidden')) {
        baseCurrInfoTextEl.classList.add('hidden');
    }
    
    try {
        validateCurrency(event.target.value);
        baseCurrency = event.target.value;
    } catch(e) {
        baseCurrInfoTextEl.classList.remove('hidden')
    }
}

function handleDesiredCurrenciesInp(event) {
    try {
        desiredCurrArr = validateCurrency(event.target.value);
        desiredCurrInfoTextEl.innerHTML = 'Please select one or more cyrencies separeted with coma.'
    }catch(err) {
        desiredCurrInfoTextEl.innerHTML = err.message;
    }
}

function handleInpValues(event) {
    if(event.target.classList.contains('base-currency-inp')){
        handleBaseCurrencyInp(event);
    }else if(event.target.classList.contains('desired_currency-inp')) {
        handleDesiredCurrenciesInp(event);
    }
}

function createTableHeader(desiredCurrArr) {
    console.log(desiredCurrArr)
    let headerRow = document.createElement('tr');
    let dateCell = document.createElement('td');
    dateCell.innerHTML = 'date';
    headerRow.appendChild(dateCell);
    console.log(headerRow)
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

const client = new currencyapi('cur_live_pro1rckdb5h6OaQgFOsg4Kmdz3baJPtYcPfnM4O0')
let allCurrencies = await client.currencies();
allCurrencies = Object.keys(allCurrencies.data);

const inputElArr = document.querySelectorAll('.currency-inp');
const baseCurrInfoTextEl = document.querySelector('.base-currency-info-text');
const desiredCurrInfoTextEl = document.querySelector('.desired-curencies-info-text');
const actionBtnEl = document.querySelector('.main-btn');
const ratesTableEl = document.querySelector('.rates-info-container');
let baseCurrency;
let desiredCurrArr;



inputElArr.forEach(el => el.addEventListener('blur', handleInpValues))

inputElArr[0].addEventListener('focus', (e) => {
    e.target.value = '';
});

actionBtnEl.addEventListener('click', () => {
    const tableHeaderEl = createTableHeader(desiredCurrArr);
    ratesTableEl.appendChild(tableHeaderEl);

    datesArr.forEach(currDate => {
        client.historical({
            date: currDate,
            base_currency: baseCurrency,
            currencies: desiredCurrArr
        }).then(response => {
            let currRow = createRow(currDate, response.data)
            ratesTableEl.appendChild(currRow);
        });
    })
});


showCalendar();

module.exports = {
    showCalendar
}
