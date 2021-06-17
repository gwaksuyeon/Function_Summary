import React from 'react';
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
    return (
        <Container>
            <SelectedLayout>
                {data.optionNameList &&
                    data.optionNameList.map((obj: any) => (
                        <Select key={`select-${obj}`} selectName={obj} />
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
