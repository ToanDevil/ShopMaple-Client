import React, { useEffect, useState } from 'react';
import { Divider, Flex, Select, Input, Checkbox, Alert, Row, Col } from 'antd';
import { CustomInput, CustomModal, WrapperContent } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Empty from '../../asset/images/Empty.png';
import { cities } from '../../asset/address_data/cities';
import { districts } from '../../asset/address_data/districts';
import { communes } from '../../asset/address_data/communes';
import MyMapComponent from '../MyMapComponent/MyMapComponent';
import { useSelector } from 'react-redux';
import * as AddressService from '../../services/AddressService'
import * as m from '../MessageComponent/MessageComponent'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AddressUser = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [homeNumber, setHomeNumber] = useState('');
  const [addressMain, setAddressMain] = useState()
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user)
  const [phone, setPhone] = useState(user.phone)
  const [name, setName] = useState(user.name)
  const [showAlert, setShowAlert] = useState(false)
  const [address, setAddress] = useState({})
  const [center, setCenter] = useState({ lat: 10.8231, lng: 106.6297 });
  const { Option } = Select;

  const showModal = () => {
    setIsModalOpen(true);
  };
  // Thêm mới địa chỉ
  const handleOk = async () => {
    if (phone && name && city && district && commune && homeNumber) {
      const userId = user.id
      const data = { phone, name, city, district, commune, addressMain, homeNumber, userId }
      const res = await AddressService.createAddress(data)
      if (res.status === 'OK') {
        m.success('Thêm mới địa chỉ thành công!')
        queryClient.invalidateQueries(['addresses']);
        console.log('res', res)
      }
      setCity('');
      setDistrict('');
      setCommune('');
      setHomeNumber('')
      setCenter({ lat: 10.8231, lng: 106.6297 });
      setIsModalOpen(false);
      setPhone(user.phone)
      setName(user.name)
      setIsModalOpen(false);
      setShowAlert(false)
    } else {
      setShowAlert(true)
    }
  };

  const handleCancel = () => {
    setCity('');
    setDistrict('');
    setCommune('');
    setHomeNumber('')
    setCenter({ lat: 10.8231, lng: 106.6297 });
    setIsModalOpen(false);
    setAddressMain(false)
    setPhone(user.phone)
    setName(user.name)
    setShowAlert(false)
    setIsModalUpdateOpen(false)
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setAddressMain(e.target.checked)
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
  // Danh sách địa chỉ người dùng
  const fetchAllAddressUser = async () => {
    const res = await AddressService.getAddressById(user.id);
    return res;
  };
  const { data: addresses } = useQuery({ queryKey: ['addresses'], queryFn: fetchAllAddressUser });
  useEffect(() => {
    const checkAddressMain = addresses?.data?.filter(address => address.addressMain);
    if (checkAddressMain && checkAddressMain.length > 0) {
      setAddressMain(false);
      setDisabled(false)
    } else {
      setAddressMain(true);
      setDisabled(true)
    }
  }, [addresses]);

  // Xóa địa chỉ
  const handleDeleteAddress = async (addressId) => {
    const res = await AddressService.deleteAddressById(addressId);
    if (res.status === 'OK') {
      m.success('Xóa địa chỉ thành công!')
      queryClient.invalidateQueries(['addresses']);
    }
  }
  // lấy địa chỉ theo id
  const handleGetDetailAddress = async (addressId) => {
    const ad = await AddressService.getAddressById(addressId);
    setIsModalUpdateOpen(true);
    const currentAddress = ad.data[0];
    setAddress(currentAddress);
    setCity(currentAddress.city);
    setDistrict(currentAddress.district);
    setCommune(currentAddress.commune);
    setHomeNumber(currentAddress.homeNumber);
    setAddressMain(currentAddress.addressMain);
  }
  // cập nhật địa chỉ
  const handleUpdate = async () => {
    if (phone && name && city && district && commune && homeNumber) {
      const userId = user.id
      const data = { phone, name, city, district, commune, addressMain, homeNumber, userId }
      const res = await AddressService.updateAddress(address._id, data)
      if (res.status === 'OK') {
        m.success('Cập nhật địa chỉ thành công!')
        queryClient.invalidateQueries(['addresses']);
        console.log('res', res)
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
  // đặt địa chỉ làm mặc định
  const handleSetAddressMain = async (id) => {
    const res = await AddressService.updateAddress(id, { addressMain: true, userId: user.id })
    queryClient.invalidateQueries(['addresses']);
    console.log(res)
  }

  return (
    <WrapperContent span={20}>
      <div>
        <h2>Địa chỉ cá nhân</h2>
        <Flex justify='space-between' align='center'>
          <span>Quản lý thông tin để được bảo mật</span>
          <ButtonComponent name="+ Thêm địa chỉ" onClick={showModal}></ButtonComponent>
        </Flex>
      </div>
      <Divider></Divider>
      <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        {addresses?.data && addresses?.data.length > 0 ? (
          addresses.data.map((address) => (
            <div key={address._id} style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', marginBottom: '16px' }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={20}>
                  <Flex style={{ flexDirection: 'column', padding: '10px' }}>
                    <Flex align='center' justify='flex-start'>
                      <span>{address.name}</span>
                      <span style={{ padding: '0 8px', color: '#bbb' }}>|</span>
                      <span style={{ color: '#bbb' }}>{address.phone}</span>
                    </Flex>
                    <span style={{ color: '#bbb', padding: '8px 0' }}>Địa chỉ: {`${address.homeNumber}, ${address.commune}, ${address.district}, ${address.city}`}</span>
                    {address.addressMain === true ? (
                      <span style={{ color: 'rgb(248, 75, 47)' }}>Mặc định</span>
                    ) : null}
                  </Flex>
                </Col>
                <Col span={4}>
                  <Flex style={{ justifyContent: 'space-around', alignItems: 'center', marginBottom: '8px' }}>
                    <Link onClick={() => handleGetDetailAddress(address._id)}>Cập nhật</Link>
                    { address.addressMain && addresses?.data.length > 1  ? 
                      (null) 
                      : (<Link onClick={() => handleDeleteAddress(address._id)}>Xóa</Link>)
                    }
                  </Flex>
                  {address.addressMain === true ?
                    (
                      <Flex style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <ButtonComponent name={'Đặt làm mặc định'} color='#bbb' width='70px' disabled />
                      </Flex>
                    ) :
                    (
                      <Flex style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <ButtonComponent name={'Đặt làm mặc định'} color='#bbb' width='70px' onClick={() => handleSetAddressMain(address._id)} />
                      </Flex>
                    )
                  }
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <Flex align='center' justify='center' style={{ flexDirection: 'column' }}>
            <img src={Empty} alt='empty'></img>
            <span>Bạn chưa có địa chỉ nào</span>
          </Flex>
        )}
      </div>
      <CustomModal title="Thêm mới địa chỉ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
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
        <Checkbox onChange={onChange} style={{ marginTop: '14px' }} checked={addressMain} disabled={disabled} >Đặt làm địa chỉ chính</Checkbox>
      </CustomModal>

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
        <Checkbox onChange={onChange} style={{ marginTop: '14px' }} checked={addressMain} disabled={address.addressMain ? true : false} >Đặt làm địa chỉ chính</Checkbox>
      </CustomModal>
    </WrapperContent>
  );
}

export default AddressUser;
