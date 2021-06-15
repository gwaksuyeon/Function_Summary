import React from 'react';
import styled from 'styled-components';

interface Props {
    totalCount: number;
    limit: number;
    pageLimit: number;
    page: number;
    onClickPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
    totalCount, // 총 데이터 수
    limit, // 한 페이지에 나타낼 데이터 수
    pageLimit, // 한 화면에 나타낼 페이지 수
    page, // 현재 페이지
    onClickPage,
}) => {
    const pageGroup = Math.ceil(page / pageLimit);
    const totalPage = Math.ceil(totalCount / limit);
    const totalPageList = new Array(totalPage)
        .fill(0)
        .map((obj: any, inx: number) => inx + 1);

    const onClickLastPrev = () => {
        onClickPage(0);
    };

    const onClickPrev = () => {
        if (page - 1 < 0) {
            onClickPage(0);
        } else {
            onClickPage(page - 1);
        }
    };

    const onClickNext = () => {
        if (page + 1 > totalPage - 1) {
            onClickPage(totalPage - 1);
        } else {
            onClickPage(page + 1);
        }
    };

    const onClickLastNext = () => {
        onClickPage(totalPage - 1);
    };

    return (
        <Container>
            <Button
                disabled={page === 0}
                onClick={onClickLastPrev}>{`<<`}</Button>
            <Button disabled={page === 0} onClick={onClickPrev}>{`<`}</Button>

            {totalPageList
                .slice(pageGroup, pageGroup + pageLimit)
                .map((obj: any, inx: number) => (
                    <Button
                        key={`pagination-${inx}`}
                        active={obj === page + 1}
                        onClick={() => onClickPage(obj - 1)}>
                        {obj}
                    </Button>
                ))}

            <Button
                disabled={page === totalPage - 1}
                onClick={onClickNext}>{`>`}</Button>
            <Button
                disabled={page === totalPage - 1}
                onClick={onClickLastNext}>{`>>`}</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.div<any>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: 1px solid #e9edf1;
    border-radius: 2px;
    background: ${(props: any) => props.active && '#e9edf1'};
    font-weight: ${(props: any) => props.active && 'bold'};
    color: ${(props: any) => props.disabled && '#ddd'};
    cursor: ${(props: any) => (props.disabled ? 'not-allowed' : 'pointer')};

    & ~ & {
        margin-left: 4px;
    }
`;

export default Pagination;
