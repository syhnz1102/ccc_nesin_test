export const now = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  let hh = today.getHours();
  let min = today.getMinutes();
  let ss = today.getSeconds();
  if ( hh < 10 ){ hh = "0" + hh; }
  if ( min < 10 ){ min = "0" + min; }
  if ( ss < 10 ){ ss = "0" + ss; }
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

export const runningTime = (counter) => {
  let sec = counter % 60;
  let min = Math.floor( counter / 60 );
  let hour = Math.floor( min / 60 );
  min = min % 60;
  let time = ''

  //시, 분, 초
  if ( hour < 10 ){ hour = "0" + hour; }
  if ( min < 10 ){ min = "0" + min; }
  if ( sec < 10 ){ sec = "0" + sec; }

  //1시간 전후 시간모양 변경
  if ( hour == 0 ){ time = min + ':' + sec; }
  else { time = hour + ':' + min + ':' + sec; }

  return time
}

let interval = null;
let time = 0;

export const startInterval = () => {
  interval = setInterval(() => { time++ }, 1000);
}

export const stopInterval = () => {
  if (interval) clearInterval(interval);

  time = 0;
  interval = null;
}

export const getIntervalTime = () => {
  return runningTime(time);
}
