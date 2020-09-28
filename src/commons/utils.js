export const now = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const hh = today.getHours();
  const min = today.getMinutes();
  const ss = today.getSeconds();
  today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;

  return today
}

export const chatTime = () => {
  let today = new Date();
  const hh = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  today = hh + ':' + min;

  return today
}
