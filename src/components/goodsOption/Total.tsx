import React from 'react';
import styled from 'styled-components';

import { numberComma } from 'common/function';

const Total: React.FC = () => {
    return (
        <Container>
            <TotalAmountLayout>
                <TotalCount>{numberComma(9999)}개 상품 금액</TotalCount>
                <TotalPrice>
                    {numberComma(33000)}
                    <span>원</span>
                </TotalPrice>
            </TotalAmountLayout>

            <DeliveryLayout>
                <DeliveryCondition>
                    배송비
                    <span>5만원 이상 무료</span>
                </DeliveryCondition>

                <DeliveryPrice>
                    {numberComma(2500)}
                    <span>원</span>
                </DeliveryPrice>
            </DeliveryLayout>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const TotalAmountLayout = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const TotalCount = styled.p`
    margin-right: auto;
`;

const TotalPrice = styled.p`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;

    span {
        font-size: 16px;
        margin-left: 2px;
    }
`;

const DeliveryLayout = styled.div`
    display: flex;
    align-items: center;
`;

const DeliveryCondition = styled.p`
    display: flex;
    align-items: center;
    margin-right: auto;

    span {
        color: #cbcfd5;
        margin-left: 4px;
    }
`;

const DeliveryPrice = styled.p``;

export default Total;
