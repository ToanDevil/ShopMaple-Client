import React, { useRef, useState } from 'react';
import { WrapperContainer, WrapperHeader } from '../AdminPageListUser/style';
import { Button, Flex, Table, Tooltip, Input, Space } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import * as m from '../../components/MessageComponent/MessageComponent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as CategoryProductService from '../../services/CategoryProductService';
import Highlighter from 'react-highlight-words';
import { format } from 'date-fns';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const AdminPageCategory = () => {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [nameCategory, setNameCategory] = useState('')
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
            title: 'Loại sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => {
                if (!a.name && !b.name) return 0;
                if (!a.name) return -1;
                if (!b.name) return 1;
                return a.name.localeCompare(b.name);
            },
            ...getColumnSearchProps('name'),
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
            title: 'Ngày thêm',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => (
                <>
                    {format(new Date(record.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                </>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
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

    //Xóa danh mục

    const handleDelete = async (id) => {
        const res = await CategoryProductService.deleteCategoryProduct(id)
        if (res.status === "OK") {
            queryClient.invalidateQueries(['categories']);
            m.success('Xóa thành công');
        }
    };

    // hiển thị danh sách danh mục sản phẩm
    const fetchAllCategory = async () => {
        const res = await CategoryProductService.getAllCategory();
        return res;
    };

    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: fetchAllCategory });

    // Thêm mới dnah mục sản phẩm
    const handleCreateCategory = async () => {
        const name = nameCategory
        const data = { name }
        const res = await CategoryProductService.createCategoryProduct(data)
        if (res.status === "OK") {
            queryClient.invalidateQueries(['categories']);
            m.success('Thêm mới danh mục thành công');
            setNameCategory('')
        }
    }

    const handleOnChangeNameCategory = (event) => {
        setNameCategory(event.target.value)
    }

    return (
        <WrapperContainer>
            <WrapperHeader>Danh sách danh mục sản phẩm</WrapperHeader>
            <Flex gap="middle" vertical>
                <Flex align="center" gap="middle">
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                    <Input placeholder='Thêm danh mục' style={{ width: '200px' }} onChange={handleOnChangeNameCategory} value={nameCategory}></Input>
                    <ButtonComponent name={"Thêm"} width='60px' onClick={handleCreateCategory} disabled={!nameCategory}></ButtonComponent>
                </Flex>
                <Table rowSelection={rowSelection} columns={columns} dataSource={categories?.data?.map((category) => ({ ...category, key: category._id }))} pagination={{ pageSize: 5 }} />
            </Flex>
        </WrapperContainer>
    )
}

export default AdminPageCategory