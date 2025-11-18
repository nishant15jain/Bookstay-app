'use client';
import { Range, DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates: Date[];
}
const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => {
    return (
        <DateRange
            rangeColors={["#262626"]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            disabledDates={disabledDates}
            showDateDisplay={false}
            minDate={new Date()}
            direction="vertical"
        />
    );
};
export default Calendar;
