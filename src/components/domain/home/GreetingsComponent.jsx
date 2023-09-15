import DataService from "#/services/DataService.js";
import { useEffect, useMemo } from "react";
import {  useHookstate } from "@hookstate/core";
import { getHours } from "date-fns";

const GreetingsComponent = () => {
  const { messages } = DataService();
  const dateAndTime = useHookstate(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      dateAndTime.set(new Date());
    }, 600000);
    return () => clearInterval(timer);
  }, []);

  const messageForNow = useMemo(()=>{
    const hourNow = getHours(dateAndTime.get())
    const minuteNow = dateAndTime.get().getMinutes()
    const message = messages?.find((msg)=> {
      const timeFrom = msg?.startHour;
      const timeTo = msg?.endHour;
      const [hourFrom, minuteFrom] = timeFrom?.split(":") || [0, 0];
      const [hourTo, minuteTo] = timeTo?.split(":") || [0, 0];
      if(hourNow >= hourFrom && hourNow <= hourTo) {
        if(hourNow === hourFrom && minuteNow < minuteFrom) {
          return false
        }
        if(hourNow === hourTo && minuteNow > minuteTo) {
          return false
        }
        return true
      }
    })
    return message?.text || "..."
  }, [dateAndTime.get(), messages])

    return (
        <div className="h-12 flex items-center justify-between" style={{ color: 'var(--surface-500)' }}>
            <p className="text-[14px] break-words font-medium">{messageForNow}</p>
        </div>
    );
}

export default GreetingsComponent;