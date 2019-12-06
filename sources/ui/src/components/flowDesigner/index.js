import React from 'react';
import { Row, Col } from 'antd';
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
                    </Col>
                    <Col span={18} style={{ height: "100%" }}>
                        <FlowChart ref={this.flowChartRef} targetKey="flowchart" onDrop={(sender, data, x, y) => this._onDrop(sender, data, x, y)} />
                    </Col>
                </Row>
            </DndProvider>
        );
    }

    _onDrop(sender, data, x, y) {
        this.flowChartRef.current.getDecoratedComponentInstance().addNode('test', { x: x, y: y });
    }
}
