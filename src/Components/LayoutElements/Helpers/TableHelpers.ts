import { FoodItem } from 'Types/Nutrition';

export const getSorting = (order: string, orderBy: string) => {
  return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
};

export const desc = (a: any[], b: any[], orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const stableSort = (array: any[], cmp: any) => {
  const stabilisedThis = array.map((el: any, i) => [el, i]);
  stabilisedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilisedThis.map(el => el[0]);
};

export const createTableData = (data: FoodItem[]) => data.map((d, i) => ({ ...d, id: i }));