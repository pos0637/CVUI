import React from 'react';
import { Row, Col, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BaseComponent from '~/components/baseComponent';
import Droppable from './droppable';
import FlowChart from './flowchart';

/**
 * 流程设计器
 *
 * @export
 * @class FlowDesigner
 * @extends {BaseComponent}
 */
export default class FlowDesigner extends BaseComponent {
    constructor(props) {
        super(props);
        this.flowChartRef = React.createRef();
        this.nodes = [];
    }

    _render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Row style={{ height: "500px" }}>
                    <Col span={6} style={{ height: "100%" }}>
                        <Droppable targetKey="flowchart" userData="Operator1" width={200} height={20}>
                            <div>Drag Me!</div>
                        </Droppable>
                        <Droppable targetKey="flowchart" userData="Operator2" width={200} height={20}>
                            <div>Drag Me!</div>
                        </Droppable>
                        <Button onClick={() => this._onLinkButtonClick()}>link</Button>
                    </Col>
                    <Col span={18} style={{ height: "100%" }}>
                        <FlowChart ref={this.flowChartRef} targetKey="flowchart" onDrop={(sender, data, x, y) => this._onDrop(sender, data, x, y)} />
                    </Col>
                </Row>
            </DndProvider>
        );
    }

    _onDrop(sender, data, x, y) {
        this.nodes.push(this.flowChartRef.current.getDecoratedComponentInstance().addNode('test', { x: x, y: y }));
    }

    _onLinkButtonClick() {
        for (let i = 1; i < this.nodes.length; ++i) {
            const outPorts = this.nodes[i - 1].getOutPorts();
            const inPorts = this.nodes[i].getInPorts();
            if ((outPorts.length > 0) && (inPorts.length > 0)) {
                this.flowChartRef.current.getDecoratedComponentInstance().link(outPorts[0], inPorts[0]);
            }
        }
    }
}
