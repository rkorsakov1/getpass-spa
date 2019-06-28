import React from 'react';
import { useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

interface Props {
    min?: number,
    max?: number,
    label: string,
    value: number,
    onChange: ((value: number) => void),
}

export default ({ label, value, onChange, min, max }: Props) => {
    const [isEmpty, setEmpty] = useState(false);
    const [num, setNum] = useState(value);
    const minValue = min === undefined ? 0 : min;
    const maxValue = max === undefined ? 4096 : max;

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/[^0-9]/g, "");
        if (value.length === 0) {
            setEmpty(true);
        } else {
            const num = validateRange(parseInt(value, 10));
            setEmpty(false);

            onChange(num);
            setNum(num);

            console.log(num);
        }
    }
    const validateRange = (value: number): number => {
        if (value <= minValue) {
            return minValue;
        }
        if (value >= maxValue) {
            return maxValue;
        }
        return value;
    }
    const onButtonClick = (value: number) => {
        const num = validateRange(value);
        onChange(num);
        setNum(num);
    }
    const onFocusLeave = () => {
        if (isEmpty) {
            setEmpty(false);
            onChange(minValue);
            setNum(minValue);
        }
    }

    if (num !== value) {
        setNum(value);
    }

    return (
        <Grid container
            direction="row"
            alignItems="center"
            style={{ paddingBottom: '8px' }}>
            <IconButton disabled={(num > 0) ? false : true}
                onClick={() => onButtonClick(num - 1)}
            >
                <ChevronLeft />
            </IconButton>
            <TextField
                onBlur={onFocusLeave}
                value={isEmpty ? '' : num}
                onChange={onInputChange}
                style={{ width: '40px' }}
            />
            <IconButton
                onClick={() => onButtonClick(num + 1)}
            >
                <ChevronRight />
            </IconButton>
            <Typography >{label}</Typography>
        </Grid>
    );
}
