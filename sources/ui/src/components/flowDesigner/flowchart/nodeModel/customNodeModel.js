import { DefaultNodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';

/**
 * 自定义节点
 *
 * @export
 * @class CustomNodeModel
 * @extends {DefaultNodeModel}
 */
export default class CustomNodeModel extends DefaultNodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: 'custom-node'
        });
        this.color = options.color || { options: 'red' };

        this.addPort(new DefaultPortModel({ in: true, name: '输入' }));
        this.addPort(new DefaultPortModel({ in: false, name: '输出' }));
    }

    serialize() {
        return {
            ...super.serialize(),
            color: this.options.color
        };
    }

    deserialize(ob, engine) {
        super.deserialize(ob, engine);
        this.color = ob.color;
    }
}
