
// Определяем интерфейсы прямо в файле
export interface IDoctor {
    name: string;
    specialization: string;
    image: string;
}
// Компонент DoctorInfo (карточка мастера)
const DoctorInfo = ({ doctor }: { doctor: IDoctor }) => (
    <div className="doctor-info">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" />
        <h3>{doctor.name}</h3>
        <p>{doctor.specialization}</p>
    </div>
);

export default DoctorInfo;