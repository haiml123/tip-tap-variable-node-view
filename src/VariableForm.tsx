import * as React from 'react';
import {useCallback} from 'react';
import styles from './Variable.module.css';
import {VariableOption} from './types';

export default ({config, node, updateAttributes}: any) => {

    const onSelectChange = useCallback((key: string) => {
        const selectedValue = node.attrs.options.find((op: VariableOption) => op.key == key);
        updateAttributes({
            selected: selectedValue
        });
    }, [updateAttributes, node]);

    const handleInputOnChange = useCallback((value: string) => {
        const selectedValue = node.attrs.selected;
        updateAttributes({
            selected: {...selectedValue, default: value}
        });
    }, [updateAttributes, node]);

    return (<div className={styles.variableForm}>
        <div className={styles.fieldWrapper}>
            {config?.SelectComponent ?
                <config.SelectComponent onSelectChange={onSelectChange} node={node} config={config}/> :
                <select className={styles.variableFromField} onChange={(event) => onSelectChange(event.target.value)}
                        value={node?.attrs?.selected?.key || ''}>
                    <option key={''}>{config.selectPlaceholder ? config.selectPlaceholder : 'Select a field'}</option>
                    {node?.attrs?.options.map((option: VariableOption) => <option key={option.key}
                                                                                  value={option.key}>{option.label}</option>)}
                </select>}
        </div>
        <div className={styles.fieldWrapper}>
            {config.DefaultInputComponent ?
                <config.DefaultInputComponent handleInputOnChange={handleInputOnChange} node={node} config={config}/> :
                <input className={styles.variableFromField}
                       disabled={!node?.attrs?.selected?.key}
                       onChange={(event) => handleInputOnChange(event.target.value)}
                       placeholder={config.defaultInputPlaceholder ? config.defaultInputPlaceholder : "Default value"}
                       value={node?.attrs?.selected?.default || ''} type="text"/>
            }
        </div>
    </div>);
}