import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, IconButton, Box, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


interface SearchBarProps {
    value: string;
    placeholder?: string;
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder, options, onChange, onSearch }) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('navbar.searchbar');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            onSearch(event as React.FormEvent<HTMLFormElement>);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, mx: 2, textAlign: i18n.language === 'fa' ? 'right' : 'left' }}>
            <Autocomplete
                freeSolo
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={translatedPlaceholder}
                        onKeyDown={handleKeyDown}
                        size="small"
                        sx={{
                            width: '40%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 30,
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {value && (
                                        <IconButton onClick={() => onChange({ target: { value: '' } })} aria-label="clear">
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={(e) => onSearch(e as React.FormEvent<HTMLFormElement>)} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}

                    />
                )}
                onChange={(event, newValue) => {
                    onChange({ target: { value: newValue || '' } });
                }}
                onInputChange={(event, newInputValue) => {
                    onChange({ target: { value: newInputValue } });
                }}
                inputValue={value}
                clearOnBlur={false}
            />
        </Box>
    );
};

export default SearchBar;
