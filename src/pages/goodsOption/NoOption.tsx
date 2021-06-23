import React, { useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'reducers/index';
import { optionCreate } from 'reducers/options';

const Amount = loadable(() => import('components/goodsOption/Amount'));
const Total = loadable(() => import('components/goodsOption/Total'));

interface Props {
    data: any;
}

const NoOption: React.FC<Props> = ({ data }) => {
    const dispatch = useDispatch();
    const { noOptionList } = useSelector((state: RootState) => state.options);

    useEffect(() => {
        if (data) {
            let list = { ...data, buyCnt: 1 };
            dispatch(optionCreate({ type: 'noOption', selectedList: list }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Container>
            {noOptionList.length > 0 && (
                <>
                    <AmountLayout>
                        <Amount
                            data={noOptionList[0]}
                            index={0}
                            optionType={'noOption'}
                            price={noOptionList[0].price}
                        />
                    </AmountLayout>
                    <Total
                        data={noOptionList}
                        optionType={'noOption'}
                        price={noOptionList[0].price}
                    />
                </>
            )}
        </Container>
    );
};

const Container = styled.div``;

const AmountLayout = styled.div`
    max-height: 250px;
    margin-bottom: 30px;
    overflow-y: auto;
`;
export default NoOption;
