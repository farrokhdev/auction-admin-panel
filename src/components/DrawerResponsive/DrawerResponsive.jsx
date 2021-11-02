import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {BorderRightOutlined , UnorderedListOutlined , MenuFoldOutlined , HomeFilled , MessageFilled , PictureFilled , TeamOutlined , BankFilled , WechatFilled , WalletFilled , QuestionCircleFilled , NotificationFilled , SnippetsFilled , FileTextFilled} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import NavItemComponent from './NavItemComponent';
import { Menu, Switch, Divider } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function DrawerResponsive() {

    const [visible , setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <React.Fragment>
            <Button  onClick={showDrawer}>
            <MenuFoldOutlined />
            </Button>
            <Drawer
                title="حراجی آنلاین"
                className="text-right"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}>





            
                
               
                    <NavItemComponent setVisible={setVisible}  icon={<HomeFilled/>}  title ={"خانه"}  link={"/home"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<TeamOutlined />}  title ={"اعضا"}  link={"/members"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<PictureFilled />}  title ={"آثار هنری"}  link={"/artworks"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<NotificationFilled />}  title ={"حراج‌ها"}  link={"/auctions"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<BankFilled />}  title ={"خانه‌های حراجی"}  link={"/house-auctions"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<WalletFilled />}  title ={"کیف پول"}  link={"/wallets"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<SnippetsFilled />}  title ={"مشاوره فروش"}  link={"/sales-consuler"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<FileTextFilled />}  title ={"سفارشات"}  link={"/orders"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<MessageFilled />}  title ={"پیام‌ها"}  link={"/inbox-messages"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<WechatFilled />}  title ={"تیکت‌ها"}  link={"/tickets"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<UnorderedListOutlined />}  title ={"ایجاد دسته‌بندی"}  link={"/create-new-category"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<QuestionCircleFilled />}  title ={"سوالات متداول"}  link={"/frequently-asked-questions"}/>
                    <NavItemComponent setVisible={setVisible}  icon={<BorderRightOutlined />}  title ={"ایجاد محتوا"}  link={"/create-content"}/>
                
                    
            </Drawer>




           










        </React.Fragment>
    )
}

export default DrawerResponsive;
