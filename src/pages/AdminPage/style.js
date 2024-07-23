import { Menu } from "antd";
import styled from "styled-components";

export const ContentMenu = styled(Menu)`
    height: calc(100vh - 60px);
    .ant-menu-submenu .ant-menu-submenu-title .ant-menu-submenu-arrow {
        display: none;
    }
    .ant-menu-submenu-title{
        padding-right: 0
    }
    &&& .ant-menu-inline {
        background: #9CDBA6
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