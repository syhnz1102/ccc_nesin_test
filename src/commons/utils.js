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

export const runningTime = (counter) => {
  let sec = counter % 60;
  let min = Math.floor( counter / 60 );
  let hour = Math.floor( min / 60 );
  let time = 'asd'

  //시, 분, 초
  if( hour < 10 ){ hour = "0" + hour; }
  if( min < 10 ){ min = "0" + min; }
  if( sec < 10 ){ sec = "0" + sec; }

  //1시간 전후 시간모양 변경
  if( hour == 0 ){ time = min + ':' + sec; }
  else { time = hour + ':' + min + ':' + sec; }

  return time
}