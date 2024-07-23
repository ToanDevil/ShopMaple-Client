import { Form, Modal, Table, Upload } from "antd";
import ReactQuill from "react-quill";
import styled from "styled-components";

export const WrapperModal = styled(Modal)`
    &&& .ant-btn.css-dev-only-do-not-override-1qfezbu.ant-btn-primary{
        display: none
    };
`
export const WrapperReactQuill = styled(ReactQuill)`
    &&& .ql-container.ql-snow {
        max-height: 120px; 
        overflow-y: auto;
    }

    &&& .ql-editor.ql-blank{
        height: auto;
        overflow: hidden;
    }
`
export const WrapperForm = styled(Form)`
    margin-top: 24px
`

export const WrapperTable = styled(Table)`
  .ant-table-cell {
    padding: 8px !important; /* Sửa padding từ 10px thành 5px */
  }
`;
export const WrapperUpload = styled(Upload)`
    height: 100px;
    &&& .ant-upload-list{
        display: none;
    }
`