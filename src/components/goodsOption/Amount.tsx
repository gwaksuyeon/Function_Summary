import React from 'react';
import styled from 'styled-components';

import { numberComma } from 'common/function';
import { SvgClose, SvgPlus, SvgMinus } from 'assets/svgs';

const Amount: React.FC = () => {
    return (
        <Container>
            <OptionNameLayout>
                <OptionName>옵션명</OptionName>
                <DeleteButton>
                    <SvgClose />
                </DeleteButton>
            </OptionNameLayout>

            <AmountLayout>
                <CountLayout>
                    <MinusButton>
                        <SvgMinus />
                    </MinusButton>

                    <Count>{numberComma(1)}</Count>

                    <PlusButton>
                        <SvgPlus />
                    </PlusButton>
                </CountLayout>

                <Price>
                    {numberComma(33000)}
                    <span>원</span>
                </Price>
            </AmountLayout>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    background: #fafafb;
    border-radius: 2px;
    padding: 16px 10px;

    & ~ & {
        margin-top: 8px;
    }
`;

const OptionNameLayout = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 16px;
`;

const OptionName = styled.p`
    flex: 1 1 auto;
    margin-right: 8px;
`;

const DeleteButton = styled.div`
    width: 12px;
    height: 12px;
    cursor: pointer;

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const AmountLayout = styled.div`
    display: flex;
    align-items: center;
`;

const CountLayout = styled.div`
    display: flex;
    align-items: center;
    margin-right: auto;
`;

const MinusButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 -2px 4px 0 #ffffff;
    cursor: pointer;

    svg {
        display: block;
        width: 13px;
        height: 13px;
    }
`;

const PlusButton = styled(MinusButton)``;

const Count = styled.p`
    font-size: 16px;
    font-weight: 700;
    margin: 0 20px;
`;

const Price = styled.p`
    display: flex;
    align-items: center;
`;

export default Amount;