import React from "react";
import { Form, Input, Icon, Button, Select, Switch, Row, Col } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 6 },
  },
  colon: false,
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
  colon: false,
};

export default ({ getFieldDecorator, k, index, remove }) => {
  return (
    <Row className="comp-form-item-room">
      <Col span={3}>
        <strong>Room {index + 1}</strong>
      </Col>
      <Col className="label-item" span={3}>
        <span>Adult</span>
        <br />
        <span className="sub-label">12yrs & above</span>
      </Col>
      <Col span={2}>
        {getFieldDecorator(`adults[${k}]`, {
          initialValue: 1,
          rules: [],
        })(
          <Select style={{ width: "100%" }}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        )}
      </Col>
      <Col className="label-item" span={3}>
        <span>Child</span>
        <br />
        <span className="sub-label">2-11yrs</span>
      </Col>
      <Col span={2}>
        {getFieldDecorator(`children[${k}]`, {
          initialValue: 0,
          rules: [],
        })(
          <>
            <Select style={{ width: "100%" }}>
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>
            <span className="sub-label">W/Bed</span>
          </>
        )}
      </Col>
      <Col span={2}>
        {getFieldDecorator(`childrenNoBed[${k}]`, {
          initialValue: 0,
          rules: [],
        })(
          <>
            <Select style={{ width: "100%" }}>
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
            </Select>
            <span className="sub-label">WO/Bed</span>
          </>
        )}
      </Col>
      <Col className="label-item" span={3}>
        <span>Infant</span>
        <br />
        <span className="sub-label">Below 2yrs</span>
      </Col>
      <Col span={2}>
        {getFieldDecorator(`infants[${k}]`, {
          initialValue: 0,
          rules: [],
        })(
          <Select style={{ width: "100%" }}>
            <Option value={0}>0</Option>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        )}
      </Col>
      <Col className="label-item" span={2}>
        {index > 0 ? (
          <Icon
            className="delete-button"
            type="delete"
            onClick={() => remove(k)}
          />
        ) : null}
      </Col>
    </Row>
  );
};
