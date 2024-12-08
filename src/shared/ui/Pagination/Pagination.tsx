import { memo, useEffect, useState } from 'react';
import { Pagination as AntdPagination } from 'antd';
// import cls from './MyPagination.module.scss'
import { useSearchParams } from 'react-router-dom';

type MyPaginationProps = {
    total: number;
    onChange: (page: number, pageSize: number, parentId?: number | undefined) => void;
    defendFromParentValue?: any;
    pageSizes?: Array<number>;
};

export const Pagination = memo(function MyPagination({
    total,
    onChange,
    defendFromParentValue,
    pageSizes,
}: MyPaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromParams = searchParams.get('page');
    const sizeFromParams = searchParams.get('size');

    const handlePageChange = (page: number, size: number) => {
        searchParams.set('page', page.toString());
        searchParams.set('size', size.toString());
        setCurrentPage(page);
        setPageSize(size);
        onChange(page, size);
        setSearchParams(searchParams);
    };

    const handleChangeShowSize = (size: number) => {
        setPageSize(size);
    };

    const paginationLocale = {
        items_per_page: '',
    };

    useEffect(() => {
        if (pageFromParams && sizeFromParams) {
            setCurrentPage(Number(pageFromParams));
            setPageSize(Number(sizeFromParams));
            onChange(Number(pageFromParams), Number(sizeFromParams));
        } else {
            onChange(currentPage, pageSize);
        }
    }, [defendFromParentValue]);
    return (
        <AntdPagination
            // className={cls.pagnination}
            total={total}
            current={currentPage}
            pageSize={pageSize}
            onChange={(page, size) => {
                handlePageChange(page, size);
                // if (size !== pageSize) {
                //     onPageSizeChange(size)
                // }
            }}
            showSizeChanger
            pageSizeOptions={pageSizes}
            onShowSizeChange={(_current, size) => handleChangeShowSize(size)}
            locale={paginationLocale}
        />
    );
});
