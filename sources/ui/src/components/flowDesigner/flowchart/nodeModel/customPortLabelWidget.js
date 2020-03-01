import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import styled from '@emotion/styled';

const S = {
    PortLabel: styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`,

    Label: styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`,

    Port: styled.div`
		width: 15px;
		height: 15px;
		background: rgba(white, 0.1);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`
};

/**
 * 自定义标签组件
 *
 * @export
 * @class CustomPortLabel
 * @extends {React.Component}
 */
export default class CustomPortLabel extends React.Component {
    render() {
        const port = (
            <PortWidget engine={this.props.engine} port={this.props.port}>
                <S.Port><CaretRightOutlined /></S.Port>
            </PortWidget>
        );
        const label = <S.Label>{this.props.port.getOptions().label}</S.Label>;

        return (
            <S.PortLabel>
                {this.props.port.getOptions().in ? port : label}
                {this.props.port.getOptions().in ? label : port}
            </S.PortLabel>
        );
    }
}
