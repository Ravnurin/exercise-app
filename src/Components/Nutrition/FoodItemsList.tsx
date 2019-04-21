import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';

import { FoodItem } from 'Types/Nutrition';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
});

interface Props extends WithStyles<typeof styles> {
  foodItems: FoodItem[];
}

function FoodItemsList({ foodItems, classes }: Props) {

  return (
    <Grid container direction='row' justify='center'>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Food Item</strong></TableCell>
              <TableCell>Serving Size (g)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat (g)</TableCell>
              <TableCell>Carbs (g)</TableCell>
              <TableCell>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map(fi => (
              <TableRow key={`${fi.name}-${fi.servingSize}`}>
                <TableCell component='th' scope='row'>{fi.name}</TableCell>
                <TableCell>{fi.servingSize}</TableCell>
                <TableCell>{fi.calories}</TableCell>
                <TableCell>{fi.fats}</TableCell>
                <TableCell>{fi.carbohydrates}</TableCell>
                <TableCell>{fi.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

export default withStyles(styles)(FoodItemsList);