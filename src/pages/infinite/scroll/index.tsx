import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import { Ellipsis } from 'style/mixin';
import DATA_JSON from 'pages/infinite/data.json';

const LazyImage = loadable(() => import('components/common/LazyImage'));

const InfiniteScroll: React.FC = () => {
    const LIMIT_COUNT = 8;
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const pageEndRef = useRef<any>(null);

    const onRead = () => {
        setData(
            data.concat(
                DATA_JSON.slice(
                    page * LIMIT_COUNT,
                    page * LIMIT_COUNT + LIMIT_COUNT,
                ),
            ),
        );
        setLoading(true);
    };

    useEffect(() => {
        onRead();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (loading) {
            const observer = new IntersectionObserver(
                (entries: any) => {
                    if (entries[0].isIntersecting) {
                        setPage(
                            (prev: React.SetStateAction<number>) =>
                                Number(prev) + 1,
                        );
                    }
                },
                { threshold: 1 },
            );
            observer.observe(pageEndRef.current);
        }
    }, [loading]);

    return (
        <Container>
            {data.map((obj: any, inx: number) => (
                <ContentsLayout key={`contents-${inx}`}>
                    <ImageLayout>
                        <LazyImage src={obj.imageUrl} alt={'img'} />
                    </ImageLayout>
                    <Title>{obj.title}</Title>
                    <Contents>{obj.contents}</Contents>
                </ContentsLayout>
            ))}
            <div
                ref={pageEndRef}
                style={{ width: '100%', height: '60px' }}></div>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px 32px;
    width: 100%;
    min-height: 100%;
    padding: 60px 60px 0 60px;
`;

const ContentsLayout = styled.div``;

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

export default InfiniteScroll;
