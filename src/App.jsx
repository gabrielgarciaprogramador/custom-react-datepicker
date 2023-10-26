import React, { useState } from "react";
import { getMonth, getYear, subDays, format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";
import DatePicker from "react-datepicker";

import "./App.scss";

import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [date, setDate] = useState(null);

  const [viewDates, setViewDates] = useState(true);
  const [viewMonths, setViewMonths] = useState(false);
  const [viewYears, setViewYears] = useState(false);

  const alterView = (format) => {
    setViewDates(format != "year" && format != "month");
    setViewMonths((format == "month"));
    setViewYears((format == "year"));
  }

  const excludeDates = [
    subDays(new Date(), 1),
    subDays(new Date(), 2)
  ];

  return (
    <>
      <DatePicker
        selected={date}
        onSelect={() => {
          alterView(viewYears && "month");
        }}
        onChange={(value) => {
          let newValue = null;
          if(date){
            let oldDate = new Date(date);
            
            if(viewYears){
              newValue = oldDate.setYear(getYear(value))
            }
            else if(viewMonths){
              newValue = oldDate.setMonth(getMonth(value))
            }
            else{
              newValue = value;
            }
          }
          setDate(date ? newValue : value)
        }}
        showMonthYearPicker={viewMonths}
        showFourColumnMonthYearPicker={viewMonths}
        showYearPicker={viewYears}
        shouldCloseOnSelect={viewDates}
        dateFormat="dd/MM/yyyy"
        fixedHeight
        locale={ptBR}
        excludeDates={viewDates ? excludeDates : []}
        onCalendarClose={alterView}
        renderCustomHeader={viewYears ? undefined : ({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 5,
                  alignItems: "center"
                }}
              >
                {viewDates && <span onClick={() => alterView("month")}>{format(date, "MMMM", { locale: ptBR })}</span>}
                {!viewYears && <span onClick={() => alterView("year")}>{getYear(date)}</span>}
              </div>
    
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
      >
        {!viewDates ?
          (<button onClick={() => setDate(new Date())}>Hoje</button>)
          : (<button onClick={() => setDate(null)}>Limpar</button>)
        }
      </DatePicker>
    </>
  )
}

export default App