import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps, useTheme } from '@mui/material';

interface CustomLinkProps extends MuiLinkProps {
    to: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    text: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, onClick, children, text, ...props }) => {
    const theme = useTheme();

    return (
        <p>
            <MuiLink
                component={RouterLink}
                to={to}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (onClick) {
                        e.preventDefault();
                        onClick(e);
                    }
                }}
                sx={{
                    color: theme.palette.text.primary,
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#D74101',
                        textDecoration: 'underline',
                    },
                }}
                {...props}
            >
                {text || children}
            </MuiLink>
        </p>
    );
};

export default CustomLink;
