import React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { Button } from 'antd';
import CustomPortLabel from './customPortLabelWidget';
import './react-contextmenu.css';

const S = {
    Node: styled.div`
		background-color: ${props => props.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${props => (props.selected ? 'rgb(0,192,255)' : 'black')};
	`,

    Title: styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`,

    TitleName: styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`,

    Ports: styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`,

    PortsContainer: styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-child {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
        }
	`
};

/**
 * 自定义节点组件
 *
 * @export
 * @class CustomNodeWidget
 * @extends {React.Component}
 */
export default class CustomNodeWidget extends React.Component {
    /**
     * 生成端口组件
     *
     * @param {*} port 端口
     * @returns 端口组件
     * @memberof CustomNodeWidget
     */
    generatePort(port) {
        return <CustomPortLabel engine={this.props.engine} port={port} key={port.id} />;
    }

    render() {
        return (
            <S.Node
                data-default-node-name={this.props.node.getOptions().name}
                selected={this.props.node.isSelected()}
                background={this.props.node.getOptions().color}
            >
                <S.Title>
                    <S.TitleName>{this.props.node.getOptions().name}</S.TitleName>
                    <Button type="primary" shape="circle" icon="setting" size="small" onClick={() => this._onSettingClick()} />
                    <Button type="primary" shape="circle" icon="close" size="small" onClick={() => this._onCloseClick()} />
                </S.Title>
                <S.Ports>
                    <S.PortsContainer>{_.map(this.props.node.getInPorts(), (port) => this.generatePort(port))}</S.PortsContainer>
                    <S.PortsContainer>{_.map(this.props.node.getOutPorts(), (port) => this.generatePort(port))}</S.PortsContainer>
                </S.Ports>
            </S.Node>
        );
    }

    /**
     * 设置按钮点击处理事件
     *
     * @memberof CustomNodeWidget
     */
    _onSettingClick() {
        console.log('_onSettingClick');
    }

    /**
     * 关闭按钮点击处理事件
     *
     * @memberof CustomNodeWidget
     */
    _onCloseClick() {
        const { sender } = this.props.node.getOptions();
        if (typeof (sender !== "undefined") && (sender != null)) {
            sender.removeNode(this.props.node);
        }
    }
}
