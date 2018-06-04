const arrayToObject = (arr) => {
  const objCur = [];
  for (let i = 0; i < arr.length; ++i) {
    objCur.push({ label: arr[i], value: arr[i] });
    if ((arr.length - 1) === i) {
      return objCur;
    }
  }
  return objCur;
};

const convertValueToLabel = (resourcesPath) => {
  const newArray = [];
  const resCat = resourcesPath;
  const arrLength = resCat.length - 1;
  if (arrLength >= 1) {
    const arr = resCat;
    // Convert value to label & id to value
    Object.keys(arr).map((key) => {
      const obj = {
        label: arr[key].name,
        value: arr[key].id
      };
      newArray.push(obj);
      return newArray;
    });
  }
  return newArray;
};


const remapCodeLongDescription = (logicalViews) => {
  return (logicalViews.length > 0) ? // verificare che il servizio risponda [] non [{}], altrimenti mettere > 1
    logicalViews.map(view => ({
      value: view.code,
      label: view.longDescription
    }))
    : false;
};


export { arrayToObject, convertValueToLabel, remapCodeLongDescription };
