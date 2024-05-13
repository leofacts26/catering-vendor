import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // MUI calendar icon

const DatePickerSearch = () => {
    const [showPicker, setShowPicker] = useState(true); // Changed initial state to true
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const pickerRef = useRef();

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatSelectedRange = (range) => {
        const { startDate, endDate } = range;
        const formattedStart = formatDate(startDate).toLowerCase(); // Capitalize start date
        const formattedEnd = formatDate(endDate).toLowerCase(); // Capitalize end date
        return `${formattedStart} - ${formattedEnd}`;
    };

    const handleSelect = (ranges) => {
        setSelectedRange(ranges.selection);
    };

    useEffect(() => {
        if (selectedRange.startDate !== selectedRange.endDate) {
            setShowPicker(false);
        }
    }, [selectedRange]);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const rangeColors = ['#C33332', '#C33332', '#C33332'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ maxWidth: '100%', position: 'relative' }} ref={pickerRef}>
            <Button
                variant="outlined"
                className='search-btn'
                style={{
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#C33332',
                    width: '100%',
                    padding: '11px 10px',
                    border: '2px solid #C33332',
                    textTransform: 'capitalize', 
                }}
                startIcon={<CalendarTodayIcon />}
                onClick={togglePicker}
            >
                {formatSelectedRange(selectedRange)}
            </Button>
            {showPicker && (
                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', zIndex: 9999 }}>
                    <DateRangePicker
                        ranges={[selectedRange]}
                        onChange={handleSelect}
                        onClose={togglePicker}
                        rangeColors={rangeColors}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePickerSearch;
