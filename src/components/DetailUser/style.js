import { Col, Menu, Upload } from "antd";
import styled from "styled-components";

export const WrapperMenu = styled(Col)`
    padding: 20px 10px
`
export const WrapperContent = styled(Col)`
    padding: 20px;
    background: #fff;
`

export const ContentMenu = styled(Menu)`
    .ant-menu-submenu .ant-menu-submenu-title .ant-menu-submenu-arrow {
        display: none;
    }
    .ant-menu-submenu-title{
        padding-right: 0
    }
    &&& .ant-menu-inline {
        background: #f5f5f5 
    }
    .ant-menu-item:hover,
    .ant-menu-submenu-title:hover {
        background-color: transparent !important;
        color: rgb(34, 193, 195) !important; 
    }

    /* Tùy chỉnh hiệu ứng active cho Menu Item */
    .ant-menu-item-active,
    .ant-menu-submenu-active {
        background-color: transparent !important; 
        color: rgb(34, 193, 195) !important;
    }

    /* Tùy chỉnh hiệu ứng selected cho Menu Item */
    .ant-menu-item-selected,
    .ant-menu-submenu-title-selected {
        background-color: transparent !important; 
        color: rgb(34, 193, 195) !important; 
    }

    /* Đảm bảo thay đổi màu của tiêu đề SubMenu khi selected */
    .ant-menu-submenu-title .ant-menu-item-selected {
        background-color: transparent !important; 
        color: rgb(34, 193, 195) !important;
    }
    .ant-menu-light .ant-menu-submenu-selected > .ant-menu-submenu-title {
        background-color: transparent !important; 
        color: rgb(34, 193, 195) !important;
    }
    &&& .ant-menu-submenu-selected >.ant-menu-submenu-title{
        color: rgb(34, 193, 195) !important;
        height: 28px;
        line-height: 28px;
    }
    &&& .ant-menu-item{
        height: 28px;
        line-height: 28px;
    }
`

export const HeaderMenu = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start
`

export const WrapperUpload = styled(Upload)`
    &&& .ant-upload-list{
        display: none;
    }
`