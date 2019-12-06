import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { DropTarget } from 'react-dnd';
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
@DropTarget((props) => props.targetKey,
    {
        drop(props, monitor, component) {
            const { x: offsetX, y: offsetY } = monitor.getClientOffset();
            const { x: startX, y: startY } = component.canvasRef.current.getBoundingClientRect();
            props.onDrop && props.onDrop(component, monitor.getItem(), offsetX - startX, offsetY - startY);
        }
    },
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)
class FlowChart extends BaseComponent {
    static propTypes = {
        targetKey: PropTypes.string, // 拖拽目标
        onDrop: PropTypes.func // 拖拽事件处理函数
    }

    static defaultProps = {
        onDrop: null
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
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
        const { connectDropTarget } = this.props;

        return connectDropTarget(
            <div ref={this.canvasRef} style={{ width: "100%", height: "100%" }}>
                <Container
                    background={this.props.background || 'rgb(60, 60, 60)'}
                    color={this.props.color || 'rgba(255,255,255, 0.05)'}
                >
                    <CanvasWidget engine={this.engine} />
                </Container>
            </div>
        );
    }
}

export default FlowChart;
