import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContainer } from 'react-drag-drop-container';
import BaseComponent from '~/components/baseComponent';

/**
 * 拖拽组件
 *
 * @export
 * @class Droppable
 * @extends {BaseComponent}
 */
export default class Droppable extends BaseComponent {
    static propTypes = {
        targetKey: PropTypes.string, // 拖拽目标
        width: PropTypes.number.isRequired, // 宽度
        height: PropTypes.number.isRequired, // 高度
        userData: PropTypes.string, // 用户数据
        onDrop: PropTypes.func // 拖拽事件处理函数
    }

    static defaultProps = {
        onDrop: null
    }

    _render() {
        const child = React.cloneElement(this.props.children, { ref: (ref) => { this.view = ref; } });

        return (
            <div style={{ display: "inline-block", position: "relative", width: this.props.width, height: this.props.height }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: this.props.width, height: this.props.height }}>
                    {child}
                </div>
                <div style={{ position: "absolute", left: 0, top: 0, width: this.props.width, height: this.props.height }}>
                    <DragDropContainer
                        targetKey={this.props.targetKey}
                        dragData={{ userData: this.props.userData }}
                        customDragElement={this.props.customDragElement}
                        onDrop={(x, y) => {
                            this.props.onDrop && this.props.onDrop(x, y);
                        }}
                    >
                        {child}
                    </DragDropContainer>
                </div>
            </div>
        );
    }
}
