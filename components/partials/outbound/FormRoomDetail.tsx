import React, { useEffect } from "react";
import { Form, Input, Icon, Button, Select, Switch } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { TcResponse } from "travelcloud-antd";
import FormItemRoom from "./FormItemRoom";

const { Option } = Select;

const initialDataDefault = {
  keys: [1],
  adults: [],
  children: [],
  childrenNoBed: [],
  infants: [],
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
};

type FormRoomDetailProps = {
  onSubmitFormRoomDetail: (any) => Promise<void>;
  submitRes: TcResponse<any>;
  form: WrappedFormUtils;
};

const FormRoomDetail = ({
  onSubmitFormRoomDetail,
  submitRes,
  ...props
}: FormRoomDetailProps) => {
  const { form } = props;
  const { getFieldDecorator, getFieldValue } = props.form;

  const remove = (k) => {
    const { form } = props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  getFieldDecorator("keys", { initialValue: initialDataDefault.keys });
  const keys = getFieldValue("keys");
  const noOfRoom = getFieldValue("noOfRoom");
  const maxNoOfRoom = 4;

  useEffect(() => {
    if (keys.length === noOfRoom) {
      return;
    }
    form.setFieldsValue({
      keys: Array.from(Array(noOfRoom).keys()).map((_, i) => i + 1),
    });
  }, [noOfRoom]);

  useEffect(() => {
    if (keys.length === noOfRoom) {
      return;
    }
    form.setFieldsValue({
      noOfRoom: keys.length,
    });
  }, [keys]);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { keys } = values;
      const roomList = keys.map((key, index) => ({
        roomNo: index + 1,
        adults: values.adults[key] || 0,
        children: values.children[key] || 0,
        childrenNoBed: values.childrenNoBed[key] || 0,
        infants: values.infants[key] || 0,
      }));
      const data = {
        landOnly: values.landOnly ? "Y" : "N",
        roomList,
      };
      onSubmitFormRoomDetail(data);
    });
  };

  return (
    <>
      <h2 className="card-title">Room Details</h2>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={"Land Only"}>
          {getFieldDecorator("landOnly", {
            valuePropName: "checked",
            rules: [],
          })(<Switch />)}
        </Form.Item>
        <Form.Item label={"Select the No. of room"}>
          {getFieldDecorator("noOfRoom", {
            initialValue: 1,
            rules: [],
          })(
            <Select style={{ width: 100 }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
            </Select>
          )}
        </Form.Item>
        {keys.map((k, index) => (
          <FormItemRoom
            getFieldDecorator={getFieldDecorator}
            k={k}
            index={index}
            remove={remove}
          />
        ))}
        <div style={{ textAlign: "right" }}>
          <Button onClick={handleSubmit} loading={submitRes.loading === true}>
            Price Check
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Form.create<FormRoomDetailProps>()(FormRoomDetail);
