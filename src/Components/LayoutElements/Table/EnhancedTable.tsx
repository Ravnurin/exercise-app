import React, { useState, ChangeEvent } from 'react';
import { Checkbox, Paper, Table, TableBody, TableCell, TableRow, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { getSorting, stableSort } from './Helpers/TableHelpers';
import { FoodItem } from 'Types/Nutrition';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: 'auto'
    }
  })
);

interface Props {
  options: FoodItem[];
  onDelete: (foodItemIds: number[]) => void;
}

export default function EnhancedTable(props: Props) {
  const classes = useStyles();
  const { options, onDelete } = props;
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState<any>('calories');
  const [selected, setSelected] = useState<number[]>([]);

  const handleRequestSort = (e: any, property: any) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelectedIds = options.map(d => d.id!);
      setSelected(newSelectedIds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    onDelete(selected);
    setSelected([]);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={options.length}
            />
            <TableBody>
              {stableSort(options, getSorting(order, orderBy)).map((n: FoodItem) => {
                const isItemSelected = isSelected(n.id!);
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(n.id!)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isItemSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell component='th' scope='row' padding='none'>
                      {n.name}
                    </TableCell>
                    <TableCell align='right'>{n.calories}</TableCell>
                    <TableCell align='right'>{n.fats}</TableCell>
                    <TableCell align='right'>{n.carbohydrates}</TableCell>
                    <TableCell align='right'>{n.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}
