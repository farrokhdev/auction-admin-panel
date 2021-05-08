import React , {useState ,useEffect} from 'react';
import {  Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import {convertTypePersian} from '../../utils/converTypePersion';

const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };



function TableBankInfo({member , bankAccountInfo}) {

    console.log("**bankAccountInfo**" , bankAccountInfo.length);

    const originData = [];
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const onFinish = (values) => {
        console.log(values);
    };
    
    const onFinishFailed = (error) => {
        console.log(error);
    };
    
    for (let i = 0; i < bankAccountInfo.length; i++) {

        console.log("bankAccountInfo__bank_name =>>>>", bankAccountInfo[i]?.bank_name);
        console.log("bankAccountInfo__card_number =>>>>", bankAccountInfo[i].card_number);
        console.log("bankAccountInfo__account_number =>>>>", bankAccountInfo[i]?.account_number);
        console.log("bankAccountInfo__sheba_number =>>>>", bankAccountInfo[i]?.sheba_number);
        

        originData.push({
            
          key: i.toString(),
          
          id: ` ${i}`,
        //   bank_name: convertTypePersian(bankAccountInfo[i]?.bank_name),
          bank_name: convertTypePersian("melli"),
          card_number: bankAccountInfo[i].card_number,
          account_number: bankAccountInfo[i]?.account_number,
       
          sheba_number: bankAccountInfo[i]?.sheba_number,
          sheba_number: '111222333444555666777888',
        //   address: `London Park no. ${i}`,
        });
      }
      const isEditing = (record) => record.key === editingKey;

      const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };

      const cancel = () => {
        setEditingKey('');
      };

      const edit = (record) => {
        form.setFieldsValue({
          id: '',
          bank_name: '',
          account_number: '',
          sheba_number: '',
          ...record,
        });
        setEditingKey(record.key);
      };

    const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
    
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };

    const columns = [
        {
          title: 'ردیف',
          dataIndex: 'id',
          width: '3%',
          editable: true,
        },
        {
          title: 'نام بانک',
          dataIndex: 'bank_name',
          width: '15%',
          editable: true,
        },
        {
          title: 'شماره کارت',
          dataIndex: 'card_number',
          width: '30%',
          editable: true,
        },
        {
            title: 'شماره حساب',
            dataIndex: 'account_number',
            width: '30%',
            editable: true,
          },
          {
            title: 'شبا',
            dataIndex: 'sheba_number',
            width: '50%',
            editable: true,
          },
        {
          title: 'ویرایش',
          dataIndex: 'operation',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <a
                  href="javascript:;"
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </Typography.Link>
            );
          },
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
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
    


    return (
        <React.Fragment>
           <Form form={form} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                    onChange: cancel,
                    }}
                />
                </Form>
        </React.Fragment>
        
    )
}

export default TableBankInfo;