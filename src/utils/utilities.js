export const isPrime = (num) => {
    if (num < 1) {
        return false;
    }
    if (num <= 3) {
        return true;
    }
    if (num % 2 === 0 || num % 3 === 0) {
        return false;
    }
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

export const getFirstOrLastName = (fullname,type) => {
    const splitedName = fullname.split(' ');
    if(type.toLowerCase() === 'first'){
        return splitedName[0];
    }
    return splitedName.slice(1).join(' ');
}

export const delayExecution = (milliseconds = 500) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const fixerData = (allData) => {
  const data = allData.properties;
  const dataVariables = {
    character_id: "character_id",
    firstname: "firstname",
    lastname: "lastname",
    status_character: "status_character",
    character_species: "character_species",
    character_gender: "character_gender",
    associatedcompanyid: "associatedcompanyid",
  };
  const newData = {};

  for (const variable in dataVariables) {
    const varibleIndex = dataVariables[variable];

    if(!data[varibleIndex]) continue;

    newData[varibleIndex] = data[varibleIndex]?.value;
  }
  return newData;
};