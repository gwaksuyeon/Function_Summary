import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

import PIE_CAHRT_DATA_JSON from './pieChartData.json';
import LINE_CAHRT_DATA_JSON from './lineChartData.json';

const Chart: React.FC = () => {
    const [pieData, setPieData] = useState<any>('');
    const [lineData, setLineData] = useState<any>('');

    const onReadPie = () => {
        setPieData(PIE_CAHRT_DATA_JSON);
    };

    const onReadLine = () => {
        setLineData(LINE_CAHRT_DATA_JSON);
    };

    useEffect(() => {
        onReadPie();
        onReadLine();
    }, []);

    return (
        <Container>
            <PieChartLayout>
                <ResponsivePie
                    data={pieData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                    }}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]],
                    }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </PieChartLayout>

            <LineChartLayout>
                <ResponsiveLine
                    data={lineData}
                    margin={{ top: 60, right: 60, bottom: 100, left: 60 }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                    }}
                    axisLeft={{
                        tickSize: 5,
                    }}
                    enablePointLabel={true}
                    animate={true}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            translateX: 0,
                            translateY: 60,
                        },
                    ]}
                />
            </LineChartLayout>
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

const PieChartLayout = styled.div`
    flex: 0 0 50%;
    height: 500px;
`;

const LineChartLayout = styled.div`
    flex: 0 0 50%;
    height: 500px;
`;

export default Chart;
