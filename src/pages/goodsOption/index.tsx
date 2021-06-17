import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { numberComma, toggleToBoolean } from 'common/function';
import DATA_JSON from './data.json';

const Combine = loadable(() => import('pages/goodsOption/Combine'));
const Separation = loadable(() => import('pages/goodsOption/Separation'));
const NoOption = loadable(() => import('pages/goodsOption/NoOption'));

const GoodsOption: React.FC = () => {
    const [data, setData] = useState<any>('');

    const onRead = () => {
        setData(DATA_JSON);
    };

    // 타이틀 읽기
    const onReadTitle = (type: string, optionYn: string) => {
        if (toggleToBoolean(optionYn)) {
            if (type === 'combine') {
                return '조합형 옵션';
            }

            if (type === 'separation') {
                return '분리형 옵션';
            }
        } else {
            return '비옵션';
        }
    };

    useEffect(() => {
        onRead();
    }, []);

    return (
        <Container>
            {data &&
                data.map((obj: any, inx: number) => (
                    <ContentsLayout key={`option-${inx}`}>
                        <Title>
                            {onReadTitle(obj.optionType, obj.optionYn)}
                        </Title>

                        <PriceLayout>
                            <PriceRows>
                                상품가격: {numberComma(obj.price)}원
                            </PriceRows>
                        </PriceLayout>

                        <OptionLayout>
                            {toggleToBoolean(obj.optionYn) &&
                            obj.optionType === 'combine' ? (
                                <Combine data={obj} />
                            ) : toggleToBoolean(obj.optionYn) &&
                              obj.optionType === 'separation' ? (
                                <Separation data={obj} />
                            ) : (
                                <NoOption data={obj} />
                            )}
                        </OptionLayout>
                    </ContentsLayout>
                ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 60px;

    > div ~ div {
        border-left: 1px solid #e9edf1;
    }
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ContentsLayout = styled.div`
    width: 300px;
    height: 600px;
    padding: 10px;
    overflow-y: auto;
`;

const PriceLayout = styled.div`
    margin-bottom: 10px;
`;

const PriceRows = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;

    & ~ & {
        margin-top: 4px;
    }
`;

const OptionLayout = styled.div``;

export default GoodsOption;
