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