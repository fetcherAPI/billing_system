import { Input } from 'antd';
import { useState } from 'react';

export const useSearch = <T,>(initialData: T[], searchFields: (keyof T)[]) => {
    const [, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        const lowerValue = value.toLowerCase();

        setFilteredData(
            initialData.filter((item) =>
                searchFields.some((field) => String(item[field]).toLowerCase().includes(lowerValue))
            )
        );
    };
    const SearchComponent = <Input.Search onSearch={handleSearch} placeholder="Поиск по ...." />;

    return {
        SearchComponent,
        filteredData,
    };
};
