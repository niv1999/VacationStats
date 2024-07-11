import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { LikesDistributionModel } from '../../../Models/StatsModels';
import { TableHead } from '@mui/material';
import { styled } from '@mui/material/styles';
//@ts-ignore
import CountryFlag from 'react-country-flag';

type LikesDistributionTableProps = {
    likesDistribution: LikesDistributionModel[];
};

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    );
}

function createData(country_name: string, likes: number, country_code: string) {
    return { country_name, likes, country_code };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const CustomTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: '#a1c1d6 !important',
    },
});

export function LikesDistributionTable(props: LikesDistributionTableProps): JSX.Element {
    const rows = []
    for (let i = 0; i < props?.likesDistribution?.length; i++) {
        rows.push(createData(props.likesDistribution[i].country_name, props.likesDistribution[i].likes, props.likesDistribution[i].country_code));
    }
    rows.sort((a, b) => (a.likes < b.likes ? 1 : -1));

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "200px" }} aria-label="custom pagination table" align="center">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center' width={"6%"}></StyledTableCell>
                        <StyledTableCell align='center' width={"47%"} sx={{ fontWeight: "bold", borderLeft: "1px solid #e0e0e0" }}>Country Name</StyledTableCell>
                        <StyledTableCell align='center' width={"47%"} sx={{ fontWeight: "bold", borderLeft: "1px solid #e0e0e0" }}>Likes Count</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <CustomTableRow key={row.country_name} hover>
                            <TableCell component="th" scope="row" width={"6%"} sx={{ borderRight: "1px solid #e0e0e0" }}>
                                <Box sx={{ width: "5vw", height: "5vh" }}>
                                    <CountryFlag countryCode={row.country_code} svg style={{ width: "100%", height: "100%" }} />
                                </Box>
                            </TableCell>
                            <TableCell align='center' width={"47%"} sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold", fontSize: "1rem" }}>
                                {row.country_name}
                            </TableCell>
                            <TableCell align='center' width={"47%"} sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                {row.likes}
                            </TableCell>
                        </CustomTableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}