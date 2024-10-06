import { Col, Menu, Upload } from "antd";
import styled from "styled-components";

export const WrapperMenu = styled(Col)`
    padding: 20px 10px
`
export const WrapperContent = styled(Col)`
    padding: 20px;
    background: #fff;
    min-width: 80vh;
`

export const ContentMenu = styled(Menu)`
    .ant-menu-submenu .ant-menu-submenu-title .ant-menu-submenu-arrow {
        display: none;
    }
    .ant-menu-submenu-title {
        padding-right: 0;
    }

    &&& .ant-menu-inline {
        background: #f5f5f5;
    }

    .ant-menu-item:hover,
    .ant-menu-submenu-title:hover {
        background-color: transparent !important;
        color: rgb(34, 193, 195) !important; /* Đổi màu chữ khi hover */
        border-bottom-color: rgb(34, 193, 195) !important; /* Đổi màu gạch dưới khi được chọn */
        border-bottom-width: 2px !important; /* Độ rộng gạch dưới */
    }

    /* Ghi đè màu gạch dưới khi hover */
    .ant-menu-item:hover::after,
    .ant-menu-submenu-title:hover::after,
    .ant-menu-item-active::after,
    .ant-menu-submenu-active::after,
    .ant-menu-item-open::after,
    .ant-menu-submenu-open::after {
        border-bottom: 2px solid rgb(34, 193, 195) !important; /* Đổi màu gạch dưới */
    }


    /* Tùy chỉnh hiệu ứng active cho Menu Item */
    .ant-menu-item-active,
    .ant-menu-submenu-active {
        background-color: transparent !important;
        color: rgb(34, 193, 195) !important;
    }

    /* Tùy chỉnh hiệu ứng selected cho Menu Item */
    .ant-menu-item-selected::after,
    .ant-menu-submenu-selected::after {
        border-bottom-color: rgb(34, 193, 195) !important; /* Đổi màu gạch dưới khi được chọn */
        border-bottom-width: 2px !important; /* Độ rộng gạch dưới */
    }

    &&& .ant-menu-item,
    &&& .ant-menu-submenu-title {
        height: 28px;
        line-height: 28px;
        margin: 0 40px;
        font-size: 1.7rem;
    }

    .ant-menu-item-selected,
    .ant-menu-submenu-title-selected {
        background-color: transparent !important;
        color: rgb(34, 193, 195) !important; /* Đổi màu chữ khi được chọn */
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

export const WrapperFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 450px;
`