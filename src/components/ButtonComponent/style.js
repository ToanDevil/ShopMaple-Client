import { Button } from "antd";
import styled from "styled-components";

export const HoverButton = styled(Button)`
    &&& {
        &:hover {
            background-color: #f84b2f !important;
            border-color: #f84b2f;
            color: #fff !important;
        }
    }
`