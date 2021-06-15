import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SvgCheckBox } from 'assets/svgs';

interface Props {
    text?: string;
    type?: 'master' | 'admin' | 'csAdmin' | '';
    onClick?: () => void | any;
}
const CheckBox: React.FC<Props> = ({ text, type, onClick = () => {} }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const onClickCheck = () => {
        setChecked(!checked);
        onClick();
    };

    useEffect(() => {
        if (type === 'master') {
            setChecked(true);
            return;
        }

        if (type === 'admin') {
            if (
                text?.includes('1') ||
                text?.includes('2') ||
                text?.includes('3')
            ) {
                setChecked(true);
                return;
            }
        }

        if (type === 'csAdmin') {
            if (text?.includes('4') || text?.includes('5')) {
                setChecked(true);
                return;
            }
        }

        setChecked(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <Container onClick={onClickCheck}>
            <SvgCheckBox checked={checked} />
            <p>{text}</p>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    & ~ & {
        margin-left: 8px;
    }

    svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
`;

export default CheckBox;
