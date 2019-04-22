import React, { useState, ChangeEvent } from "react";
import {
  createStyles,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";

import {
  getSorting,
  stableSort
} from "../Helpers/TableHelpers";
import { FoodItem } from "Types/Nutrition";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    table: {
      minWidth: 1020
    },
    tableWrapper: {
      overflowX: "auto"
    }
  });


interface Props extends WithStyles<typeof styles> {
  options: FoodItem[];
  onDelete: (foodItemIds: number[]) => void;
}

function EnhancedTable(props: Props) {
  const { classes, options, onDelete } = props;
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<any>("calories");
  const [selected, setSelected] = useState<number[]>([]);

  const handleRequestSort = (e: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Paper className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} onDelete={() => onDelete(selected)}/>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
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
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
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
  );
}

export default withStyles(styles)(EnhancedTable);
