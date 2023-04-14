import React , {useState} from 'react'
import { DateTime } from 'luxon';


const DateRangeSelector = ({dateRange,setDateRange}) => {
  const [showSpanInput, setShowSpanInput] = useState(false)
  const [dateMessage, setDateMessage] = useState('All reservations on: ')
  const [timeFrame,setTimeFrame] = useState('day')

  const dateInputChange = (e) => {
    let name = e.target.name
    let value = DateTime.fromISO(e.target.value).toLocal()
    if(name === 'start') {
      if (timeFrame === 'day') 
        setDateRange({start:value,end:value})
      if (timeFrame === 'week') 
        setDateRange({start:value,end:value.plus({day:7})})
      if (timeFrame === 'year') 
        setDateRange({start:value,end:value.plus({year:1})})
      if (timeFrame === 'span') 
        setDateRange({start:value,end:dateRange.end})
    } else if(name === 'end') {
      setDateRange({start:dateRange.start,end:value})
    }}

  const dateSpanChange = (e) => {
    if (e.target.name === 'day') {
      setDateRange({start:dateRange.start,end:dateRange.start})
      setDateMessage('All reservations on: ')
      setShowSpanInput(false)
      setTimeFrame('day')
    }
    if (e.target.name === 'week') {
      setDateRange({start:dateRange.start,end:dateRange.start.plus({day:7})})
      setDateMessage('All reservations a week from: ')
      setShowSpanInput(false)
      setTimeFrame('week')
    }
    if (e.target.name === 'year') {
      setDateRange({start:dateRange.start,end:dateRange.start.plus({year:1})})
      setDateMessage('All reservations a year from: ')
      setShowSpanInput(false)
      setTimeFrame('year')
    }
    if (e.target.name === 'span') {
      setDateMessage('All reservations between: ')
      setShowSpanInput(true)
      setTimeFrame('span')
    }
  }

  return(<>
  <div className="mb-5 mt-5 flex flex-col">
    <div>
        <h3 className="text-center text-2xl">Reservation Date Range Selection</h3>
          <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group"
          >
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="day"
              onClick={(e)=>dateSpanChange(e)}
            >
              Day
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="week"
              onClick={(e)=>dateSpanChange(e)}
            >
              Week
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="year"
              onClick={(e)=>dateSpanChange(e)}
            >
              Year
            </button>
            <button
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 active:bg-secondary"
              name="span"
              onClick={(e)=>dateSpanChange(e)}
            >
              Span
            </button>
          </div>
          <div>
          {dateMessage}
            <input name="start" type="date" defaultValue={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
            <input className={showSpanInput ? `visible` : `invisible`}name="end" type="date" defaultValue={dateRange.start.toFormat('yyyy-MM-dd')} min={dateRange.start.toFormat('yyyy-MM-dd')} onChange={(e)=>dateInputChange(e)}/>
          </div>
          </div>
          </div>
          

  </>)

}

export default DateRangeSelector
