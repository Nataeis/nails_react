import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface BookingState {
    doctor: {
        name: string;
        specialization: string;
    };
    date: string;
    time: string;
}

interface ColorData {
    hex: {
        value: string;
    };
    name: {
        value: string;
    };
}

const BookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { doctor, date, time } = location.state as BookingState;
    const [fullName, setFullName] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [nailColor, setNailColor] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const fetchRandomColor = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('https://www.thecolorapi.com/random');
            const data: ColorData = await response.json();
            setNailColor(data.hex.value);
        } catch (err) {
            setError('Не удалось загрузить цвет. Попробуйте ещё раз.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nailColor) {
            alert('Пожалуйста, выберите цвет ногтей!');
            return;
        }
        console.log({ doctor, date, time, fullName, comment, nailColor });
        navigate('/');
    };

    return (
        <div className="booking-page">
            <nav className="navigation">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/about" className="nav-link">О нас</Link>
            </nav>
            <h2>Оформление записи</h2>
            <div className="booking-info">
                <p><strong>Специалист:</strong> {doctor.name} ({doctor.specialization})</p>
                <p><strong>Дата:</strong> {date}</p>
                <p><strong>Время:</strong> {time}</p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label>ФИО:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Комментарий:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="color-selection">
                    <h3>Выберите цвет ногтей:</h3>
                    <button
                        type="button"
                        onClick={fetchRandomColor}
                        disabled={isLoading}
                        className="color-generate-btn"
                    >
                        {isLoading ? 'Загрузка...' : 'Сгенерировать случайный цвет'}
                    </button>

                    {error && <p className="error-message">{error}</p>}

                    {nailColor && (
                        <div className="color-preview">
                            <div
                                className="color-box"
                                style={{backgroundColor: nailColor}}
                            />
                            <p className="color-value">{nailColor}</p>
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(-1)}>Назад</button>
                    <button type="submit">Подтвердить запись</button>
                </div>
            </form>
        </div>
    );
};

export default BookingPage;