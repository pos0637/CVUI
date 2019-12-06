import React from 'react';
import { Row, Col } from 'antd';
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
            <div>
                <Row style={{ height: "500px" }}>
                    <Col span={6} style={{ height: "100%" }}>
                        <Droppable targetKey="flowchart" width={200} height={20} onDrop={(x, y) => this._onDrop(x, y)}>
                            <div>Drag Me!</div>
                        </Droppable>
                        <Droppable targetKey="flowchart" width={200} height={20}>
                            <div>Drag Me!</div>
                        </Droppable>
                    </Col>
                    <Col span={18} style={{ height: "100%" }}>
                        <FlowChart ref={this.flowChartRef} targetKey="flowchart" />
                    </Col>
                </Row>
            </div>
        );
    }

    _onDrop(x, y) {
        console.log(x);
        this.flowChartRef.current.addNode('test', { x: x, y: y });
    }
}
