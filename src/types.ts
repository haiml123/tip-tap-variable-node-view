import * as React from 'react';
import { ReactNode } from "react";
import { Node } from '@tiptap/pm/model'
import { ExtensionConfig } from '@tiptap/core';
import { RawCommands } from '@tiptap/react';

export const OptionType = {
    STRING: 'string',
    NUMBER: 'number',
    DATE: 'date'
}

export type OptionTypes = 'string' | 'number' | 'date';

export type VariableExtensionConfig = {
    PopoverComponent?: React.FC<PopoverProps>,
    options?: VariableOption[]
}

export type VariableOption = {
    key: string,
    type: OptionTypes,
    label: string,
    default?: any
}

export interface VariableNodeProps {
    node: Node;
    extension: ExtensionConfig;
    updateAttributes: RawCommands['updateAttributes'];
}

export interface PopoverProps {
    triggerElement: HTMLElement | null;
    content: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    closeOnClickOutside?: boolean;
    closeOnscroll?: boolean;
    onHover?: boolean,
    onClick?: boolean
}