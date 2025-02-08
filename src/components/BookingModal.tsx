import React from "react";

interface BookingModalProps {
    doctorName: string;
    specialization: string;
    date: string;
    time: string;
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
                                                       doctorName,
                                                       specialization,
                                                       date,
                                                       time,
                                                       onClose,
                                                   }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Сохраняйте письмо с номером на запись!</h2>
                <p>С сайта можно записаться не более двух раз в сутки</p>

                <div className="modal-details">
                    <p><strong>Мастер:</strong> {doctorName}</p>
                    <p><strong>Специализация:</strong> {specialization}</p>
                    <p><strong>Дата:</strong> {date}</p>
                    <p><strong>Время:</strong> {time}</p>
                </div>

                <button className="close-btn" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default BookingModal;
