import React from 'react';
import { useState } from "react";
import {  FormGroup, FormControlLabel, Switch } from "@material-ui/core";

interface Props {
    label: string,
    value: boolean,
    onChange: ((value: boolean) => void),
}

export default ({ label, value, onChange }: Props) => {
    const [state, setState] = useState(value);

    const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setState(checked);
        onChange(checked);
    }

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={state}
                        onChange={onSwitchChange}
                    />
                }
                style={{ opacity: state ? 1.0 : 0.5 }}
                label={label}
            />
        </FormGroup>
    );
}