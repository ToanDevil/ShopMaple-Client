import React, { useRef, useState } from 'react';
import { WrapperContainer, WrapperFlex, WrapperHeader, WrapperSpan } from '../AdminPageListUser/style';
import { Button, Flex, Table, Tooltip, Row, Col, Image, Avatar, Switch, Input, Space } from 'antd';
import { EyeOutlined, DeleteOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import * as UserService from '../../services/UserService';
import { WrapperModal } from '../AdminPageProduct/style';
import Highlighter from 'react-highlight-words';
import { format } from 'date-fns';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


const AdminPageListUser = () => {
  // const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      if (!record.name) return false;
      const recordValue = dataIndex === 'phone' ? '0' + record[dataIndex] : record[dataIndex];
      return recordValue.toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => {
        if (!a.name && !b.name) return 0;
        if (!a.name) return -1;
        if (!b.name) return 1;
        return a.name.localeCompare(b.name);
      },
      ...getColumnSearchProps('username'),
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
            {text ? text : ''}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      render: (text, record) => (
        <span>{'0' + record.phone}</span>
      ),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      render: (text, record) => (
        <span>{record?.mainAddress?.city || "Chưa cập nhật"}</span>
      ),
      key: 'address',
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        {
          text: 'Không rõ',
          value: 0,
        },
        {
          text: 'Nam',
          value: 1,
        },
        {
          text: 'Nữ',
          value: 2,
        },
      ],
      // filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex === value,
      render: (text, record) => (
        <>
          {record.sex === 2 && 'Nữ'}
          {record.sex === 1 && 'Nam'}
          {record.sex === 0 && 'Không rõ'}
        </>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => (
        <>
          {format(new Date(record.createdAt), 'dd/MM/yyyy HH:mm:ss')}
        </>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Switch checked={record.status === 'online'} />
      ),
    },
    {
      title: 'Hành động',
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
  const [loadingData, setLoadingData] = useState(true) //loading dữ liệu khi mới tải trang

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
    if (res) { setLoadingData(false) }
    return res;
  };

  const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchAllUser });

  const handleGetDetail = (record) => {
    console.log('detailUser', record)
    setSelectedUser(record);
    setIsDetailModalOpen(true);
  };

  const handleCancelDetailModal = () => {
    setSelectedUser(null);
    setIsDetailModalOpen(false);
  };

  return (
    <>
      {loadingData ? (<LoadingComponent></LoadingComponent>) : (
        <WrapperContainer>
          <WrapperHeader>Danh sách Người dùng</WrapperHeader>
          <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                Reload
              </Button>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </Flex>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={users?.data?.map((user) => ({ ...user, key: user._id }))}
              pagination={{ pageSize: 5 }}
            />
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
                    <WrapperSpan><strong>Tên đăng nhập:</strong> {selectedUser.username}</WrapperSpan>
                    <WrapperSpan><strong>Địa chỉ:</strong> {selectedUser.mainAddress ? (<>{selectedUser.mainAddress?.homeNumber}, {selectedUser.mainAddress?.commune}, {selectedUser.mainAddress?.district}, {selectedUser.mainAddress?.city}</>) : ("Chưa cập nhật")}</WrapperSpan>
                    {selectedUser.sex === 0 && (<WrapperSpan><strong>Giới tính:</strong> Không rõ</WrapperSpan>)}
                    {selectedUser.sex === 1 && (<WrapperSpan><strong>Giới tính:</strong> Nam</WrapperSpan>)}
                    {selectedUser.sex === 2 && (<WrapperSpan><strong>Giới tính:</strong> Nữ</WrapperSpan>)}
                    <WrapperSpan><strong>Ngày sinh:</strong> {format(new Date(selectedUser.dob), 'dd/MM/yyyy')}</WrapperSpan>
                    <WrapperSpan><strong>Ngày tạo tài khoản:</strong> {format(new Date(selectedUser.createdAt), 'dd/MM/yyyy HH:mm:ss')}</WrapperSpan>
                  </WrapperFlex>
                </Col>
              </Row>

            )}
          </WrapperModal>
        </WrapperContainer>
      )}
    </>


  );
};

export default AdminPageListUser;