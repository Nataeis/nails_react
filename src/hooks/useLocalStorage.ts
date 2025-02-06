import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Инициализация состояния из localStorage или с начальным значением
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Ошибка чтения из localStorage', error);
            return initialValue;
        }
    });

    // Функция для обновления состояния и localStorage
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Ошибка записи в localStorage', error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;