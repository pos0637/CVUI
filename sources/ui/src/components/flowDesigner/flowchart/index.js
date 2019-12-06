import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { DropTarget } from 'react-drag-drop-container';
import createEngine, { DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import BaseComponent from '~/components/baseComponent';

const Container = styled.div`
    height: 100%;
    background-color: rgb(60, 60, 60) !important;
    background-size: 50px 50px;
    display: flex;
    > * {
        height: 100%;
        min-height: 100%;
        width: 100%;
    }
    background-image: linear-gradient(
            0deg,
            transparent 24%,
            ${props => props.color} 25%,
            ${props => props.color} 26%,
            transparent 27%,
            transparent 74%,
            ${props => props.color} 75%,
            ${props => props.color} 76%,
            transparent 77%,
            transparent
        ),
        linear-gradient(
            90deg,
            transparent 24%,
            ${props => props.color} 25%,
            ${props => props.color} 26%,
            transparent 27%,
            transparent 74%,
            ${props => props.color} 75%,
            ${props => props.color} 76%,
            transparent 77%,
            transparent
        );
`;

/**
 * 流程图组件
 *
 * @export
 * @class Droppable
 * @extends {BaseComponent}
 */
export default class FlowChart extends BaseComponent {
    static propTypes = {
        targetKey: PropTypes.string // 拖拽目标
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.engine = createEngine();
        this.model = new DiagramModel();
        this.engine.setModel(this.model);
    }

    addNode(name, position) {
        const node = new DefaultNodeModel({
            name: name,
            color: 'rgb(0,192,255)',
        });
        node.setPosition(position.x, position.y);

        this.model.addAll(node);
        this.engine.setModel(this.model);
    }

    _render() {
        return (
            <DropTarget targetKey={this.props.targetKey}>
                <Container
                    background={this.props.background || 'rgb(60, 60, 60)'}
                    color={this.props.color || 'rgba(255,255,255, 0.05)'}
                >
                    <CanvasWidget engine={this.engine} />
                </Container>
            </DropTarget>
        );
    }
}
