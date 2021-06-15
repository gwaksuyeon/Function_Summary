import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { Ellipsis } from 'style/mixin';

const LazyImage = loadable(() => import('components/common/LazyImage'));

interface Props {
    data: any;
}

const ContentsLayout: React.FC<Props> = ({ data }) => {
    return (
        <Container>
            <ImageLayout>
                <LazyImage src={data.imageUrl} alt={'img'} />
            </ImageLayout>
            <Title>{data.title}</Title>
            <Contents>{data.contents}</Contents>
        </Container>
    );
};

const Container = styled.div``;

const ImageLayout = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;

    &:after {
        display: block;
        padding-bottom: 100%;
        content: '';
    }

    > span {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
    }
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    ${Ellipsis(1)}
`;

const Contents = styled.p`
    ${Ellipsis(2)}
`;

export default ContentsLayout;
