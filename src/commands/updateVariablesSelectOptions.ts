import { RawCommands } from "@tiptap/react";
import { variableNodeName } from "../variable.nodeView";
import { updateAllNodesAttributesByCondition } from "./updateAllNodesAttributesByCondition";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        updateVariableSelectOptions: {
            /**
             * Update attributes of a node or mark.
             */
            updateVariableSelectOptions: (
                options: any[],
            ) => ReturnType
        }
    }
}

export const updateVariableSelectOptions: RawCommands['updateVariableSelectOptions'] = (options: any[]) => {
    const conditionFn = (node: any)=> node.type.name === variableNodeName;
    return updateAllNodesAttributesByCondition(conditionFn, {options})
}