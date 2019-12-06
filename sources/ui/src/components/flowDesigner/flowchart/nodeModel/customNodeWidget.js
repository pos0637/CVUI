import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

export default class CustomNodeWidget extends React.Component {
    render() {
        return (
            <div className="custom-node">
                <PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
                    <div className="circle-port" />
                </PortWidget>
                <PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
                    <div className="circle-port" />
                </PortWidget>
                <div className="custom-node-color" style={{ backgroundColor: this.props.node.color }} />
            </div>
        );
    }
}