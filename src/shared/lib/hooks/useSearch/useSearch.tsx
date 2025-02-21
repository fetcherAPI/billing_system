import { Input } from 'antd';
import { useState } from 'react';

export const useSearch = <T,>(initialData: T[], searchFields: (keyof T)[]) => {
    const [, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        const lowerValue = value.toLowerCase();

        if (value.length) {
            setFilteredData(
                initialData.filter((item) =>
                    searchFields.some((field) => String(item[field]).toLowerCase().includes(lowerValue))
                )
            );
        } else {
            setFilteredData(initialData);
        }
    };
    const SearchComponent = (
        <>
            <Input.Search onSearch={handleSearch} placeholder="Поиск по ...." />
            <br />
            <br />
        </>
    );

    return {
        SearchComponent,
        filteredData,
    };
};
