import React, { useEffect, useState } from 'react';
import { WrapperContainer, WrapperFlex, WrapperHeader, WrapperSpan } from '../AdminPageListUser/style';
import { Button, Flex, Table, Tooltip, Row, Col, Image, Avatar, Switch } from 'antd';
import { EyeOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import * as m from '../../components/MessageComponent/MessageComponent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as UserService from '../../services/UserService';
import { WrapperModal } from '../AdminPageProduct/style';


const AdminPageListUser = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Tooltip title={text}>
          <span
            style={{
              maxWidth: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-block',
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => (
        <>
          {record.sex === 2 && 'Nữ'}
          {record.sex === 1 && 'Nam'}
          {record.sex === 0 && 'Không rõ'}
        </>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Switch checked={record.status === 'online'} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleGetDetail(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
          // onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  // Xóa người dùng
  // const deleteMutation = useMyMutationHook(async (id) => {
  //   const res = await UserService.deleteUser(id);
  //   queryClient.invalidateQueries(['users']);
  //   return res;
  // });

  // const handleDelete = (key) => {
  //   // deleteMutation.mutate(key);
  //   // m.success('Xóa thành công');
  // };

  // hiển thị danh sách người dùng
  const fetchAllUser = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchAllUser });

  const handleGetDetail = (record) => {
    setSelectedUser(record);
    setIsDetailModalOpen(true);
  };

  const handleCancelDetailModal = () => {
    setSelectedUser(null);
    setIsDetailModalOpen(false);
  };

  return (

    <WrapperContainer>
      <WrapperHeader>Danh sách Người dùng</WrapperHeader>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>
        <Table rowSelection={rowSelection} columns={columns} dataSource={users?.data?.map((user) => ({ ...user, key: user._id }))} pagination={{ pageSize: 5 }} />
      </Flex>
      <WrapperModal
        title="Chi tiết Người dùng"
        open={isDetailModalOpen}
        width={1000}
        onCancel={handleCancelDetailModal}
        footer={[
          <Button key="close" onClick={handleCancelDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedUser && (
          <Row gutter={16}>
            <Col span={8}>
              <WrapperFlex justify='center' align='center'>
                {selectedUser.avatar ? (
                  <Image
                    src={selectedUser.avatar}
                    alt="avatar"
                    style={{ width: '105px', height: '105px', borderRadius: '50%', objectFit: 'cover', marginTop: '24px' }}
                  />
                ) : (
                  <Avatar style={{ width: '105px', height: '105px' }} icon={<UserOutlined />} />
                )}
                <span><strong>Email</strong>: {selectedUser.email}</span>
                <span><strong>Phone</strong>: {'0' + selectedUser.phone}</span>
              </WrapperFlex>
            </Col>
            <Col span={16}>
              <WrapperFlex justify='center' align='flex-start'>
                <WrapperSpan><strong>Username:</strong> {selectedUser.username}</WrapperSpan>
                <WrapperSpan><strong>Address:</strong> {selectedUser.address}</WrapperSpan>
                {selectedUser.sex === 0 && (<WrapperSpan><strong>Gender:</strong> Không rõ</WrapperSpan>)}
                {selectedUser.sex === 1 && (<WrapperSpan><strong>Gender:</strong> Nam</WrapperSpan>)}
                {selectedUser.sex === 2 && (<WrapperSpan><strong>Gender:</strong> Nữ</WrapperSpan>)}
                <WrapperSpan><strong>Date of birth:</strong> {selectedUser.dob}</WrapperSpan>
                <WrapperSpan><strong>Created At:</strong> {selectedUser.createdAt}</WrapperSpan>
                <WrapperSpan><strong>Status:</strong> {selectedUser.status}</WrapperSpan>
              </WrapperFlex>
            </Col>
          </Row>

        )}
      </WrapperModal>
    </WrapperContainer>

  );
};

export default AdminPageListUser;