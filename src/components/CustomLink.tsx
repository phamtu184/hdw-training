import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {
    Icon?: any;
    text?: string;
}

function CustomLink({ to, Icon, text }: CustomLinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button selected={Boolean(match)}>
                {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
                <ListItemText primary={text} />
            </ListItem>
        </Link>
    );
}
export default CustomLink;
