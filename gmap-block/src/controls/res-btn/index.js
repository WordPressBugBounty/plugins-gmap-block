/**
 * WordPress dependencies
 */
import { Button, ButtonGroup, Dropdown } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

// Internal dependencies
import { RES_DEVICES } from '../../constants';

const ResBtn = props => {
    const { setAttributes } = props;
    const previewMode = wp.data.select('core/editor').getDeviceType(); // get current device type

    useEffect(() => {
        // set the default device type
        if (!previewMode) {
            wp.data.dispatch('core/editor').setDeviceType('Desktop');
        }

        setAttributes({ resMode: previewMode });
    }, [previewMode]);

    return (
        <Dropdown
            className="gmap-units-dropdown"
            contentClassName="gmap-units-content-wrapper"
            position="bottom right"
            renderToggle={({ isOpen, onToggle }) => (
                <button className="gmap-selected-unit" onClick={onToggle} aria-expanded={isOpen}>
                    {RES_DEVICES.find(device => device.value === previewMode).icon}
                </button>
            )}
            renderContent={() => (
                <div className="gmap-res-btn">
                    <ButtonGroup>
                        {RES_DEVICES &&
                            RES_DEVICES.map((device, index) => {
                                return (
                                    <Button
                                        key={index}
                                        className={`gmap-device-btn ${previewMode === device.value ? 'gmap-active' : ''}`}
                                        onClick={() => {
                                            setAttributes({ resMode: device.value });
                                            wp.data.dispatch('core/editor').setDeviceType(device.value);
                                        }}
                                        title={device.label}
                                    >
                                        {device.icon}
                                    </Button>
                                );
                            })}
                    </ButtonGroup>
                </div>
            )}
        />
    );
};

export default ResBtn;
