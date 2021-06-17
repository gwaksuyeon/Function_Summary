import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { numberComma } from 'common/function';

const Amount = loadable(() => import('components/goodsOption/Amount'));
const Total = loadable(() => import('components/goodsOption/Total'));

interface Props {
    data: any;
}

const NoOption: React.FC<Props> = ({ data }) => {
    return (
        <Container>
            {' '}
            <AmountLayout>
                <Amount />
            </AmountLayout>
            <Total />
        </Container>
    );
};

const Container = styled.div``;

const AmountLayout = styled.div`
    max-height: 250px;
    margin-bottom: 30px;
    overflow-y: auto;
`;
export default NoOption;
