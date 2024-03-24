import * as React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import {useCallback, useState} from 'react';
import VariableForm from "./VariableForm";
import styles from './Variable.module.css';
import {NodeViewProps} from "@tiptap/core";

export default ({editor, getPos, node, extension, updateAttributes}: NodeViewProps) => {
    const { PopoverComponent, variableChipStyle, variableChipPlaceholder } = extension.config;
    const [trigger, setTrigger] = useState<HTMLElement | null>();

    const onClosed = useCallback(()=> {
        editor.commands.focus(getPos() + node.nodeSize);
    }, [getPos, editor, node]);

    return <NodeViewWrapper as="div" style={{display: 'inline-block'}} className="react-component">
        {trigger && <PopoverComponent
            onClosed={onClosed}
            onClick={true}
            triggerElement={trigger}
            content={<VariableForm config={extension.config} node={node} updateAttributes={updateAttributes} />}
            position="top"
            closeOnClickOutside={true}
        />}
        {node?.attrs?.viewMode === 'readMode' ?
            <span data-drag-handle={false} contentEditable={false} className="variable-value">{node.attrs.selected?.default || node.attrs.selected?.label}</span> :
            <span ref={(ref)=> {
                setTrigger(ref);
            }} data-drag-handle={true} contentEditable={false} className={styles.variableChip} style={variableChipStyle}>{node.attrs.selected?.label || variableChipPlaceholder || 'Select Value'}</span>
        }
    </NodeViewWrapper>;
}