import currencyapi from '@everapi/currencyapi-js';

export let client = new currencyapi(process.env.API_TOKEN);
