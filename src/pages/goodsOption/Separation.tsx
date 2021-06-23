import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'reducers/index';
import { optionCreate } from 'reducers/options';

const Select = loadable(() => import('components/goodsOption/Select'));
const Amount = loadable(() => import('components/goodsOption/Amount'));
const Total = loadable(() => import('components/goodsOption/Total'));

interface Props {
    data: any;
}

const Separation: React.FC<Props> = ({ data }) => {
    const dispatch = useDispatch();
    const { separationOptionList } = useSelector(
        (state: RootState) => state.options,
    );
    const [selected1List, setSelected1List] = useState<any>([]);
    const [selected2List, setSelected2List] = useState<any>([]);
    const [selectedList, setSelectedList] = useState<any>('');

    useEffect(() => {
        if (data) {
            // depth1 옵션 리스트 생성
            const resSelected1List = data.optionList.filter(
                (f: any) => f.depth1 === data.optionNameList[0],
            );

            setSelected1List(resSelected1List);
        }
    }, [data]);

    useEffect(() => {
        // depth1가 선택되고 depth2 옵션 리스트 생성
        if (selectedList && selectedList.selected1 && !selectedList.selected2) {
            const resSelected2List =
                data.optionList.length > 1
                    ? data.optionList.filter(
                          (f: any) => f.depth1 === data.optionNameList[1],
                      )
                    : [];
            setSelected2List(resSelected2List);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedList]);

    useEffect(() => {
        // 옵션 수량 생성
        if (selectedList.selected2) {
            dispatch(
                optionCreate({
                    type: data.optionType,
                    selectedList: { ...selectedList, buyCnt: 1 },
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedList.selected2]);

    return (
        <Container>
            <SelectedLayout>
                {data.optionNameList &&
                    data.optionNameList.map((obj: any, inx: number) => (
                        <Select
                            key={`select-${obj}`}
                            type={inx === 0 ? 'depth1' : 'depth2'}
                            optionType={data.optionType}
                            placeholder={obj}
                            selectedList={
                                inx === 0 ? selected1List : selected2List
                            }
                            currentSelectList={selectedList}
                            onSelectedList={setSelectedList}
                        />
                    ))}
            </SelectedLayout>

            {separationOptionList.length > 0 && (
                <AmountLayout>
                    {separationOptionList.map((obj: any, inx: number) => (
                        <Amount
                            key={`amount-${inx}`}
                            data={obj}
                            index={inx}
                            optionType={data.optionType}
                            price={
                                data.price +
                                obj.selected1.price +
                                obj.selected2.price
                            }
                        />
                    ))}
                </AmountLayout>
            )}

            <Total
                data={separationOptionList}
                optionType={data.optionType}
                price={data.price}
            />
        </Container>
    );
};
const Container = styled.div``;

const SelectedLayout = styled.div`
    margin-bottom: 20px;
`;

const AmountLayout = styled.div`
    max-height: 250px;
    margin-bottom: 30px;
    overflow-y: auto;
`;
export default Separation;
