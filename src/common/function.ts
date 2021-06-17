export const numberComma = (num: number) => {
  if(num) {
    return Number(num).toLocaleString('en');
  }

  return '0';
}

export const toggleToBoolean = (toggle: string | undefined) => {
    return toggle === 'y' ? true : false
}