import React from "react";
import { Grid } from "@material-ui/core";

import { FoodItem } from "Types/Nutrition";
import EnhancedTable from "Components/LayoutElements/Table/EnhancedTable";

interface Props {
  foodItems: FoodItem[];
  handleDelete: (foodItemIds: number[]) => void;
}

export default function FoodItemsList({ foodItems, handleDelete }: Props) {

  return (
    <Grid container direction="row" justify="center">
      <EnhancedTable options={foodItems} onDelete={handleDelete}/>
    </Grid>
  );
}
