import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
    return (
        <Menu mode="vertical" className={styles["side-menu"]}>
            {sideMenuList.map((m, index) => (
                <Menu.SubMenu
                    key={`side-menu-${index}`}  // 第1层menu
                    title={
                        <span>
                            <GifOutlined />
                            {m.title}
                        </span>
                    }
                >
                    {m.subMenu.map((sm, smindex) => (
                        <Menu.SubMenu
                            key={`sub-menu${index}-${smindex}`} // 第2层menu
                            title={
                                <span>
                                    <GifOutlined />
                                    {sm.title}
                                </span>
                            }
                        >
                            {sm.subMenu.map((sms, smsindex) => (
                                <Menu.Item key={`sub${index}-sub${smindex}-menu-${smsindex}`}>  {/* 规避key值重复的警告 */}
                                    <span>
                                        <GifOutlined />
                                        {sms}
                                    </span>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    );
};
