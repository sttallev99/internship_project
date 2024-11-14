import {validateInput, validateTime} from './utils.js';
import { client } from './api_client.js';
import {jest} from '@jest/globals'
 
describe('test for data validation', () => {
    let mockOne;
    let mockTwo;
    beforeEach(() => {
        console.log('test')
        mockOne = jest.spyOn(client, 'currencies');
        mockOne.mockReturnValue({
            "data": {
                "AED": {
                    "symbol": "AED",
                    "name": "United Arab Emirates Dirham",
                    "symbol_native": "د.إ",
                    "decimal_digits": 2,
                    "rounding": 0,
                    "code": "AED",
                    "name_plural": "UAE dirhams",
                    "type": "fiat",
                    "countries": [
                        "AE"
                    ]
                },
                "AFN": {
                    "symbol": "Af",
                    "name": "Afghan Afghani",
                    "symbol_native": "؋",
                    "decimal_digits": 0,
                    "rounding": 0,
                    "code": "AFN",
                    "name_plural": "Afghan Afghanis",
                    "type": "fiat",
                    "countries": [
                        "AF"
                    ]
                },
            }
        });
        mockTwo = jest.spyOn(client, 'historical')
        mockTwo.mockReturnValue({
            "meta": {
                "last_updated_at": "2022-01-01T23:59:59Z"
            },
            "data": {
                "AED": {
                    "code": "AED",
                    "value": 3.67306
                },
                "AFN": {
                    "code": "AFN",
                    "value": 91.80254
                },
                "ALL": {
                    "code": "ALL",
                    "value": 108.22904
                },
                "AMD": {
                    "code": "AMD",
                    "value": 480.41659
                },
            }
        })
    });
    afterEach(() => {
        mockOne.mockRestore();
        mockTwo.mockRestore();
    })
    // describe('test validateInput function', () => {
        test('should return array with currencies if all passed currencies are valid',async () => {
        let result = await validateInput('AED, AFN');
        expect(result).toEqual(['AED', 'AFN']);
        })
        test('should throw an error if we pass invalid currency', async() => {
        await expect(validateInput('TEST, AED')).rejects.toThrow('Currency type TEST do not exist')
        })
    // });
    // describe('test validateTime functionality', () => {
        test('should return original array if all the dates are in the past', () => {
        const result = validateTime(['2024-01-01', '2024-02-01']);
        expect(result).toEqual(['2024-01-01', '2024-02-01']);
        });
        test('should throw an error if array contains dates in the future', () => {
        expect(() => validateTime(['2025-01-01', '2023-01-01'])).toThrow('Please select dates in the past.');
        })
    // })
})

