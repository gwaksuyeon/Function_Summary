import React, { useState } from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';

import { SvgArrow } from 'assets/svgs';

interface Props {
    selectName: string;
}
const Select: React.FC<Props> = ({ selectName }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Container>
            <SelectedLayout onClick={() => setIsOpen(!isOpen)}>
                <SelectedText>{selectName}</SelectedText>
                <ArrowButton isOpen={isOpen}>
                    <SvgArrow />
                </ArrowButton>
            </SelectedLayout>

            {isOpen && (
                <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                    <OptionListLayout>
                        <OptionLayout>500ml</OptionLayout>
                        <OptionLayout>1000ml</OptionLayout>
                    </OptionListLayout>
                </OutsideClickHandler>
            )}
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
