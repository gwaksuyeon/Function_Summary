import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { amountPlus, amountMinus, optionDelete } from 'reducers/options';
import { numberComma } from 'common/function';
import { SvgClose, SvgPlus, SvgMinus } from 'assets/svgs';

interface Props {
    data: any;
    index: number;
    optionType: string; // 옵션타입
    price: number; // 상품 기본 가격
}

const Amount: React.FC<Props> = ({ data, index, optionType, price }) => {
    const dispatch = useDispatch();

    // 옵션명
    const onOptionText = () => {
        if (optionType === 'combine') {
            return `${data.selected2.depth1} + ${data.selected2.depth2} ${
                data.selected2.price > 0
                    ? `(+${numberComma(data.selected2.price)}원)`
                    : ''
            }`;
        }

        if (optionType === 'separation') {
            return `${data.selected1.depth1}: ${data.selected1.depth2} ${
                data.selected1.price > 0
                    ? `(+${numberComma(data.selected1.price)}원)`
                    : ''
            }\n
                ${data.selected2.depth1}: ${data.selected2.depth2} ${
                data.selected2.price > 0
                    ? `(+${numberComma(data.selected2.price)}원)`
                    : ''
            }
            `;
        }

        if (optionType === 'noOption') {
            return data.goodsName;
        }
    };

    // 수량 증가
    const onClickPlus = () => {
        dispatch(
            amountPlus({
                type: optionType,
                index,
            }),
        );
    };

    // 수량 감소
    const onClickMinus = () => {
        dispatch(
            amountMinus({
                type: optionType,
                index,
            }),
        );
    };

    // 옵션 삭제
    const onOptionDelete = () => {
        dispatch(
            optionDelete({
                type: optionType,
                index,
            }),
        );
    };

    return (
        <Container>
            <OptionNameLayout>
                <OptionName>{onOptionText()}</OptionName>
                {optionType !== 'noOption' && (
                    <DeleteButton onClick={onOptionDelete}>
                        <SvgClose />
                    </DeleteButton>
                )}
            </OptionNameLayout>

            <AmountLayout>
                <CountLayout>
                    <MinusButton onClick={onClickMinus}>
                        <SvgMinus />
                    </MinusButton>

                    <Count>{numberComma(data.buyCnt)}</Count>

                    <PlusButton onClick={onClickPlus}>
                        <SvgPlus />
                    </PlusButton>
                </CountLayout>

                <Price>
                    {numberComma(data.buyCnt * price)}
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
    white-space: pre-line;
    line-height: 0.8;
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
