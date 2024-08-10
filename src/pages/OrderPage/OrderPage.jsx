import React, { useEffect, useState } from 'react';
import { Container, TableTitle } from './style';
import { Button, Empty, Flex, Image, Tooltip } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperTable } from '../../components/AdminPageProduct/style';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonQuantity, InputQuantity, Price } from '../ProductDetailPage/style';
import { updateQuantity, removeOrder, calculatorOrderPrice } from '../../redux/slices/orderSlice'; 
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch(); // Khai báo dispatch để sử dụng
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        dispatch(calculatorOrderPrice(selectedRowKeys));
    }, [selectedRowKeys, order.orderItems, dispatch]);

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <Image
                    src={record.image}
                    alt="ảnh sản phẩm"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                />
            ),
        },
        {
            dataIndex: 'name',
            key: 'name',
            width: 400,
            render: (text) => (
                <Tooltip title={text}>
                    <span
                        style={{
                            maxWidth: '250px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                        }}
                    >
                        {text}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <span>{record.price.toLocaleString()} VND</span>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <Flex justify='flex-start' align='center'>
                    <ButtonQuantity onClick={() => record.amount > 1 ? dispatch(updateQuantity({ id: record.key, amount: record.amount - 1 })) : null}>
                        <MinusOutlined />
                    </ButtonQuantity>
                    <InputQuantity min={1} value={record.amount} onChange={(value) => {
                        dispatch(updateQuantity({ id: record.key, amount: value }));
                    }} />
                    <ButtonQuantity onClick={() => dispatch(updateQuantity({ id: record.key, amount: record.amount + 1 }))}>
                        <PlusOutlined />
                    </ButtonQuantity>
                </Flex>
            ),
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => `${(record.price * record.amount).toLocaleString()} VND`, // Tính tổng tiền
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        setSelectedRowKeys(prevSelectedRowKeys => 
                            prevSelectedRowKeys.filter(key => key !== record.key)
                        );
                        dispatch(removeOrder({ idProduct: record.key }))}
                    }
                />
            ),
        },
    ];



    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Container>
            <TableTitle>Giỏ hàng của tôi</TableTitle>
            <WrapperTable
                rowSelection={rowSelection}
                columns={columns}
                dataSource={order?.orderItems.map((item) => ({ ...item, key: item?.product }))}
                pagination={false}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_DEFAULT} 
                            description={
                                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                    Không có sản phẩm nào trong giỏ hàng
                                </span>
                            } 
                        />
                    ),
                }}
            />
            <Flex align='center' justify='space-between' style={{ backgroundColor: '#fff', margin: '20px 0', position: 'sticky', bottom: '0', height: '100px' }}>
                <span style={{ paddingLeft: '40px' }}>Sản phẩm đã chọn: {selectedRowKeys?.length}</span>
                <Flex align='center' justify='space-between' style={{ width: '40%', margin: '0 40px' }}>
                    <span>Tổng giá: <Price>{order?.orderPrice?.toLocaleString()} đ</Price></span>
                    <ButtonComponent name="Mua hàng"></ButtonComponent>
                </Flex>
            </Flex>
        </Container>
    );
}

export default OrderPage;
