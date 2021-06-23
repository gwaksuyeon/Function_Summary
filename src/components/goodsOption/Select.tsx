import React, { useState } from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';

import { numberComma } from 'common/function';
import { SvgArrow } from 'assets/svgs';

interface Props {
    type: 'depth1' | 'depth2'; // 옵션 상단, 하단
    optionType: string; // 옵션타입 (조합형 / 분리형)
    placeholder: string; // 옵션명
    selectedList: any[]; // 옵션 리스트
    currentSelectList: any; // 현재 선택된 리스트
    onSelectedList: any;
}
const Select: React.FC<Props> = ({
    type,
    optionType,
    placeholder,
    selectedList,
    currentSelectList,
    onSelectedList,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');

    // 옵션 선택
    const onClickOption = (option: any) => {
        if (optionType === 'combine') {
            if (type === 'depth1') {
                setSelected(option);
                onSelectedList({
                    selected1: option,
                });
            }

            if (type === 'depth2') {
                setSelected(option.depth2);
                onSelectedList({
                    selected1: null,
                    selected2: option,
                });
            }
        }

        if (optionType === 'separation') {
            setSelected(`${placeholder}: ${option.depth2}`);

            if (type === 'depth1') {
                onSelectedList({
                    selected1: option,
                });
            }

            if (type === 'depth2') {
                onSelectedList({
                    ...currentSelectList,
                    selected2: option,
                });
            }
        }

        setIsOpen(false);
    };

    // 옵션 리스트 텍스트
    const onOptionText = (option: any) => {
        if (optionType === 'combine') {
            if (type === 'depth1') {
                return option;
            }

            if (type === 'depth2') {
                return `${option.depth2} ${
                    option.price > 0 ? `(+${numberComma(option.price)}원)` : ''
                }`;
            }
        }

        if (optionType === 'separation') {
            return `${option.depth2} ${
                option.price > 0 ? `(+${numberComma(option.price)}원)` : ''
            }`;
        }
    };

    return (
        <Container>
            <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                <SelectedLayout onClick={() => setIsOpen(!isOpen)}>
                    <SelectedText>
                        {selected ? selected : placeholder}
                    </SelectedText>
                    <ArrowButton isOpen={isOpen}>
                        <SvgArrow />
                    </ArrowButton>
                </SelectedLayout>

                {isOpen && (
                    <OptionListLayout>
                        {selectedList.length > 0 &&
                            selectedList.map((obj: any, inx: number) => (
                                <OptionLayout
                                    key={`option-${inx}`}
                                    onClick={() => onClickOption(obj)}>
                                    {onOptionText(obj)}
                                </OptionLayout>
                            ))}
                    </OptionListLayout>
                )}
            </OutsideClickHandler>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    position: relative;

    & ~ & {
        margin-top: 8px;
    }
`;

const SelectedLayout = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid #9ba0aa;
    border-radius: 2px;
    padding: 0 10px;
    cursor: pointer;
`;

const SelectedText = styled.p`
    flex: 1 1 auto;
    color: #6e7178;
`;

const ArrowButton = styled.div<any>`
    width: 12px;
    height: 12px;
    transform: ${(props: any) =>
        props.isOpen ? 'rotate(-90deg)' : 'rotate(90deg)'};

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const OptionListLayout = styled.div`
    width: 100%;
    max-height: 200px;
    position: absolute;
    top: 100%;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 14px 19px -10px #ddd;
    overflow-y: auto;
    z-index: 10;
`;

const OptionLayout = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
    & ~ & {
        border-top: 1px solid #e9edf1;
    }
`;

export default Select;
