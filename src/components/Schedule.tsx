import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ScheduleProps {
    times: string[];
    doctor: {
        name: string;
        specialization: string;
    };
    selectedDate: string;
}

const Schedule: React.FC<ScheduleProps> = ({ times, doctor, selectedDate }) => {
    const navigate = useNavigate();

    const handleTimeSelect = (time: string) => {
        navigate('/booking', {
            state: {
                doctor,
                date: selectedDate,
                time
            }
        });
    };

    return (
        <div className="schedule">
            <h4>Доступное время:</h4>
            {times.length > 0 ? (
                <div className="schedule-times">
                    {times.map((time, index) => (
                        <button
                            key={index}
                            className="schedule-time"
                            onClick={() => handleTimeSelect(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            ) : (
                <p>Нет доступного времени</p>
            )}
        </div>
    );
};

export default Schedule;