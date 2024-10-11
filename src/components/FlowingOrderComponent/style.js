import { Steps } from "antd";
import styled from "styled-components";

export const StyledSteps = styled(Steps)`
  & :where(.css-dev-only-do-not-override-14pqo0e).ant-steps.ant-steps-label-vertical .ant-steps-item-tail {
    position: absolute;
    top: 19px;
    inset-inline-start: 0;
    width: 100%;
  }

  & :where(.css-dev-only-do-not-override-14pqo0e).ant-steps .ant-steps-item-tail {
    margin-inline-start: 63px;
    padding: 0 22px;
  }
`