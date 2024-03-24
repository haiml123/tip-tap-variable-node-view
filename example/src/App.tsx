import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StarterKit from '@tiptap/starter-kit'
import {useEditor, EditorContent} from "@tiptap/react";
import {Dropcursor} from "@tiptap/extension-dropcursor";
import {OptionType, VariableNodeView, variableNodeViewName} from "./tip-tap-variable-node-view";

function App() {
    const ref = useRef<any>();
    const options: any = [
        {
            label: 'First Name',
            key: 'firstName',
            type: OptionType.STRING,
        },
        {
            label: 'Last Name',
            key: 'lastName',
            type: OptionType.STRING,
        }
    ];
    const [viewMode, setViewMode] = useState('readMode');

    const editor = useEditor({
        content: `
    <h2>Variable Node View</h2>
   
   <p>
   <react-component></react-component>
    </p>
    <p>
      Did you see that? That’s a React  component. We are really living in the future.
    </p>
    `,
        extensions: [
            Dropcursor.configure({
                color: '#083a61',
            }),
            VariableNodeView({
                options
            }),
            StarterKit.configure({
                // Configure an included extension
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
        ]
    });

    const toggleViewMode = () => {
        const newMode = viewMode === 'readMode' ? 'editMode' : 'readMode';
        const conditionFn = (node: any) => node.type.name === variableNodeViewName;
        // @ts-ignore
        editor?.commands.updateAllNodesAttributesByCondition(conditionFn, {
            viewMode: newMode,
            options
        });
        // @ts-ignore
        editor?.commands.updateVariableSelectOptions(options);
        setViewMode(newMode);
    }
    return (
        <div className="App">
            <header className="App-header">
                <img ref={ref} src={logo} className="App-logo" alt="logo"/>
                <button className="view-mode-button" onClick={toggleViewMode}>View Mode</button>
                <EditorContent height={300} editor={editor}/>
            </header>
        </div>
    );
}

export default App;
