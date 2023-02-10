import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
} from "antd";
import { useState } from "react";

const content = {
  marginTop: "100px",
  padding: 25,
};

const initDataSource = [
  {
    item: "Paket Hemat Cheeseburger",
    type: "spend",
    amount: 75000,
  },
  {
    item: "Gajian Januari",
    type: "income",
    amount: 100000,
  },
];

const columns = [
  {
    title: "Item",
    dataIndex: "item",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

export default function Home() {
  const [dataSource, setDataSource] = useState(initDataSource);
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Success:", values);
    setDataSource([...dataSource, values]);
  };

  return (
    <div style={content}>
      <Typography.Title>My Personal Finances</Typography.Title>
      <Divider />
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="item" label="Item">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <InputNumber style={{ width: 500 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button htmlType="submit" type="primary">
            Add Item
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        summary={(pageData) => {
          let total = 0;
          pageData.forEach((value) => {
            if (value.type === "spend") {
              total -= value.amount;
            }

            if (value.type === "income") {
              total += value.amount;
            }
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {total > 0 ? "surplus" : "deficit"}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{total}</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
}
