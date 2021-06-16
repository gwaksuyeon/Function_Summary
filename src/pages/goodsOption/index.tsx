import React from 'react';
import styled from 'styled-components';

const GoodsOption: React.FC = () => {
    return (
        <Container>
            <CombineOptionLayout>
                <Title>조합형 옵션</Title>

                <PriceLayout>
                    <PriceRows>상품가격: 5,000원</PriceRows>
                </PriceLayout>
            </CombineOptionLayout>

            <SeparationOptionLayout>
                <Title>분리형 옵션</Title>

                <PriceLayout>
                    <PriceRows>상품가격: 5,000원</PriceRows>
                </PriceLayout>
            </SeparationOptionLayout>

            <NoOptionLayout>
                <Title>비옵션</Title>

                <PriceLayout>
                    <PriceRows>상품가격: 5,000원</PriceRows>
                </PriceLayout>
            </NoOptionLayout>
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
        margin-left: 20px;
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
    padding: 4px;
    overflow-y: auto;
`;

const CombineOptionLayout = styled(ContentsLayout)``;

const SeparationOptionLayout = styled(ContentsLayout)``;

const NoOptionLayout = styled(ContentsLayout)``;

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

export default GoodsOption;
