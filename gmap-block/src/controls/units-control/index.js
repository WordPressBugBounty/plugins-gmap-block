import { Dropdown } from '@wordpress/components';

const UnitsControl = ({ value, onChange, units }) => {
    return (
        <Dropdown
            className="gmap-units-dropdown"
            contentClassName="gmap-units-content-wrapper"
            position="bottom right"
            renderToggle={({ isOpen, onToggle }) => (
                <button className="gmap-selected-unit" onClick={onToggle} aria-expanded={isOpen}>
                    {value}
                </button>
            )}
            renderContent={() => (
                <div className="gmap-units-wrapper">
                    {units &&
                        units.map((u, index) => {
                            return (
                                <button
                                    className={`unit-btn ${u === value ? 'gmap-active' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        onChange(u);
                                    }}
                                >
                                    {u}
                                </button>
                            );
                        })}
                </div>
            )}
        />
    );
};

export default UnitsControl;
