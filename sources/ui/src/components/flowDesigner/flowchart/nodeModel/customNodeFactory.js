import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import CustomNodeModel from './customNodeModel';
import CustomNodeWidget from './customNodeWidget';

/**
 * 自定义节点工厂
 *
 * @export
 * @class CustomNodeFactory
 * @extends {AbstractReactFactory}
 */
export default class CustomNodeFactory extends AbstractReactFactory {
    constructor() {
        super('custom-node');
    }

    generateModel() {
        return new CustomNodeModel();
    }

    generateReactWidget(event) {
        return <CustomNodeWidget engine={this.engine} node={event.model} />;
    }
}
