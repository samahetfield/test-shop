import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selector({ options, placeholder }) {
    const [optionSelected, setOptionSelected] = React.useState(options[0].code);

    const handleChange = (event) => {
        setOptionSelected(event.target.value);
    };

    return (
        <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={optionSelected}
                    onChange={handleChange}
                >

                    {options.map((option) => (<MenuItem key={option.code} value={option.code}>{option.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}