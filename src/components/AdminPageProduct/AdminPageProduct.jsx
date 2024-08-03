import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WrapperContainer, WrapperHeader } from '../AdminPageListUser/style';
import { Button, Col, Flex, Row, Input, Select, Form, Tooltip, Image, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { WrapperModal, WrapperForm, WrapperReactQuill, WrapperTable, WrapperUpload } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import 'react-quill/dist/quill.snow.css';
import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMyMutationHook } from '../../hooks/useMutationHook';
import * as m from '../../components/MessageComponent/MessageComponent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Highlighter from 'react-highlight-words';

const AdminPageProduct = () => {
  const queryClient = useQueryClient();
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Image',
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    quantity: '',
  });
  const [form] = Form.useForm();
  

  const mutation = useMyMutationHook(async (data) => {
    const res = await ProductService.createProduct(data);
    return res.data;
  });

  const { data, isSuccess } = mutation;
  const handleCancel = useCallback(() => {
    setStateProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      quantity: '',
    });
    setIsModalOpen(false);
    setIsUpdateModalOpen(false);
    form.resetFields();
    setDescription('');
  }, [form]);
  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      m.success('Thêm sản phẩm thành công');
      queryClient.invalidateQueries(['products']);
      handleCancel()
    } else if (data?.status === 'ERR') {
      m.error('Sản phẩm này đã tồn tại');
    }
  }, [isSuccess, data, queryClient, handleCancel]);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const onFinish = async (values) => {
    if (isUpdateModalOpen) {
      updateMutation.mutate({
        name: values.name,
        price: values.price,
        type: values.type,
        quantity: values.quantity,
        image: stateProduct.image,
        description: values.description,
      });
    } else {
      mutation.mutate({
        name: values.name,
        price: values.price,
        type: values.type,
        quantity: values.quantity,
        image: stateProduct.image,
        description: values.description,
      });
    }
  };

  // Xóa sản phẩm
  const deleteMutation = useMyMutationHook(async (id) => {
    const res = await ProductService.deleteProduct(id)
    queryClient.invalidateQueries(['products']);
    return res
  });

  const handleDelete = (key) => {
    deleteMutation.mutate(key);
    m.success('Xóa thành công')
  };

  //Xóa nhiều sản phẩm
  const deleteManyMutation = useMyMutationHook(async (ids) => {
    const res = await ProductService.deleteManyProduct(ids)
    queryClient.invalidateQueries(['products']);
    return res
  });

  const handleDeleteMany = () => {
    console.log('Selected IDs:', selectedRowKeys);
    deleteManyMutation.mutate(selectedRowKeys);
    start()
    m.success('Xóa thành công')
  }

  // hiển thị danh sách sản phẩm
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchAllProduct });

  // Cập nhật sản phẩm
  const updateMutation = useMyMutationHook(
    async (data) => {
      const res = await ProductService.updateProduct(editingProduct.key, data)
      return res.data
    }
  )
  const updateData = updateMutation.data;
  const updateSuccess = updateMutation.isSuccess;

  useEffect(() => {
    if (updateSuccess && updateData?.status === 'OK') {
      m.success('Cập nhật sản phẩm thành công')
      queryClient.invalidateQueries(['products']);
      handleCancel();
    } else if (updateData?.status === 'ERR') {
      m.error('Cập nhật sản phẩm thất bại')
    }
  }, [updateData, updateSuccess, queryClient, handleCancel])

  const handleUpdate = (record) => {
    setEditingProduct(record);
    setIsUpdateModalOpen(true);
    setStateProduct(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      type: record.type,
      quantity: record.quantity,
      description: record.description
    });
    setDescription(record.description);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
    form.setFieldsValue({
      image: file.preview,
    });
  };
  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: ({ file, onSuccess }) => {
      // Handle the custom upload request
      // You can use a service to upload the file
      onSuccess(); // Call onSuccess to indicate the file was uploaded
    },
    onChange: onChangeImage,
  };

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const { Option } = Select;

  return (
    <WrapperContainer>
      <WrapperHeader>Quản lý Sản phẩm</WrapperHeader>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button type="primary" danger onClick={handleDeleteMany} disabled={!hasSelected}>
            Delete
          </Button>
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          <Button onClick={showModal}>
            <PlusOutlined />
          </Button>
          <WrapperModal title="Thêm mới sản phẩm" open={isModalOpen} onCancel={handleCancel} width={1000}>
            <WrapperForm
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Bạn cần nhập tên sản phẩm' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Giá sản phẩm"
                    rules={[
                      { required: true, message: 'Bạn cần nhập giá sản phẩm' },
                      { pattern: /^\d+$/, message: 'Giá không hợp lệ' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    label="Loại sản phẩm"
                    rules={[{ required: true, message: 'Bạn cần chọn loại sản phẩm' }]}
                  >
                    <Select placeholder="Chọn loại sản phẩm">
                      <Option value="electronics">Điện tử</Option>
                      <Option value="clothing">Quần áo</Option>
                      <Option value="furniture">Nội thất</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="quantity"
                    label="Số lượng"
                    rules={[{ required: true, message: 'Bạn cần nhập số lượng sản phẩm' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="description" 
                    label="Mô tả sản phẩm" 
                    rules={[{ required: true, message: 'Bạn cần nhập mô tả sản phẩm' }]}
                  >
                    <WrapperReactQuill value={description} onChange={handleDescriptionChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="image" 
                    rules={[{ required: true, message: 'Bạn cần upload ảnh sản phẩm ở đây' }]}
                  >
                    <div style={{ width: '500px', height: '100px', display: 'flex', flexDirection: 'row', marginBottom: '24px' }}>
                      <WrapperUpload.Dragger {...uploadProps} onChange={onChangeImage} maxCount={1}>
                        <p className="ant-upload-text">Kéo và thả ảnh vào đây, hoặc nhấp để chọn</p>
                        <p className="ant-upload-hint">Hỗ trợ ảnh JPEG, PNG</p>
                      </WrapperUpload.Dragger>
                      {stateProduct?.image && (
                        <img
                          src={stateProduct?.image}
                          alt="ảnh sản phẩm"
                          style={{ width: '100px', height: '100px', objectFit: 'cover', marginLeft: '24px' }}
                        />
                      )}
                    </div>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                    <ButtonComponent name="Lưu" width="100px" htmlType="submit" />
                  </Form.Item>
                </Col>
              </Row>
            </WrapperForm>
          </WrapperModal>
          <WrapperModal title="Cập nhật sản phẩm" open={isUpdateModalOpen} onCancel={handleCancel} width={1000}>
            <WrapperForm
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Bạn cần nhập tên sản phẩm' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Giá sản phẩm"
                    rules={[
                      { required: true, message: 'Bạn cần nhập giá sản phẩm' },
                      { pattern: /^\d+$/, message: 'Giá không hợp lệ' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    label="Loại sản phẩm"
                    rules={[{ required: true, message: 'Bạn cần chọn loại sản phẩm' }]}
                  >
                    <Select placeholder="Chọn loại sản phẩm">
                      <Option value="electronics">Điện tử</Option>
                      <Option value="clothing">Quần áo</Option>
                      <Option value="furniture">Nội thất</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="quantity"
                    label="Số lượng"
                    rules={[{ required: true, message: 'Bạn cần nhập số lượng sản phẩm' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="description" label="Mô tả sản phẩm">
                    <WrapperReactQuill value={description} onChange={handleDescriptionChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div style={{ width: '500px', height: '100px', display: 'flex', flexDirection: 'row', marginBottom: '24px' }}>
                    <WrapperUpload.Dragger {...uploadProps} onChange={onChangeImage} maxCount={1}>
                      <p className="ant-upload-text">Kéo và thả ảnh vào đây, hoặc nhấp để chọn</p>
                      <p className="ant-upload-hint">Hỗ trợ ảnh JPEG, PNG</p>
                    </WrapperUpload.Dragger>
                    {stateProduct?.image && (
                      <img
                        src={stateProduct?.image}
                        alt="ảnh sản phẩm"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginLeft: '24px' }}
                      />
                    )}
                  </div>
                  <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                    <ButtonComponent name="Lưu" width="100px" htmlType="submit" />
                  </Form.Item>
                </Col>
              </Row>
            </WrapperForm>
          </WrapperModal>
        </Flex>
        <WrapperTable rowSelection={rowSelection} columns={columns} dataSource={products?.data?.map((product) => ({ ...product, key: product._id }))} pagination={{ pageSize: 5 }} />
      </Flex>
    </WrapperContainer>
  );
};

export default AdminPageProduct;
