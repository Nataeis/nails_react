import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import DoctorInfo, { IDoctor } from "../components/DoctorInfo";
import LocationTabs, { ILocation } from "../components/LocationTabs";
import BookingModal from "../components/BookingModal";

const HomePage: React.FC = () => {
    const doctors: IDoctor[] = [
        { name: 'Майли Сайрус', specialization: 'Мастер маникюра', image: './src/img/miley.jpg' },
        { name: 'Селена Гомес', specialization: 'Топ-мастер маникюра', image: '/src/img/selena-gomez.jpg' },
        { name: 'Ариана Гранде', specialization: 'Младший мастер маникюра', image: '/src/img/ariana.png' },
        { name: 'Никки Минаж', specialization: 'Мастер маникюра', image: '/src/img/nikki.png' },
    ];

    const [selectedLocations, setSelectedLocations] = React.useState<number[]>(new Array(doctors.length).fill(0));
    const [doctorSchedules, setDoctorSchedules] = React.useState<{ [date: string]: string[] }[]>([
        { '2025-02-03': ['10:00', '11:00', '12:00'], '2025-02-04': ['14:00', '15:00'] },
        { '2025-02-04': ['09:00', '10:30'], '2025-02-28': ['13:00', '16:00'] },
        { '2025-02-05': ['12:00', '13:00'], '2025-01-29': ['11:00', '15:00'] },
        { '2025-02-06': ['14:00', '15:30'], '2025-01-30': ['10:00', '12:00'] },
    ]);

    const [weekDates, setWeekDates] = React.useState<ILocation[]>([]);
    const [selectedDoctor, setSelectedDoctor] = React.useState<IDoctor | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<string>("");
    const [selectedTime, setSelectedTime] = React.useState<string>("");
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        const generateCurrentWeekDates = () => {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay() + 1);

            const dates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                const day = date.toLocaleDateString('ru-RU', { weekday: 'long' });
                const dateStr = date.toISOString().split('T')[0];
                dates.push({ name: day, date: dateStr });
            }
            return dates;
        };

        setWeekDates(generateCurrentWeekDates());
    }, []);

    const handleLocationChange = (doctorIndex: number, locationIndex: number) => {
        const newSelectedLocations = [...selectedLocations]; // Копия массива
        newSelectedLocations[doctorIndex] = locationIndex; // Изменение копии
        setSelectedLocations(newSelectedLocations); // Обновление состояния
    };

    const handleBooking = (doctor: IDoctor, date: string, time: string) => {
        setSelectedDoctor(doctor);
        setSelectedDate(date);
        setSelectedTime(time);
        setIsModalOpen(true);
    };

    return (
        <div className="app">
            <nav className="navigation">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/about" className="nav-link">О нас</Link>
            </nav>
            <div className="doctor-cards">
                {doctors.map((doctor, doctorIndex) => {
                    const selectedDate = weekDates[selectedLocations[doctorIndex]]?.date || '';
                    const times = doctorSchedules[doctorIndex][selectedDate] || [];

                    return (
                        <div key={doctorIndex} className="doctor-card">
                            <DoctorInfo doctor={doctor} />
                            <LocationTabs
                                locations={weekDates}
                                selectedLocation={selectedLocations[doctorIndex]}
                                setSelectedLocation={(locationIndex) => handleLocationChange(doctorIndex, locationIndex)}
                            />
                            <Schedule
                                times={times}
                                doctor={doctor}
                                selectedDate={selectedDate}
                                onTimeSelect={(time) => handleBooking(doctor, selectedDate, time)}
                            />
                        </div>
                    );
                })}
            </div>

            {isModalOpen && selectedDoctor && (
                <BookingModal
                    doctorName={selectedDoctor.name}
                    specialization={selectedDoctor.specialization}
                    date={selectedDate}
                    time={selectedTime}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default HomePage;