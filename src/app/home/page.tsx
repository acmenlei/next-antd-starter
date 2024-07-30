"use client";

import {
  Button,
  Card,
  Cascader,
  CascaderProps,
  Flex,
  FloatButton,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";
import Form from "./components/form";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>["onChange"] = (value) => {
  console.log(value);
};

export default function HomePage() {
  return (
    <main className="flex gap-5 flex-col p-5 min-h-[calc(100vh-112px)]">
      {/* 主页内容 */}
      <Title>h1. Ant Design</Title>
      <Title level={2}>h2. Ant Design</Title>
      <Title level={3}>h3. Ant Design</Title>
      <Title level={4}>h4. Ant Design</Title>
      <Title level={5}>h5. Ant Design</Title>
      <FloatButton onClick={() => console.log("onClick")} />
      <Flex gap="small" wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
      <Space direction="vertical" size={16}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card
          size="small"
          title="Small size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>

      <Cascader
        defaultValue={["zhejiang", "hangzhou", "xihu"]}
        options={options}
        onChange={onChange}
      />

      <Form />
    </main>
  );
}
