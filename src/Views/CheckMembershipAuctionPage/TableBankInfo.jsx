import React, { useState } from 'react';
import { Table,  Form } from 'antd';


const TableBankInfo = ({bankAccountInfo , setBankAccountInfo}) => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };


  const columns = [
    {
      title: 'نام بانک',
      dataIndex: 'bank_name',
      width: '15%',
      editable: false,
    },
    {
      title: 'شماره کارت',
      dataIndex: 'card_number',
      width: '25%',
      editable: false,
    },
    {
      title: 'شماره حساب',
      dataIndex: 'account_number',
      width: '40%',
      editable: false,
    },
    {
      title: 'شماره شبا',
      dataIndex: 'sheba_number',
      width: '40%',
      editable: false,
    },

  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex !== 'bank_name' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (

    <Form  form={form} component={false}>
      <Table
        style={{overflow : 'scroll'}}
        bordered
        dataSource={bankAccountInfo}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        />
    </Form>
  );
};

export default TableBankInfo;