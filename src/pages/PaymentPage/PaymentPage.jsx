import React, { useEffect, useState } from 'react';
import { Container, ListItemMetaStyled, PaymentOption, PaymentOptionContainer, TableTitle } from './style';
import { Alert, Checkbox, Col, Empty, Flex, Image, Input, List, Modal, Row, Select, Tooltip } from 'antd';
import { WrapperTable } from '../../components/AdminPageProduct/style';
import { useSelector } from 'react-redux';
import { Price } from '../ProductDetailPage/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import * as AddressService from '../../services/AddressService'
import * as OrderDetailService from '../../services/OrderDetailService'
import * as m from '../../components/MessageComponent/MessageComponent'
import * as CartService from '../../services/CartService'
import { CustomInput, CustomModal } from '../../components/AddressUser/style';
import { cities } from '../../asset/address_data/cities';
import { districts } from '../../asset/address_data/districts';
import { communes } from '../../asset/address_data/communes';
import MyMapComponent from '../../components/MyMapComponent/MyMapComponent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from '../../components/ButtonWrapper/ButtonWrapper';

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user)
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [addressMain, setAddressMain] = useState(false)
    const [phone, setPhone] = useState(user.phone)
    const [name, setName] = useState(user.name)
    const [showAlert, setShowAlert] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState({})
    const [center, setCenter] = useState({ lat: 10.8231, lng: 106.6297 });
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate()
    const { Option } = Select;

    const fetchAllAddressUser = async () => {
        const res = await AddressService.getAddressById(user?.id);
        return res?.data;
    }

    const { data: addresses } = useQuery({
        queryKey: ['addresses', user?.id],
        queryFn: fetchAllAddressUser,
        enabled: !!user?.id,  // Chỉ chạy khi user.id tồn tại
    });

    useEffect(() => {
        if (addresses) {
            if (addresses.length > 0) {
                const defaultAddress = selectedAddress || addresses?.find((address) => address.addressMain);
                setDefaultAddress(defaultAddress);
                setSelectedAddress(defaultAddress)
                setIsModalOpen(false); // Đóng modal nếu có địa chỉ
            } else {
                setIsModalOpen(true); // Mở modal nếu không có địa chỉ
            }
        }
    }, [addresses, setDefaultAddress, selectedAddress]);


    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <Flex justify='flex-start' align='center'>
                    <Image
                        src={record.productId.image}
                        alt="ảnh sản phẩm"
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover', margin: '0 20px' }}
                    />
                    <Tooltip title={record.productId.name} >
                        <span
                            style={{
                                maxWidth: '250px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                paddingLeft: '60px'
                            }}
                        >
                            {record.productId.name}
                        </span>
                    </Tooltip>
                </Flex>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <span>{record.productId.price.toLocaleString()} đ</span>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <Flex justify='flex-start' align='center'>
                    <span>{record.amount}</span>
                </Flex>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => `${(record.productId.price * record.amount).toLocaleString()} đ`, // Tính tổng tiền
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        if (phone && name && city && district && commune && homeNumber) {
            const userId = user.id
            const data = { phone, name, city, district, commune, addressMain: addresses.length > 0 ? addressMain : true, homeNumber, userId }
            const res = await AddressService.createAddress(data)
            if (res.status === 'OK') {
                m.success('Thêm mới địa chỉ thành công!')
                // Cập nhật lại danh sách địa chỉ
                queryClient.invalidateQueries(['addresses']);

                // Đặt địa chỉ mặc định mới
                setSelectedAddress(res?.data);
                console.log('res', res.data)
            }
            setCity('');
            setDistrict('');
            setCommune('');
            setHomeNumber('')
            setCenter({ lat: 10.8231, lng: 106.6297 });
            setPhone(user.phone)
            setName(user.name)
            setIsModalOpen(false);
            setShowAlert(false)
        } else {
            setShowAlert(true)
        }
    };

    // cập nhật địa chỉ
    const handleUpdate = async () => {
        if (phone && name && city && district && commune && homeNumber) {
            const userId = user?.id
            const data = { phone, name, city, district, commune, addressMain, homeNumber, userId }
            const res = await AddressService.updateAddress(selectedAddress._id, data)
            if (res.status === 'OK') {
                m.success('Cập nhật địa chỉ thành công!')
                queryClient.invalidateQueries(['addresses']);
                // Đặt địa chỉ mặc định mới
                setSelectedAddress(res?.data);
            }
            setCity('');
            setDistrict('');
            setCommune('');
            setHomeNumber('')
            setAddressMain(false)
            setCenter({ lat: 10.8231, lng: 106.6297 });
            setIsModalOpen(false);
            setPhone(user.phone)
            setName(user.name)
            setIsModalUpdateOpen(false);
            setShowAlert(false)
        } else {
            setShowAlert(true)
        }
    }

    const handleCancel = () => {
        setCity('');
        setDistrict('');
        setCommune('');
        setHomeNumber('')
        setCenter({ lat: 10.8231, lng: 106.6297 });
        if (isModalOpen && addresses.length === 0) {
            setIsModalOpen(false);
            navigate(`/order`)
        }
        setIsModalOpen(false);
        setPhone(user.phone)
        setName(user.name)
        setShowAlert(false)
        setIsModalVisible(false);
        setIsModalUpdateOpen(false)
    };

    const handleSelectAddress = (address) => {
        // Xử lý khi người dùng chọn địa chỉ
        setSelectedAddress(address);
        setIsModalVisible(false);
    };

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const handlePlaceChanged = (e) => {
        setHomeNumber(e.target.value)
    };

    const handleAdd = () => {
        setIsModalVisible(false)
        setIsModalOpen(true)
    }

    const onChange = (e) => {
        setAddressMain(e.target.checked)
    };

    const handleOpenModalUpdate = (address) => {
        setIsModalUpdateOpen(true)
        setCity(address.city);
        setDistrict(address.district);
        setCommune(address.commune);
        setHomeNumber(address.homeNumber);
        setAddressMain(address.addressMain);
    }

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleOrder = async() => {
        if (!selectedOption) {
            return m.warning("Bạn cần phải chọn phương thức thanh toán!")
        } else if (selectedOption === 'paypal') {
            navigate('/payment-processing')
        } else {
            const createOrder = await OrderDetailService.createDetailOrder(user.id, {
                items: order.items,
                addressId: selectedAddress?._id,
                orderPrice: order.orderPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                payMethod: selectedOption,
                totalPrice: order.taxPrice,
            })
            if(createOrder.status === 'OK'){
                const ids = order.items.map(item => (item.productId._id))
                const data = {
                    productIds : ids,
                    userId: user.id
                }
                await CartService.deleteManyItem(data)
                navigate('/order-success')
            }
            else{
                alert({message: 'Hệ thống đang cập nhật vui lòng thử lại vào lúc khác'})
            }
        }
    }
    // console.log('userID', user)
    console.log('order', order)
    return (
        <Container>
            <TableTitle>Thanh toán</TableTitle>
            {/* Hiển thị địa chỉ mặc định */}
            {addresses?.length > 0 ? (
                <div style={{ marginBottom: '16px', backgroundColor: '#fff' }}>
                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                        <Col span={20}>
                            <Flex style={{ flexDirection: 'column', padding: '10px 20px' }}>
                                <Flex align='center' justify='flex-start'>
                                    <span>{defaultAddress?.name}</span>
                                    <span style={{ padding: '0 8px', color: '#bbb' }}>|</span>
                                    <span style={{ color: '#bbb' }}>{defaultAddress?.phone}</span>
                                </Flex>
                                <span style={{ color: '#bbb', padding: '8px 0' }}>Địa chỉ: {`${defaultAddress?.homeNumber}, ${defaultAddress?.commune}, ${defaultAddress?.district}, ${defaultAddress?.city}`}</span>
                            </Flex>
                        </Col>
                        <Col span={4}>
                            <Link onClick={showModal}>Chọn địa chỉ khác</Link>
                        </Col>
                    </Row>
                </div>
            ) : (
                <CustomModal title="Thêm địa chỉ để đặt hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
                    {showAlert && (
                        <Alert
                            message="Bạn cần điền đầy đủ thông tin!"
                            type="warning"
                            closable
                            onClose={() => setShowAlert(false)}
                        />
                    )}
                    <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                        <CustomInput
                            placeholder='Số điện thoại'
                            onChange={onChangePhone}
                            value={phone}
                            required
                        />
                        <CustomInput
                            placeholder='Tên người dùng'
                            onChange={onChangeName}
                            value={name}
                            required
                        />
                    </Flex>
                    <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                        <Select
                            showSearch
                            placeholder="Thành phố"
                            style={{ width: '170px' }}
                            dropdownStyle={{ width: '550px' }}
                            value={city || undefined}
                            onChange={value => {
                                setCity(value);
                                setDistrict('');
                                setCommune('');
                            }}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {cities.map(city => (
                                <Option key={city.city} value={city.city}>
                                    {city.city}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            showSearch
                            placeholder="Quận / Huyện"
                            dropdownStyle={{ width: '550px', position: 'absolute', left: '50%', marginLeft: '-275px' }}
                            style={{ width: '170px' }}
                            value={district || undefined}
                            onChange={setDistrict}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            disabled={!city}
                        >
                            {districts
                                .filter(dis => dis.city === city)
                                .map(dis => (
                                    <Option key={dis.district} value={dis.district}>
                                        {dis.district}
                                    </Option>
                                ))}
                        </Select>

                        <Select
                            showSearch
                            placeholder="Phường / Xã"
                            style={{ width: '170px' }}
                            value={commune || undefined}
                            onChange={setCommune}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            dropdownStyle={{ width: '550px' }}
                            placement='bottomRight'
                            disabled={!district}
                        >
                            {communes
                                .filter(com => com.district === district)
                                .map(com => (
                                    <Option key={com.commune} value={com.commune}>
                                        {com.commune}
                                    </Option>
                                ))}
                        </Select>
                    </Flex>
                    <div style={{ marginBottom: '14px' }}>
                        <Input
                            placeholder='Nhập địa chỉ cụ thể (số nhà, đường, thôn, xóm, làng)'
                            onChange={handlePlaceChanged}
                            value={homeNumber}
                            disabled={!commune}
                        />
                    </div>
                    <MyMapComponent center={center} />
                    <Checkbox style={{ marginTop: '14px' }} checked={true} disabled={true} >Đặt làm địa chỉ chính</Checkbox>
                </CustomModal>
            )}
            {addresses?.length > 0 && (
                <CustomModal title="Thêm địa chỉ để đặt hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
                    {showAlert && (
                        <Alert
                            message="Bạn cần điền đầy đủ thông tin!"
                            type="warning"
                            closable
                            onClose={() => setShowAlert(false)}
                        />
                    )}
                    <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                        <CustomInput
                            placeholder='Số điện thoại'
                            onChange={onChangePhone}
                            value={phone}
                            required
                        />
                        <CustomInput
                            placeholder='Tên người dùng'
                            onChange={onChangeName}
                            value={name}
                            required
                        />
                    </Flex>
                    <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                        <Select
                            showSearch
                            placeholder="Thành phố"
                            style={{ width: '170px' }}
                            dropdownStyle={{ width: '550px' }}
                            value={city || undefined}
                            onChange={value => {
                                setCity(value);
                                setDistrict('');
                                setCommune('');
                            }}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {cities.map(city => (
                                <Option key={city.city} value={city.city}>
                                    {city.city}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            showSearch
                            placeholder="Quận / Huyện"
                            dropdownStyle={{ width: '550px', position: 'absolute', left: '50%', marginLeft: '-275px' }}
                            style={{ width: '170px' }}
                            value={district || undefined}
                            onChange={setDistrict}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            disabled={!city}
                        >
                            {districts
                                .filter(dis => dis.city === city)
                                .map(dis => (
                                    <Option key={dis.district} value={dis.district}>
                                        {dis.district}
                                    </Option>
                                ))}
                        </Select>

                        <Select
                            showSearch
                            placeholder="Phường / Xã"
                            style={{ width: '170px' }}
                            value={commune || undefined}
                            onChange={setCommune}
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            dropdownStyle={{ width: '550px' }}
                            placement='bottomRight'
                            disabled={!district}
                        >
                            {communes
                                .filter(com => com.district === district)
                                .map(com => (
                                    <Option key={com.commune} value={com.commune}>
                                        {com.commune}
                                    </Option>
                                ))}
                        </Select>
                    </Flex>
                    <div style={{ marginBottom: '14px' }}>
                        <Input
                            placeholder='Nhập địa chỉ cụ thể (số nhà, đường, thôn, xóm, làng)'
                            onChange={handlePlaceChanged}
                            value={homeNumber}
                            disabled={!commune}
                        />
                    </div>
                    <MyMapComponent center={center} />
                    <Checkbox style={{ marginTop: '14px' }} onChange={onChange} checked={addressMain}>Đặt làm địa chỉ chính</Checkbox>
                </CustomModal>
            )}
            <CustomModal title="Cập nhật địa chỉ" open={isModalUpdateOpen} onOk={handleUpdate} onCancel={handleCancel} width={600}>
                {showAlert && (
                    <Alert
                        message="Bạn cần điền đầy đủ thông tin!"
                        type="warning"
                        closable
                        onClose={() => setShowAlert(false)}
                    />
                )}
                <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                    <CustomInput
                        placeholder='Số điện thoại'
                        onChange={onChangePhone}
                        value={phone}
                        required
                    />
                    <CustomInput
                        placeholder='Tên người dùng'
                        onChange={onChangeName}
                        value={name}
                        required
                    />
                </Flex>
                <Flex justify='space-between' align='center' style={{ margin: '14px 0' }}>
                    <Select
                        showSearch
                        placeholder="Thành phố"
                        style={{ width: '170px' }}
                        dropdownStyle={{ width: '550px' }}
                        value={city || undefined}
                        onChange={value => {
                            setCity(value);
                            setDistrict('');
                            setCommune('');
                        }}
                        filterOption={(input, option) =>
                            (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {cities.map(city => (
                            <Option key={city.city} value={city.city}>
                                {city.city}
                            </Option>
                        ))}
                    </Select>

                    <Select
                        showSearch
                        placeholder="Quận / Huyện"
                        dropdownStyle={{ width: '550px', position: 'absolute', left: '50%', marginLeft: '-275px' }}
                        style={{ width: '170px' }}
                        value={district || undefined}
                        onChange={setDistrict}
                        filterOption={(input, option) =>
                            (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        disabled={!city}
                    >
                        {districts
                            .filter(dis => dis.city === city)
                            .map(dis => (
                                <Option key={dis.district} value={dis.district}>
                                    {dis.district}
                                </Option>
                            ))}
                    </Select>

                    <Select
                        showSearch
                        placeholder="Phường / Xã"
                        style={{ width: '170px' }}
                        value={commune || undefined}
                        onChange={setCommune}
                        filterOption={(input, option) =>
                            (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        dropdownStyle={{ width: '550px' }}
                        placement='bottomRight'
                        disabled={!district}
                    >
                        {communes
                            .filter(com => com.district === district)
                            .map(com => (
                                <Option key={com.commune} value={com.commune}>
                                    {com.commune}
                                </Option>
                            ))}
                    </Select>
                </Flex>
                <div style={{ marginBottom: '14px' }}>
                    <Input
                        placeholder='Nhập địa chỉ cụ thể (số nhà, đường, thôn, xóm, làng)'
                        onChange={handlePlaceChanged}
                        value={homeNumber}
                        disabled={!commune}
                    />
                </div>
                <MyMapComponent center={center} />
                <Checkbox onChange={onChange} style={{ marginTop: '14px' }} checked={addressMain} disabled={selectedAddress?.addressMain ? true : false} >Đặt làm địa chỉ chính</Checkbox>
            </CustomModal>

            <WrapperTable
                columns={columns}
                dataSource={order?.items.map((item) => ({ ...item, key: item?._id }))}
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

            <PaymentOptionContainer>
                <span>Chọn phương thức thanh toán: </span>
                <PaymentOption
                    className={selectedOption === 'cod' ? 'selected' : ''}
                    onClick={() => handleSelectOption('cod')}
                >
                    Thanh toán khi nhận hàng
                </PaymentOption>
                <PaymentOption
                    className={selectedOption === 'paypal' ? 'selected' : ''}
                    onClick={() => handleSelectOption('paypal')}
                >
                    Thanh toán Paypal
                </PaymentOption>
            </PaymentOptionContainer>

            <Flex
                align='flex-end'
                style={{
                    backgroundColor: '#fff',
                    margin: '20px 0',
                    position: 'sticky',
                    bottom: '0',
                    flexDirection: 'column',
                    padding: '20px 40px'
                }}
            >
                <span style={{ alignSelf: 'flex-end', marginBottom: '20px' }}>
                    Tổng giá: <Price>{order?.orderPrice?.toLocaleString()} đ</Price>
                </span>

                {selectedOption === 'paypal' ? (
                    <Flex
                        align='center'
                        justify='space-between'
                        style={{
                            width: '100%',
                        }}
                    >
                        <span style={{ color: '#bbb' }}>
                            Thực hiện thanh toán để đặt hàng!
                        </span>
                        <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_CLIENT_ID, components: "buttons", currency: "USD" }}>
                            <ButtonWrapper showSpinner={false} />
                        </PayPalScriptProvider>
                    </Flex>

                ) :
                    (
                        <Flex
                            align='center'
                            justify='space-between'
                            style={{
                                width: '100%',
                            }}
                        >
                            <span style={{ color: '#bbb' }}>
                                Khi ấn "đặt hàng" bạn đã chấp nhận với điều khoản của chúng tôi!
                            </span>
                            <ButtonComponent name="Đặt hàng" onClick={handleOrder} />
                        </Flex>
                    )}
            </Flex>



            {/* Modal hiển thị danh sách địa chỉ */}
            <Modal
                title="Chọn địa chỉ giao hàng"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <List
                    dataSource={addresses}
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => handleSelectAddress(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <ListItemMetaStyled
                                title={<Flex justify='space-between'>
                                    {`${item.name} | ${item.phone}`}
                                    <Link style={{ fontWeight: '300' }} onClick={() => handleOpenModalUpdate(item)}>Cập nhật</Link>
                                </Flex>}
                                description={<>
                                    <Flex justify='space-between' align='center'>
                                        {`Địa chỉ: ${item.homeNumber}, ${item.commune}, ${item.district}, ${item.city}`}
                                        {item.addressMain && (
                                            <span style={{ color: 'rgb(248, 75, 47)' }}>Mặc định</span>
                                        )}
                                    </Flex>
                                </>}
                            />
                        </List.Item>
                    )}
                />
                <Flex justify='flex-end'>
                    <ButtonComponent name='Thêm' width='50px' onClick={handleAdd} />
                </Flex>
            </Modal>
        </Container>
    );
}

export default PaymentPage;
