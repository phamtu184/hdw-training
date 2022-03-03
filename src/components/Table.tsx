import * as React from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import LoadingBox from './LoadingBox';
import moment from 'moment';
import { moneyFormatter } from 'utils/function';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

interface Props {
    columns: any[];
    rows: any[];
    loading?: boolean;
    handleEdit?: any;
    handleDelete?: any;
}
const CustomAppTable: React.FC<Props> = ({ columns, rows, loading = false, handleEdit, handleDelete }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        if (column.id === 'birthDate') {
                                            return (
                                                <TableCell key={index} align={column.align}>
                                                    {moment(value).format('DD/MM/YYYY')}
                                                </TableCell>
                                            );
                                        }
                                        if (column.id === 'salary') {
                                            return (
                                                <TableCell key={index} align={column.align}>
                                                    {moneyFormatter(value)}
                                                </TableCell>
                                            );
                                        }
                                        if (column.id === 'actions') {
                                            return (
                                                <TableCell key={index} align={column.align}>
                                                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                        <EditOutlined />
                                                    </IconButton>
                                                    <IconButton color="error" onClick={() => handleDelete(row)}>
                                                        <DeleteOutline />
                                                    </IconButton>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={index} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && rows.length < 1 && <LoadingBox />}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
export default CustomAppTable;
