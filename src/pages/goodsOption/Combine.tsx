import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { numberComma } from 'common/function';

const Select = loadable(() => import('components/goodsOption/Select'));
const Amount = loadable(() => import('components/goodsOption/Amount'));
const Total = loadable(() => import('components/goodsOption/Total'));

interface Props {
    data: any;
}

const Combine: React.FC<Props> = ({ data }) => {
    const [selected1List, setSelected1List] = useState<any>([]);
    const [selected2List, setSelected2List] = useState<any>([]);

    useEffect(() => {
        // 첫번째 옵션 리스트 만들기
        if (data) {
            const resSelected1List = [
                ...new Set(data.optionList.map((obj: any) => obj.depth1)),
            ];
            setSelected1List(resSelected1List);
        }
    }, [data]);

    return (
        <Container>
            <SelectedLayout>
                {data.optionNameList &&
                    data.optionNameList.map((obj: any, inx: number) => (
                        <Select
                            key={`select-${obj}`}
                            type={inx === 0 ? 'depth1' : 'depth2'}
                            optionType={data.optionType}
                            placeholder={obj}
                            selectedList={
                                inx === 0 ? selected1List : selected2List
                            }
                        />
                    ))}
            </SelectedLayout>
            <AmountLayout>
                <Amount />
            </AmountLayout>
            <Total />
        </Container>
    );
};

const Container = styled.div``;

const SelectedLayout = styled.div`
    margin-bottom: 20px;
`;

const AmountLayout = styled.div`
    max-height: 250px;
    margin-bottom: 30px;
    overflow-y: auto;
`;

export default Combine;
