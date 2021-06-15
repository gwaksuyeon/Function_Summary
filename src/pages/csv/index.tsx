import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import DATA_JSON from './data.json';

const Table = loadable(() => import('components/csv/Table'));

const Csv: React.FC = () => {
    const [data, setData] = useState<any>('');

    const onRead = () => {
        setData(DATA_JSON);
    };

    useEffect(() => {
        onRead();
    }, []);

    return (
        <Container>
            <CSVButton>CSV다운</CSVButton>
            <TableLayout>
                <Table isColumn />
                {data.length > 0 ? (
                    data.map((obj: any, inx: number) => (
                        <Table key={`list-${inx}`} data={obj} />
                    ))
                ) : (
                    <div>데이터가 없습니다</div>
                )}
            </TableLayout>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const CSVButton = styled.div`
    background: #1c7346;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    padding: 4px 8px;
    cursor: pointer;
`;

const TableLayout = styled.div`
    width: 1000px;
    height: 500px;
    overflow-y: auto;
`;

export default Csv;
