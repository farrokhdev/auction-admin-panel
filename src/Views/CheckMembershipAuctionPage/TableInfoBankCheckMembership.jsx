import React , {useState ,useEffect} from 'react';
import {  Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import {convertTypePersian} from '../../utils/converTypePersion';
import { EditFilled , SaveFilled  , CloseOutlined} from '@ant-design/icons';
const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };



function TableInfoBankCheckMembership({bankAccountInfo}) {

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


        

        originData.push({
            
          key: i.toString(),
          
          id: ` ${i}`,
        //   bank_name: convertTypePersian(bankAccountInfo[i]?.bank_name),
          bank_name: convertTypePersian("melli"),

          // card_number: bankAccountInfo[i].card_number,
          card_number: '111222333444555666777888',

          // account_number: bankAccountInfo[i]?.account_number,
          account_number: '111222333444555666777888',
       
          // sheba_number: bankAccountInfo[i]?.sheba_number,
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
                    required: false,
                    message: `ورودی ${title} خالی است!`,
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
          // responsive: ['sm'],
        },
        {
          title: 'نام بانک',
          dataIndex: 'bank_name',
          // width: '30%',
          width: '300px',
          editable: true,
          // responsive: ['sm'],
        },
        {
          title: 'شماره کارت',
          dataIndex: 'card_number',
          width: '40%',
          editable: true,
          // responsive: ['sm'],
        },
        {
            title: 'شماره حساب',
            dataIndex: 'account_number',
            width: '50%',
            editable: true,
            // responsive: ['sm'],
          },
          {
            title: 'شبا',
            dataIndex: 'sheba_number',
            width: '60%',
            editable: true,
            // responsive: ['sm'],
          },
        {
          title: 'عملیات',
          dataIndex: 'operation',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <a
                  href="javascript:;"
                  onClick={() => save(record.key)}
                  // style={{
                  //   marginRight: 8,
                  // }}
                >
                  <SaveFilled className="btn-save-bankInfo"/>
                </a>
                <Popconfirm title="از انصراف مطمئن هستید؟" onConfirm={cancel}>
                  <a className="mr-1">
                  <CloseOutlined className="btn-cancel-edit-bankInfo"/>
                  </a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <EditFilled className="btn-edit-backInfo"/>
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
           <div  className="row">
              <div style={{overflow : 'auto'}} className="col w-100">
                <Form  form={form} component={false}>
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
              </div>
           </div>
        </React.Fragment>
        
    )
}

export default TableInfoBankCheckMembership;
