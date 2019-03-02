export const getChangedProps = (orgObj: any, changedObj: any, excludeEmptyString: boolean = false) => {
  const newObject = {};

  Object.keys(changedObj).forEach(key => {
    const newProp = changedObj[key];
    const excludeProp = newProp === '' && excludeEmptyString;

    if (orgObj[key] !== newProp && !excludeProp) {
      newObject[key] = changedObj[key];
    }
  });
  return newObject;
};

export const getPropsWithTrimmedSpace = (obj: any) => {
  const newObject = {};

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      newObject[key] = (obj[key] as string).trim();
    }
  });
  return newObject;
};
