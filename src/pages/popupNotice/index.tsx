import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Countdown from 'react-countdown';

import { SvgCheckBox } from 'assets/svgs';
import moment from 'moment';

const LazyImage = loadable(() => import('components/common/LazyImage'));

const PopupNotice: React.FC = () => {
    const [isView, setIsView] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const notShowTime = localStorage.getItem('notShowTime');

    const onClosePopup = () => {
        if (checked) {
            // 팝업 중지
            onPuasePopup();
        } else {
            setIsView(false);
            setChecked(false);
        }
    };

    const onPuasePopup = () => {
        localStorage.setItem(
            'notShowTime',
            moment().add(1, 'days').format('YYYY-MM-DD HH:mm:59'),
        );
        setIsView(false);
    };

    useEffect(() => {
        if (!notShowTime) {
            setIsView(true);
            return;
        }

        if (moment().isSameOrAfter(moment(notShowTime))) {
            setIsView(true);
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            {isView ? (
                <PopupLayout>
                    <ImageLayout>
                        <LazyImage
                            src={
                                require('assets/image/popupNotice.jpg').default
                            }
                            alt={'popupImg'}
                        />
                    </ImageLayout>

                    <Contents>
                        <CheckBoxLayout onClick={() => setChecked(!checked)}>
                            <SvgCheckBox checked={checked} />
                            <p>오늘 하루 그만 보기</p>
                        </CheckBoxLayout>

                        <CloseButton onClick={onClosePopup}>닫기</CloseButton>
                    </Contents>
                </PopupLayout>
            ) : (
                <PopupLayout>
                    <NotPopupLayout>
                        팝업이 닫혀있습니다.
                        {notShowTime && moment().isBefore(moment(notShowTime)) && (
                            <CountDownLayout>
                                <Countdown
                                    date={
                                        Date.now() +
                                        moment
                                            .duration(
                                                moment(notShowTime).diff(
                                                    moment(),
                                                ),
                                            )
                                            .asMilliseconds()
                                    }
                                    daysInHours={true}
                                    onComplete={() => window.location.reload()}
                                />
                                후 열립니다
                            </CountDownLayout>
                        )}
                    </NotPopupLayout>
                </PopupLayout>
            )}
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
`;

const PopupLayout = styled.div`
    width: 300px;
    height: 500px;
    background: #fff;
    border: 1px solid #e9edf1;
    border-radius: 4px;
    overflow: hidden;
`;

const ImageLayout = styled.div`
    width: 100%;
    height: 400px;
    overflow-y: auto;
`;

const Contents = styled.div`
    padding: 20px;
`;

const CheckBoxLayout = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
    user-select: none;

    svg {
        margin-right: 4px;
    }
`;

const CloseButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    border: 1px solid #ddd;
    font-weight: bold;
    cursor: pointer;
`;

const NotPopupLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #bbb;
`;

const CountDownLayout = styled.div``;

export default PopupNotice;
