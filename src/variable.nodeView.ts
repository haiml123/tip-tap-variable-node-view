import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import VariableNode from './VariableNode';
import Popover from './Popover';
import { updateAllNodesAttributesByCondition } from './commands/updateAllNodesAttributesByCondition';
import { updateVariableSelectOptions } from './commands/updateVariablesSelectOptions';
import { VariableExtensionConfig } from './types';

export const variableNodeName = 'variable-extension';

export const variableNodeTag = 'variable-node';

export function VariableNodeView(config?: VariableExtensionConfig) {
    const defaultConfig: VariableExtensionConfig = {
        variableNodeTag,
        PopoverComponent: Popover,
    };

    const mergedConfig = {...defaultConfig, ...config};

    return Node.create({

        name: variableNodeName,

        draggable: true,

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
                    tag: mergedConfig.variableNodeTag || variableNodeTag
                },
            ]
        },

        renderHTML(props) {
            return [mergedConfig.variableNodeTag || variableNodeTag, mergeAttributes(props.HTMLAttributes)]
        },

        addNodeView() {
            return ReactNodeViewRenderer(VariableNode)
        },
    })
}