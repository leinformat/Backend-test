// This function detects if a number is prime or equal to 1
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

// This function splits a string into two parts when there is a space.
export const getFirstOrLastName = (fullname,type) => {
    const splitedName = fullname.split(' ');
    if(type.toLowerCase() === 'first'){
        return splitedName[0];
    }
    return splitedName.slice(1).join(' ');
}

// This function delays the execution of the code, it receives a value in milliseconds as a parameter
export const delayExecution = (milliseconds = 500) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Returns a new object with the schema passed to it
export const fixerData = (allData,schema) => {
  const data = allData.properties;
  const dataVariables = schema;
  
  const newData = {};

  for (const variable in dataVariables) {
    const varibleIndex = dataVariables[variable];

    if(!data[varibleIndex]) continue;

    newData[varibleIndex] = data[varibleIndex]?.value;
  }
  return newData;
};