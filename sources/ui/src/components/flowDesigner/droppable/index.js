import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import BaseComponent from '~/components/baseComponent';

/**
 * 拖拽组件
 *
 * @export
 * @class Droppable
 * @extends {BaseComponent}
 */
@DragSource((props) => props.targetKey,
    {
        beginDrag(props) {
            return {
                userData: props.userData
            };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)
class Droppable extends BaseComponent {
    static propTypes = {
        targetKey: PropTypes.string, // 拖拽目标
        width: PropTypes.number.isRequired, // 宽度
        height: PropTypes.number.isRequired, // 高度
        userData: PropTypes.string // 用户数据
    }

    _render() {
        const child = React.cloneElement(this.props.children, { ref: (ref) => { this.view = ref; } });
        const { connectDragSource, isDragging } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return connectDragSource(
            <div style={{ width: this.props.width, height: this.props.height, opacity }}>
                {child}
            </div>
        );
    }
}

export default Droppable;
