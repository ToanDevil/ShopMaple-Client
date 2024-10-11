import { ConfigProvider, Steps } from 'antd';
import React from 'react';
import { FileTextOutlined, CreditCardOutlined, TruckOutlined, GiftOutlined, StarOutlined } from '@ant-design/icons';
import { StyledSteps } from './style';

const FlowingOrderComponent = ({ status }) => {
    const { Step } = Steps;

    // Mapping trạng thái status với các bước trong Steps
    const stepStatus = {
        Pending: 0, // Chờ xác nhận từ người bán
        Processing: 1,  // Đơn hàng đã đặt
        Shipped: 2,    // Đã giao cho đơn vị vận chuyển
        Delivered: 3, // Đã giao
        completed: 4, // Đánh giá
    };

    const iconStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '3px solid', // Đường viền xung quanh icon
        fontSize: '20px',
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgb(41,195,88)'
                },
            }}
        >
            <StyledSteps current={stepStatus[status]} direction="horizontal" labelPlacement="vertical">
                <Step title="Chờ Xác Nhận" icon={<div style={iconStyle}><FileTextOutlined /></div>} />
                <Step title="Người Gửi Đang Chuẩn Bị Hàng" icon={<div style={iconStyle}><CreditCardOutlined /></div>} />
                <Step title="Đã Giao Cho ĐVVC" icon={<div style={iconStyle}><TruckOutlined /></div>} />
                <Step title="Đã Giao" icon={<div style={iconStyle}><GiftOutlined /></div>} />
                <Step title="Đánh Giá" icon={<div style={iconStyle}><StarOutlined /></div>} />
            </StyledSteps>

        </ConfigProvider>
    );
}

export default FlowingOrderComponent;
