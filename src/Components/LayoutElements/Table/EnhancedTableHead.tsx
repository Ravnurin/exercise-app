import React, { ChangeEvent } from 'react';
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import { SortDirection } from '@material-ui/core/TableCell';

interface Props {
  numSelected: number;
  order: 'asc' | 'desc';
  orderBy: SortDirection;
  rowCount: number;
  onRequestSort: (e: any, property: any) => void;
  onSelectAllClick: (e: ChangeEvent<HTMLInputElement>) => void;
}

const rows = [
  { id: 'name', align: 'left', disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', align: 'right', disablePadding: false, label: 'Calories' },
  { id: 'fats', align: 'right', disablePadding: false, label: 'Fat (g)' },
  { id: 'carbohydrates', align: 'right', disablePadding: false, label: 'Carbohydrates (g)' },
  { id: 'protein', align: 'right', disablePadding: false, label: 'Protein (g)' }
];

export default function EnhancedTableHead(props: Props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && rowCount > 0}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {rows.map(row => (
          <TableCell
            key={row.id}
            align={row.align as 'right'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}>
            <Tooltip
              title='Sort'
              placement={row.align ? 'bottom-end' : 'bottom-start'}
              enterDelay={300}>
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}>
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
