import React from 'react';

interface Props {
    checked?: boolean;
}
const CheckBox: React.FC<Props> = ({ checked }) => {
    return checked ? (
        <svg width="20" height="20" viewBox="0 0 20 20">
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-16 -503) translate(16 503)">
                    <rect width="20" height="20" fill="#89ACFF" rx=".875" />
                    <path
                        stroke="#FFF"
                        strokeWidth="1.2"
                        d="M5.02 8.946L8.658 12.782 15.124 6.429"
                    />
                </g>
            </g>
        </svg>
    ) : (
        <svg width="20" height="20" viewBox="0 0 20 20">
            <g fill="none" fillRule="evenodd">
                <g stroke="#DEE1E6">
                    <g>
                        <g transform="translate(-16 -2112) translate(16 2112)">
                            <rect
                                width="19"
                                height="19"
                                x=".5"
                                y=".5"
                                rx=".875"
                            />
                        </g>
                    </g>
                    <g strokeWidth="1.2">
                        <g>
                            <path
                                d="M0.02 2.946L3.658 6.782 10.124 0.429"
                                transform="translate(-16 -2112) translate(16 2112) translate(5 6)"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default CheckBox;
