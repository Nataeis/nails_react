import React from 'react';

export interface ILocation {
    name: string;
    date: string;
}

interface LocationTabsProps {
    locations: ILocation[];
    selectedLocation: number;
    setSelectedLocation: (index: number) => void;
}

const LocationTabs: React.FC<LocationTabsProps> = ({ locations, selectedLocation, setSelectedLocation }) => {
    return (
        <div className="location-tabs">
            {locations.map((location, index) => (
                <button
                    key={index}
                    className={`location-tab ${selectedLocation === index ? 'active' : ''}`}
                    onClick={() => setSelectedLocation(index)}
                >
                    <span className="location-day">{location.name}</span>
                    <span className="location-date">{location.date}</span>
                </button>
            ))}
        </div>
    );
};

export default LocationTabs;
