import * as React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import VariableForm from "./VariableForm";
import styles from './variable.module.css';
import {VariableNodeProps} from "./types";

export default (props: VariableNodeProps) => {
    const { PopoverComponent, variableChipStyle, variableChipPlaceholder } = props.extension.config;
    const [trigger, setTrigger] = useState<HTMLElement | null>();
    return <NodeViewWrapper as="div" style={{display: 'inline-block'}} className="react-component">
            {trigger && <PopoverComponent
                onClick={true}
                triggerElement={trigger}
                content={<VariableForm config={props.extension.config} node={props.node} updateAttributes={props.updateAttributes} />}
                position="top"
                closeOnClickOutside={true}
            />}
            {props?.node?.attrs?.viewMode === 'readMode' ?
                <span data-drag-handle={false} contentEditable={false} className="variable-value">{props.node.attrs.selected?.default || props.node.attrs.selected?.label}</span> :
                <span ref={(ref)=> {
                    setTrigger(ref);
                }} data-drag-handle={true} contentEditable={false} className={styles.variableChip} style={variableChipStyle}>{props.node.attrs.selected?.label || variableChipPlaceholder || 'Select Value'}</span>
            }
        </NodeViewWrapper>;
}