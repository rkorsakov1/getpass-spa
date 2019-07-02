import React, { useEffect } from 'react';
import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface Props {
    label: string,
    value: string,
    adornment?: boolean,
    disabled?: boolean,
    onChange: ((value: string) => void),
}

export default ({ label, value, onChange, disabled, adornment }: Props) => {
    const [text, setText] = useState(value);
    adornment = adornment === undefined ? true : adornment;
    const [isVisible, setVisibility] = useState(!adornment ? true : false);

    useEffect(() => {
        setText(value);
    }, [value]);

    const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let { value } = event.target;

        onChange(value);
        setText(value);
    }

    return (
        <TextField
            aria-label={`${label} value`}
            style={{ marginBottom: '8px', }}
            disabled={disabled === undefined ? false : disabled}
            fullWidth
            variant="filled"
            value={text}
            label={label}
            onChange={onInputChange}
            type={isVisible ? 'text' : 'password'}
            InputProps={{
                endAdornment: !adornment ? null : (
                    <InputAdornment position="end">
                        <IconButton
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                            onClick={() => setVisibility(!isVisible)}
                        >
                            {isVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
