import React from 'react';
import { useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

interface Props {
	min?: number;
	max?: number;
	label: string;
	value: number;
	onChange: ((value: number) => void);
}

const NumericInputField = ({ label, value, onChange, min, max }: Props): JSX.Element => {
	const [isEmpty, setEmpty] = useState(false);
	const [num, setNum] = useState(value);
	const minValue = min === undefined ? 0 : min;
	const maxValue = max === undefined ? 4096 : max;

	const validateRange = (value: number): number => {
		if (value <= minValue) {
			return minValue;
		}
		if (value >= maxValue) {
			return maxValue;
		}
		return value;
	}
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		let value = event.target.value.replace(/[^0-9]/g, "");
		if (value.length === 0) {
			setEmpty(true);
		} else {
			const num = validateRange(parseInt(value, 10));
			setEmpty(false);

			onChange(num);
			setNum(num);
		}
	}
	const onButtonClick = (value: number): void => {
		const num = validateRange(value);
		onChange(num);
		setNum(num);
	}
	const onFocusLeave = (): void => {
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
				aria-label={`decrease ${label}`}
				onClick={(): void => onButtonClick(num - 1)}
			>
				<ChevronLeft />
			</IconButton>
			<TextField
				aria-label={`${label} value`}
				onBlur={onFocusLeave}
				value={isEmpty ? '' : num}
				onChange={onInputChange}
				style={{ width: '40px' }}
			/>
			<IconButton
				aria-label={`increase ${label}`}
				onClick={(): void => onButtonClick(num + 1)}
			>
				<ChevronRight />
			</IconButton>
			<Typography >{label}</Typography>
		</Grid>
	);
}

export default NumericInputField;
