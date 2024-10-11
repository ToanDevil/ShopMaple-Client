import React, { useRef, useState } from 'react'
import { WrapperContainer, WrapperHeader } from '../AdminPageListUser/style'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import * as m from '../MessageComponent/MessageComponent'
import { Button, DatePicker, Flex, Input, Space, Tooltip as AntTooltip, Row, Col, Modal } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { format } from 'date-fns';
import { StyledTable } from './style';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faPeopleCarryBox, faSquareCheck, faTruckFast, faPenToSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const AdminPagePurchaseOrder = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const queryClient = useQueryClient()
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getNestedValue = (obj, keys) => {
        return keys.reduce((result, key) => (result ? result[key] : undefined), obj);
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
                    placeholder={`Search`}
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
            // dataIndex sẽ là một mảng, ví dụ: ['orderDetails', 'userDetail', 'name']
            const recordValue = getNestedValue(record, dataIndex);
            if (!recordValue) return false;
            let formattedValue = recordValue;
            if (Array.isArray(dataIndex) && dataIndex.join('.') === ['orderDetails', 'userDetail', 'phone'].join('.')) {
                formattedValue = '0' + recordValue;
            }

            return formattedValue.toString().toLowerCase().includes(value.toLowerCase());
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
            title: 'Mã đơn hàng',
            dataIndex: ['_id'],
            key: 'orderId',
            align: 'center',
            ...getColumnSearchProps(['_id']),
            render: (text, record) => (
                <AntTooltip title={record._id}>
                    <span
                        style={{
                            maxWidth: '150px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'inline-block',
                        }}
                    >
                        {record._id ? record._id : ''}
                    </span>
                </AntTooltip>
            ),
        },
        {
            title: 'Người đặt',
            dataIndex: ['orderDetails', 'userDetail', 'name'],
            key: 'username',
            align: 'center',
            ...getColumnSearchProps(['orderDetails', 'userDetail', 'name']),
            render: (text, record) => (
                <>
                    <span>{record.orderDetails?.userDetail?.name}</span>
                </>
            ),
        },
        {
            title: 'Chức vụ',
            dataIndex: ['orderDetails', 'userDetail', 'isAdmin'],
            key: 'position',
            align: 'center',
            filters: [
                {
                    text: 'Admin',
                    value: true
                },
                {
                    text: 'Cus',
                    value: false
                }
            ],
            onFilter: (value, record) => record.orderDetails?.userDetail?.isAdmin === value,
            render: (text, record) => (
                <>
                    {
                        record.orderDetails?.userDetail?.isAdmin ? (<span>Admin</span>)
                            : (<span>Cus</span>)
                    }
                </>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: ['orderDetails', 'userDetail', 'phone'],
            key: 'phone',
            align: 'center',
            ...getColumnSearchProps(['orderDetails', 'userDetail', 'phone']),
            render: (text, record) => (
                <span>0{record.orderDetails?.userDetail?.phone}</span>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: ['orderDetails', 'payMethod'],
            key: 'paymentMethod',
            align: 'center',
            filters: [
                {
                    text: 'cod',
                    value: 'cod'
                },
                {
                    text: 'paypal',
                    value: 'papal'
                }
            ],
            onFilter: (value, record) => record.orderDetails.payMethod === value,
            render: (text, record) => (
                <span>{record.orderDetails.payMethod}</span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: ['status'],
            key: 'status',
            align: 'center',
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 'Pending',
                },
                {
                    text: 'Chờ lấy hàng',
                    value: 'Processing',
                },
                {
                    text: 'Đang giao hàng',
                    value: 'Shipped',
                },
                {
                    text: 'Đã giao',
                    value: 'Delivered',
                },
                {
                    text: 'Đã hủy',
                    value: 'Cancelled',
                },
            ],
            onFilter: (value, record) => record.status === value,
            render: (text, record) => (
                <>
                    <span style={{ color: 'rgb(64, 128, 191)' }}>{record.status === 'Pending' && 'Chờ xác nhận'}</span>
                    <span style={{ color: 'rgb(179, 102, 255)' }}>{record.status === 'Processing' && 'Chờ lấy hàng'}</span>
                    <span style={{ color: 'rgb(204, 204, 0)' }}>{record.status === 'Shipped' && 'Đang giao hàng'}</span>
                    <span style={{ color: 'rgb(52, 121, 40)' }}>{record.status === 'Delivered' && 'Đã giao'}</span>
                    <span style={{ color: 'rgb(74, 73, 71)' }}>{record.status === 'Cancelled' && 'Đã hủy'}</span>
                </>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: ['updatedAt'],
            key: 'updatedAt',
            align: 'center',
            render: (text, record) => (
                <>
                    {format(new Date(record.updatedAt), 'dd/MM/yyyy')}
                </>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleGetDetail(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button danger onClick={() => handleUpdateStatus(record.key)} disabled={record.status === "Delivered" || record.status === "Cancelled"}  >Xác nhận</Button>
                </div>
            ),
        },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true); // load data khi mới vào trang

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

    // danh sách đơn đặt hàng
    const fetchAllOrder = async () => {
        const res = await OrderService.getAllOrder();
        if (res) { setLoadingData(false) }
        return res.data;
    };

    const { data: userOrders } = useQuery({ queryKey: ['userOrders'], queryFn: fetchAllOrder });
    // console.log('userOrders', userOrders)
    const handleGetDetail = () => {

    }

    // hiển thị thông báo xác nhận
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [codeOrder, setCodeOrder] = useState('')
    const handleOk = async () => {
        const data = await OrderService.updateStatus(codeOrder)
        if (data.status === "OK") {
            setIsModalOpen(false)
            queryClient.invalidateQueries(['userOrders']);
            m.success("Trạng thái đơn hàng cập nhật thành công!")
        } else {
            m.warning("Hệ thông gặp sự cố! Vui lòng thử lại sau!")
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateStatus = (key) => {
        console.log({ key: key })
        setCodeOrder(key)
        setIsModalOpen(true)
    }


    // tìm kiếm theo khoảng thời gian
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const handleSearchByDate = () => {
        if (startDate && endDate) {
            const filteredOrders = userOrders.filter(order => {
                const orderDate = new Date(order.updatedAt);
                return orderDate >= startDate && orderDate <= endDate;
            });
            // Cập nhật lại dữ liệu bảng hoặc lưu trữ vào state mới
            setFilteredOrders(filteredOrders);
        }
    };
    const handleResetSearch = () => {
        setFilteredOrders([]); // Đặt lại danh sách đã lọc
        setStartDate(null); // Xóa ngày bắt đầu
        setEndDate(null); // Xóa ngày kết thúc
    };

    // Thống kê số đơn hàng
    const getOrderCounts = (orders) => {
        const counts = {
            total: 0,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        };

        orders?.forEach(order => {
            counts.total += 1; // Tăng tổng số đơn hàng

            switch (order.status) {
                case 'Pending':
                    counts.pending += 1;
                    break;
                case 'Processing':
                    counts.processing += 1;
                    break;
                case 'Shipped':
                    counts.shipped += 1;
                    break;
                case 'Delivered':
                    counts.delivered += 1;
                    break;
                case 'Cancelled':
                    counts.cancelled += 1;
                    break;
                default:
                    break;
            }
        });

        return counts;
    };
    // Tính toán số lượng đơn hàng theo từng trạng thái
    const orderCounts = getOrderCounts(userOrders);


    return (
        <WrapperContainer>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Xác nhận trạng thái của đơn hàng {codeOrder}</p>
            </Modal>
            {!loadingData ? (<>
                <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
                <div style={{ margin: '20px' }}>
                    <Row>
                        <Col span={1}><FontAwesomeIcon icon={faPenToSquare} /></Col>
                        <Col span={23}>Chờ xác nhận: <span style={{ fontSize: '18px', color: '#C7253E' }}>{orderCounts.pending}</span></Col>
                    </Row>
                    <Row>
                        <Col span={1}><FontAwesomeIcon icon={faPeopleCarryBox} /></Col>
                        <Col span={23}>Chờ lấy hàng: <span style={{ fontSize: '18px', color: '#C7253E' }}>{orderCounts.processing}</span></Col>
                    </Row>
                    <Row>
                        <Col span={1}><FontAwesomeIcon icon={faTruckFast} /></Col>
                        <Col span={23}>Chờ giao hàng: <span style={{ fontSize: '18px', color: '#C7253E' }}>{orderCounts.shipped}</span></Col>
                    </Row>
                    <Row >
                        <Col span={1}><FontAwesomeIcon icon={faSquareCheck} /></Col>
                        <Col span={23}>Đã giao: <span style={{ fontSize: '18px', color: '#C7253E' }}>{orderCounts.delivered}</span></Col>
                    </Row>
                    <Row>
                        <Col span={1}><FontAwesomeIcon icon={faCancel} /></Col>
                        <Col span={23}>Đã hủy: <span style={{ fontSize: '18px', color: '#C7253E' }}>{orderCounts.cancelled}</span></Col>
                    </Row>
                    <Row style={{ color: 'red' }}>
                        <Col span={1}><FontAwesomeIcon icon={faTriangleExclamation} /></Col>
                        <Col span={23}>
                            Ấn xác nhận khi đã hoàn thành trạng thái đơn hàng trước đó!
                        </Col>
                    </Row>

                </div>
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle">
                        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                            Reload
                        </Button>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                        <DatePicker.RangePicker
                            onChange={(dates) => {
                                if (dates && dates.length === 2) {
                                    setStartDate(dates[0]);
                                    setEndDate(dates[1]);
                                } else {
                                    // Nếu không chọn ngày, có thể reset lại
                                    setStartDate(null);
                                    setEndDate(null);
                                }
                            }}
                        />

                        <Button
                            type="primary"
                            onClick={handleSearchByDate}
                            disabled={!startDate || !endDate}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            type="default"
                            onClick={handleResetSearch}
                            disabled={filteredOrders.length === 0}
                        >
                            Hủy tìm kiếm
                        </Button>
                    </Flex>
                    <StyledTable
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredOrders.length > 0 ? filteredOrders.map((userOrder) => ({ ...userOrder, key: userOrder._id })) : userOrders?.map((userOrder) => ({ ...userOrder, key: userOrder._id }))}
                        pagination={{ pageSize: 10 }}
                    />
                </Flex>
            </>) : (
                <LoadingComponent></LoadingComponent>
            )}

        </WrapperContainer>
    )
}

export default AdminPagePurchaseOrder