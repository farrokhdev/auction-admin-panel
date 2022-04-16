import React, { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form } from 'antd'
import { Input } from 'antd'


export const AvatarUploadModal = ({onCancel,onClick,onOk,modalOpen}) => {




 
  return (
    <Modal visible={modalOpen} onOk={onOk} onCancel={onCancel}  >
        <Form>
<Form.Item label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}  >
<Input />
</Form.Item>
        </Form>
    </Modal>
  )
}
