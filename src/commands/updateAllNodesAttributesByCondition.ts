import { RawCommands } from "@tiptap/react";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        updateAllNodesAttributesByCondition: {
            /**
             * Update attributes of a node or mark.
             */
            updateAllNodesAttributesByCondition: (
                conditionFn: (node: any)=> boolean,
                attributes: Record<string, any>,
            ) => ReturnType
        }
    }
}

export const updateAllNodesAttributesByCondition: RawCommands['updateAllNodesAttributesByCondition'] = (conditionFn: (node: any)=> boolean, attributes = {}) => ({ tr, state, dispatch }) => {
    const from = 0;
    const to = state.doc.content.size;
    if (dispatch) {
        state.doc.nodesBetween(from, to, (node, pos) => {
            if (conditionFn(node)) {
                tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    ...attributes,
                })
            }
        });
    }

    return true
}