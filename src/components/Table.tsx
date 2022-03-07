import * as React from 'react';
import {
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import LoadingBox from './LoadingBox';
import moment from 'moment';
import { moneyFormatter } from 'utils/function';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { IPagination } from 'interface';

interface Props {
    columns: any[];
    rows: any[];
    loading?: boolean;
    handleEdit?: any;
    handleDelete?: any;
    pagination: IPagination;
    handleFetch?: (page: number, limit: number) => void;
}
const CustomAppTable: React.FC<Props> = ({
    columns,
    rows,
    loading = false,
    handleEdit,
    handleDelete,
    pagination,
    handleFetch,
}) => {
    const { _page, _limit, _total } = pagination;
    const count = Math.ceil(_total / _limit);
    React.useEffect(() => {
        if (!handleFetch) return;
        if (rows.length > _limit) {
            // add case
            const countAdd = Math.ceil((_total + 1) / _limit);
            handleFetch(countAdd, pagination._limit);
            return;
        }
        if (rows.length < _limit) {
            // delete case
            if (_page !== count) {
                handleFetch(_page, pagination._limit);
                return;
            }
            if (rows.length === 0 && _page > 1) {
                handleFetch(_page - 1, pagination._limit);
                return;
            }
        }
    }, [rows.length]);

    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        if (handleFetch) {
            handleFetch(page, pagination._limit);
        }
    };
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', my: 2 }}>
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
                            {rows.map((row, index) => {
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
            </Paper>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'center' }}
                color="primary"
                count={count}
                page={_page}
                onChange={onChangePage}
                disabled={loading}
            />
        </>
    );
};
export default CustomAppTable;
