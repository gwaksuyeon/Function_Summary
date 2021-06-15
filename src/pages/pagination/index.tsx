import React, { useState } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import data from './data.json';

const Table = loadable(() => import('components/pagination/Table'));
const Pagination = loadable(() => import('components/pagination/Pagination'));

const PaginationPage: React.FC = () => {
    const [page, setPage] = useState<number>(0);

    const onClickPage = (num: number) => {
        setPage(num);
    };

    return (
        <Container>
            <TableLayout>
                <Table isColumn />
                {data.length > 0 ? (
                    data
                        .slice(page * 10, page * 10 + 10)
                        .map((obj: any, inx: number) => (
                            <Table key={`list-${inx}`} data={obj} />
                        ))
                ) : (
                    <div>데이터가 없습니다</div>
                )}
            </TableLayout>

            <Pagination
                totalCount={data.length}
                limit={10}
                pageLimit={5}
                page={page}
                onClickPage={onClickPage}
            />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const TableLayout = styled.div`
    width: 1080px;
`;

export default PaginationPage;
