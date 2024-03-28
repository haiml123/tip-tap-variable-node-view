import * as React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { useCallback, useEffect, useRef } from 'react';
import VariableForm from "./VariableForm";
import styles from './Variable.module.css';
import { NodeViewProps } from "@tiptap/core";

export default ({editor, getPos, node, extension, updateAttributes}: NodeViewProps) => {

    const { PopoverComponent, variableChipStyle, variableChipPlaceholder } = extension.config;

    const ref = useRef<HTMLElement>();

    const onClosed = useCallback(()=> {
        editor.commands.focus(getPos() + node.nodeSize);
    }, [getPos, editor, node]);

    useEffect(()=> {
        const handleDragEnd = (ev: DragEvent) => {
            const pos = getPos() ? getPos() + node.nodeSize : editor?.state?.selection?.to;
            // Move cursor right after dragged node for better user experience.
            editor.chain().focus().setTextSelection(pos).run();
        }
        if (ref.current) {
            ref.current.draggable = true;
            ref.current?.addEventListener('dragend', handleDragEnd);
        }
        return ()=> {
            ref.current?.removeEventListener('dragend', handleDragEnd);
        }
    }, [ref.current, getPos, node]);

    return <NodeViewWrapper data-drag-handle={true} ref={ref} as="div" style={{display: 'inline-block'}}>
        {ref && ref.current && <PopoverComponent
            onClosed={onClosed}
            onClick={true}
            triggerElement={ref.current}
            content={<VariableForm config={extension.config} node={node} updateAttributes={updateAttributes} />}
            position="top"
            closeOnClickOutside={true}
        />}
        {node?.attrs?.viewMode === 'readMode' ?
            <span contentEditable={false} className="variable-value">{node?.attrs.selected?.default ? node?.attrs.selected?.default : node.attrs.selected?.label ? `{${node.attrs.selected?.label}}` : ''}</span> :
            <span contentEditable={false} className={styles.variableChip} style={variableChipStyle}>{node.attrs.selected?.label || variableChipPlaceholder || 'Select Value'}</span>
        }
    </NodeViewWrapper>;
}