import { render, screen, fireEvent, queryByTestId, } from "../../test-utils";
import '@testing-library/jest-dom';
import SortMenu from "./SortMenu";

interface Props {
    filterOption: string,
    setFilterOption: () => void,
}

describe('SorrMenu component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('sort posts dropdown should be visible', () => {
        const mockSetFilterOption = jest.fn();
        render(<SortMenu filterOption="" setFilterOption={mockSetFilterOption}/>)
        const dropDownHeader = screen.getByTestId('dropdown-header');
        expect(dropDownHeader.childNodes).toHaveLength(2);
    });
    test('open dropdown when click and close it', () => {
        const mockSetFilterOption = jest.fn();
        render(<SortMenu filterOption="" setFilterOption={mockSetFilterOption}/>)
        const dropDownHeader = screen.getByTestId('dropdown-header');
        const dropdownContainer = screen.getByTestId('dropdown-container'); 

        fireEvent.click(dropDownHeader);
        expect(dropdownContainer).toHaveClass('show');

        fireEvent.click(dropDownHeader);
        expect(dropdownContainer).not.toHaveClass('show');
    });
    test('dropdown shoud contain 4 options', () => {
        const mockSetFilterOption = jest.fn();
        render(<SortMenu filterOption="" setFilterOption={mockSetFilterOption}/>);
        const dropdownContainer = screen.getByTestId('dropdown-container');
        expect(dropdownContainer.childNodes[0].childNodes).toHaveLength(4)
    });
    test('shoud display All on dropdown header and close the dropdown when click on All option', () => {
        const mockIsOpen= jest.fn()
        const mockSetFilterOption = jest.fn();

        render(<SortMenu filterOption='' setFilterOption={mockSetFilterOption}/>)
        const dropdownHeader = screen.getByTestId('dropdown-header');
        fireEvent.click(dropdownHeader)
        
        const allOption = screen.getAllByTestId('posts-sort-option')[0];
        fireEvent.click(allOption);

        expect(mockSetFilterOption).toHaveBeenCalledWith('all');

        const dropdownContainer = screen.getByTestId('dropdown-container');
        expect(dropdownContainer).not.toHaveClass('show')
    });
    test('shoud display Today on dropdown header and close the dropdown when click on Today option', () => {
        const mockIsOpen= jest.fn()
        const mockSetFilterOption = jest.fn();

        render(<SortMenu filterOption='' setFilterOption={mockSetFilterOption}/>)
        const dropdownHeader = screen.getByTestId('dropdown-header');
        fireEvent.click(dropdownHeader)
        
        const todayOption = screen.getAllByTestId('posts-sort-option')[1];
        fireEvent.click(todayOption);

        expect(mockSetFilterOption).toHaveBeenCalledWith('today');

        const dropdownContainer = screen.getByTestId('dropdown-container');
        expect(dropdownContainer).not.toHaveClass('show')
    });
    test('shoud display This Week on dropdown header and close the dropdown when click on This Week option', () => {
        const mockIsOpen= jest.fn()
        const mockSetFilterOption = jest.fn();

        render(<SortMenu filterOption='' setFilterOption={mockSetFilterOption}/>)
        const dropdownHeader = screen.getByTestId('dropdown-header');
        fireEvent.click(dropdownHeader)
        
        const thisWeekOption = screen.getAllByTestId('posts-sort-option')[2];
        fireEvent.click(thisWeekOption);

        expect(mockSetFilterOption).toHaveBeenCalledWith('this week');

        const dropdownContainer = screen.getByTestId('dropdown-container');
        expect(dropdownContainer).not.toHaveClass('show')
    });
    test('shoud display This Month on dropdown header and close the dropdown when click on This Month option', () => {
        const mockIsOpen= jest.fn()
        const mockSetFilterOption = jest.fn();

        render(<SortMenu filterOption='' setFilterOption={mockSetFilterOption}/>)
        const dropdownHeader = screen.getByTestId('dropdown-header');
        fireEvent.click(dropdownHeader)
        
        const thisMontOption = screen.getAllByTestId('posts-sort-option')[3];
        fireEvent.click(thisMontOption);

        expect(mockSetFilterOption).toHaveBeenCalledWith('this month');

        const dropdownContainer = screen.getByTestId('dropdown-container');
        expect(dropdownContainer).not.toHaveClass('show')
    });
})
