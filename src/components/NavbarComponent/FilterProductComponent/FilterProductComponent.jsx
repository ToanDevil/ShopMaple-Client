import { Divider } from 'antd';
import React from 'react';
import { CheckboxGroupFlex } from './style';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
const {  useState  } = React;
const groups = [
  {
    name: 'Theo danh mục',
    plainOptions: ['Đầm/váy', 'Đồ lót', 'Chân váy', 'Bộ', 'Quần đùi', 'Đồ ngủ', 'Đồ truyền thống'],
    defaultCheckedList: []
  },
  {
    name: 'Nơi bán',
    plainOptions: ['Hà Nội', 'TP. Hồ Chí Minh', 'Thái Nguyên', 'Vĩnh Phúc', 'Hải Phòng', 'Đồng Nai', 'HƯng Yên', 'Nước ngoài'],
    defaultCheckedList: []
  },
  {
    name: 'Đơn vị vận chuyển',
    plainOptions: ['Hỏa tốc', 'Nhanh', 'Tiết kiệm'],
    defaultCheckedList: [] 
  },
  {
    name: 'Thương hiệu',
    plainOptions: ['SHEIN', 'SẠNOLY',  'Đầm váy mina', 'GJCUTE'],
    defaultCheckedList: []
  },
  {
    name: 'Loại shop',
    plainOptions: ['Shop mall', 'Shop yêu thích', 'Shop xu hướng'],
    defaultCheckedList: []
  },
  {
    name: 'Tình trạng',
    plainOptions: ['Đã qua sử dụng', 'Mới'],
    defaultCheckedList: []
  },
  {
    name: 'Dịch vụ và khuyến mãi',
    plainOptions: ['Voucher Xtra', 'Đang giảm giá', 'gì cũng rẻ', 'Hàng có sẵn', 'Mua giá buôn, bán sỉ'],
    defaultCheckedList: []
  }
] 
const FilterProductComponent = () => {
  const [checkedList, setCheckedList] = useState(groups.map(group => group.defaultCheckedList));
  const onChange = (index) => (list) => {
    const newCheckedList = [...checkedList];
    newCheckedList[index] = list;
    setCheckedList(newCheckedList);
  };
  const onClearAllChange = (e) => {
    const newCheckedLists = checkedList.map(() => []);
    setCheckedList(newCheckedLists);
  };
  return (
    <>
      <Divider />
      {groups.map((group, index) => (
        <div key={index}>
          <span>{group.name}</span>
          <CheckboxGroupFlex
              options={group.plainOptions}
              value={checkedList[index]}
              onChange={onChange(index)}
          />
          <Divider />
        </div>
      ))}
      {/* <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} /> */}
      <ButtonComponent onClick={onClearAllChange} name="Xóa tất cả" width = '100%'/> 
    </>
  );
}

export default FilterProductComponent