import { useEffect, useState } from 'react';
import getMonth from 'date-fns/getMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import format from 'date-fns/format';
import { talkData } from '../services/data';

const useGenerateMonthObject = () => {
  const lastDay = lastDayOfMonth(new Date());
  const month = getMonth(new Date());
  const formatDay = format(lastDay, 'yyyy-MM-dd');
  const days = formatDay.split('-').pop();

  const [thisMonthData, setThisMonthData] = useState([]);
  useEffect(() => {
    let objectData = [];
    talkData.map((day) => objectData.push(day));
    const arrayMonthData = objectData.map((item) => item.day - 1);

    let arrayDayOfMonth = [];
    const dayOfMonth = parseInt(days);
    for (let i = 0; i < dayOfMonth; i++) {
      arrayDayOfMonth.push(i + 1);
    }

    let resultArray = arrayDayOfMonth.filter(
      (i) => arrayMonthData.indexOf(i) === -1,
    );

    for (let i = 0; i < resultArray.length; i++) {
      objectData.splice(resultArray[i], 0, { day: 0, time: 0, members: 0 });
    }

    objectData.pop();
    setThisMonthData(objectData);
  }, []);

  return { days, month, thisMonthData, setThisMonthData };
};
export default useGenerateMonthObject;
