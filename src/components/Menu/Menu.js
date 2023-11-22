import React from 'react';
import { PieChartOutlined, FormOutlined } from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    
  };
}
const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('How it works', '2', <FormOutlined />),
];

const Menu = () => {
  
  const onClick = (e) => {
    console.log('click ', e);
    // router.push(e)
  };
  
  return (
    <AntMenu
      onClick={onClick}
      style={{
        width: 256,
        height: "100%",
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default Menu;