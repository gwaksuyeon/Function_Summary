import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Ellipsis } from 'style/mixin';
import DATA_JSON from './data.json';

const LazyImage = loadable(() => import('components/common/LazyImage'));

const Reorder: React.FC = () => {
    const [verticalData, setVerticalData] = useState<any>('');
    const [horizontalData, setHorizontalData] = useState<any>('');

    const onRead = () => {
        setVerticalData(DATA_JSON);
        setHorizontalData(DATA_JSON);
    };

    const onReorder = (list: any, startIndex: number, endIndex: number) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    // 가로
    const onDragEndHorizontatl = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items = onReorder(
            horizontalData,
            result.source.index,
            result.destination.index,
        );
        setHorizontalData(items);
    };

    // 세로
    const onDragEndVertical = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items = onReorder(
            verticalData,
            result.source.index,
            result.destination.index,
        );
        setVerticalData(items);
    };

    useEffect(() => {
        onRead();
    }, []);

    return (
        <Container>
            <HorizontalLayout>
                {horizontalData && (
                    <DragDropContext onDragEnd={onDragEndHorizontatl}>
                        <Droppable
                            droppableId="dropable"
                            direction="horizontal">
                            {(provided: any) => (
                                <HorizontalContentsLayout
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {horizontalData.map(
                                        (obj: any, inx: number) => (
                                            <Draggable
                                                key={obj.no}
                                                draggableId={`${obj.no}`}
                                                index={inx}>
                                                {(provided: any) => (
                                                    <ContentsLayout
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <ImageLayout>
                                                            <LazyImage
                                                                src={
                                                                    obj.imageUrl
                                                                }
                                                            />
                                                        </ImageLayout>
                                                        <Title>
                                                            {obj.title}
                                                        </Title>
                                                        <Contents>
                                                            {obj.contents}
                                                        </Contents>
                                                    </ContentsLayout>
                                                )}
                                            </Draggable>
                                        ),
                                    )}
                                    {provided.placeholder}
                                </HorizontalContentsLayout>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </HorizontalLayout>

            <VerticalLayout>
                {verticalData && (
                    <DragDropContext onDragEnd={onDragEndVertical}>
                        <Droppable droppableId="dropable" direction="vertical">
                            {(provided: any) => (
                                <VerticalContentsLayout
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {verticalData.map(
                                        (obj: any, inx: number) => (
                                            <Draggable
                                                key={obj.no}
                                                draggableId={`${obj.no}`}
                                                index={inx}>
                                                {(provided: any) => (
                                                    <ContentsLayout
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <ImageLayout>
                                                            <LazyImage
                                                                src={
                                                                    obj.imageUrl
                                                                }
                                                            />
                                                        </ImageLayout>
                                                        <Title>
                                                            {obj.title}
                                                        </Title>
                                                        <Contents>
                                                            {obj.contents}
                                                        </Contents>
                                                    </ContentsLayout>
                                                )}
                                            </Draggable>
                                        ),
                                    )}
                                    {provided.placeholder}
                                </VerticalContentsLayout>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </VerticalLayout>
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

const HorizontalLayout = styled.div`
    height: 300px;
    margin-right: 40px;
    overflow-x: auto;
`;

const HorizontalContentsLayout = styled.div`
    display: flex;
    width: 1000px;
    align-items: center;
    height: 100%;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    padding: 8px;
`;

const VerticalLayout = styled.div`
    height: 800px;
    overflow-y: auto;
`;

const VerticalContentsLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    padding: 8px;
`;

const ContentsLayout = styled.div<any>``;

const ImageLayout = styled.div`
    width: 100%;
    margin-bottom: 8px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    ${Ellipsis(1)}
`;

const Contents = styled.p`
    ${Ellipsis(2)};
`;

export default Reorder;
