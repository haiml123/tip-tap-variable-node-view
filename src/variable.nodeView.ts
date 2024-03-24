import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import VariableNode from './VariableNode';
import Popover from './Popover';
import {updateAllNodesAttributesByCondition} from './commands/updateAllNodesAttributesByCondition';
import { updateVariableSelectOptions } from './commands/updateVariablesSelectOptions';
import { VariableExtensionConfig } from './types';

export const variableNodeViewName = 'variable-extension';

export function VariableNodeView(config?: VariableExtensionConfig) {
    const defaultConfig: VariableExtensionConfig = {
        PopoverComponent: Popover,
    };

    const mergedConfig = {...defaultConfig, ...config};

    return Node.create({
        name: variableNodeViewName,

        draggable: true,

        content: 'inline*',

        group: 'inline',

        inline: true,

        atom: true,

        ...mergedConfig,

        addCommands() {
            return {
                updateAllNodesAttributesByCondition,
                updateVariableSelectOptions
            }
        },
        addAttributes() {
            return {
                viewMode: {
                    default: 'editMode'
                },
                selected: null,
                options: {
                    default: mergedConfig?.options || []
                }
            }
        },

        parseHTML() {
            return [
                {
                    tag: 'react-component',
                },
            ]
        },

        renderHTML(props) {
            return ['react-component', mergeAttributes(props.HTMLAttributes)]
        },

        addNodeView() {
            const _this = this;
            return ReactNodeViewRenderer(VariableNode, {
                stopEvent({event}: {event: Event}) {
                    const { draggable } = _this.type.spec;
                    if (/dragstart|dragover|drangend|drop/.test(event.type)) return false;
                    return !(draggable && /mousedown|drag|drop/.test(event.type));
                },

                ignoreMutation() { return true; }
            })
        },
    })
}
