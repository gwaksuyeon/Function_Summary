import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Ellipsis } from 'style/mixin';

interface Props {
    isColumn?: boolean;
    data?: any;
}

const Table: React.FC<Props> = ({ isColumn, data }) => {
    return isColumn ? (
        <TableHeader>
            <NumberLayout>NO</NumberLayout>
            <TitleLayout>제목</TitleLayout>
            <ContentsLayout>내용</ContentsLayout>
            <DateLayout>등록일</DateLayout>
        </TableHeader>
    ) : (
        <TableRow>
            <NumberLayout>{data.no}</NumberLayout>
            <TitleLayout>{data.title}</TitleLayout>
            <ContentsLayout>{data.contents}</ContentsLayout>
            <DateLayout>
                {moment(data.inDt).format('YYYY-MM-DD HH:mm:ss')}
            </DateLayout>
        </TableRow>
    );
};

const TableRow = styled.div`
    display: flex;
    align-items: center;

    &:hover {
        background: #fafafa;
    }
    & ~ & {
        border-top: 1px solid #e9edf1;
    }
`;

const TableData = styled.div`
    display: flex;
    align-items: center;
    padding: 4px;

    & ~ & {
        border-left: 1px solid #e9edf1;
    }
`;

const TableHeader = styled(TableRow)`
    position: sticky;
    top: 0;
    text-align: center;
    font-weight: bold;
    background: #fafafa;
`;

const NumberLayout = styled(TableData)`
    width: 60px;
    justify-content: center;
`;

const TitleLayout = styled(TableData)`
    flex: 1;
`;

const ContentsLayout = styled(TableData)`
    flex: 1;
    ${Ellipsis(1)}
`;

const DateLayout = styled(TableData)`
    width: 150px;
    justify-content: center;
`;

export default Table;
