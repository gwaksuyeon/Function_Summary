import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Ellipsis } from 'style/mixin';
import {
    SvgShareFacebook,
    SvgShareKakao,
    SvgShareKakaostory,
    SvgShareNaver,
    SvgShareTwitter,
} from 'assets/svgs';

const LazyImage = loadable(() => import('components/common/LazyImage'));

declare global {
    interface Window {
        Kakao: any;
    }
}

const Share: React.FC = () => {
    const [data, setData] = useState<any>('');

    const onReadData = () => {
        let res = {
            title: '공유하기 제목',
            contents: `공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트공유하기
      텍스트공유하기 텍스트공유하기 텍스트공유하기 텍스트`,
            imageUrl: 'http://placehold.it/300x300/efa/aae&text=test',
            link: 'https://naver.com',
        };

        setData(res);
    };

    const onClickShareKakao = () => {
        if (window.Kakao && window.Kakao.Link) {
            window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: data.title,
                    description: data.contents,
                    imageUrl: data.imageUrl,
                    link: {
                        mobileWebUrl: data.link,
                        webUrl: data.link,
                    },
                },
            });
        }
    };

    const onClickShareNaver = () => {
        const url = encodeURI(encodeURIComponent(data.link));
        const title = encodeURI(encodeURIComponent(data.title));
        const res = `https://share.naver.com/web/shareView?url=${url}&title=${title}`;

        window.open(res, 'share', 'width=500, height=500');
    };

    const onClickShareKakaoStory = () => {
        if (window.Kakao && window.Kakao.Story) {
            window.Kakao.Story.share({
                url: data.link,
                text: data.title,
            });
        }
    };

    const onClickShareURL = () => {
        document.execCommand(data.link);
        window.alert('URL이 복사되었습니다');
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';

        document.head.appendChild(script);

        if (window.Kakao) {
            const isInitialized = window.Kakao.isInitialized();

            if (!isInitialized) {
                window.Kakao.init('c7b45570ba1d848af140f8c7bb103586');
            }
        }

        onReadData();
    }, []);

    return (
        <Container>
            <PreviewLayout>
                {data && (
                    <>
                        <ImageLayout>
                            <LazyImage src={data.imageUrl} alt={'testImg'} />
                        </ImageLayout>

                        <PreviewTitle>{data.title}</PreviewTitle>
                        <PreviewContents>{data.contents}</PreviewContents>
                    </>
                )}
            </PreviewLayout>

            <Contents>
                <Title>공유하기</Title>

                <SnsLayout>
                    <Circle bgColor={'#fef01b'} onClick={onClickShareKakao}>
                        <SvgShareKakao />
                    </Circle>
                    <Circle bgColor={'#1877f2'}>
                        <FacebookShareButton url={data.link}>
                            <SvgShareFacebook />
                        </FacebookShareButton>
                    </Circle>
                    <Circle bgColor={'#1ea1f1'}>
                        <TwitterShareButton url={data.link}>
                            <SvgShareTwitter />
                        </TwitterShareButton>
                    </Circle>
                    <Circle
                        bgColor={'#F9E301'}
                        onClick={onClickShareKakaoStory}>
                        <SvgShareKakaostory />
                    </Circle>
                    <Circle
                        bgColor={'#2DB400'}
                        width={'18px'}
                        height={'18px'}
                        onClick={onClickShareNaver}>
                        <SvgShareNaver />
                    </Circle>
                    <CopyToClipboard text={data.link}>
                        <Circle
                            borderColor={'#e5e5e5'}
                            onClick={onClickShareURL}>
                            URL
                        </Circle>
                    </CopyToClipboard>
                </SnsLayout>
            </Contents>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const PreviewLayout = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid #e9edf1;
    border-radius: 4px;
    margin-bottom: 60px;
`;

const ImageLayout = styled.div`
    width: 100%;
    height: 300px;
    margin-bottom: 16px;
`;

const PreviewTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    padding: 0 8px;
`;

const PreviewContents = styled.p`
    padding: 0 8px;

    ${Ellipsis(2)}
`;

const Contents = styled.div`
    min-width: 300px;
    max-width: 800px;
    border: 1px solid #e9edf1;
    border-radius: 4px;
    overflow: hidden;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    background: #e9edf1;
    font-size: 16px;
    font-weight: bold;
`;

const SnsLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 8px;
`;

const Circle = styled.div<any>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background: ${(props: any) => props.bgColor};
    border: ${(props: any) => `1px solid ${props.borderColor}`};
    border-radius: 100%;
    font-weight: bold;
    cursor: pointer;

    svg {
        width: ${(props: any) => (props.width ? props.width : '32px')};
        height: ${(props: any) => (props.height ? props.height : '32px')};
    }

    & ~ & {
        margin-left: 8px;
    }
`;

export default Share;
