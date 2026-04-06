/**
 * WordPress dependencies
 */
import { Button, ButtonGroup, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ResLabelControl from '../res-label-control';
import classNames from 'classnames';

const ButtonsGroupControl = ({ label = '', value, onChange, options, hasIcons = false, labelPosition = '', width = '' }) => {
    return (
        <div className={classNames('gmap-control-container', 'gmap-btns-group', labelPosition)}>
            {label && (
                <div className={classNames(labelPosition === '' ? 'gmap-mb-8' : 'gmap-btn-group-label')}>
                    <ResLabelControl label={label} noResBtns={true} />
                </div>
            )}
            <ButtonGroup
                {...(width && {
                    style: {
                        width: width
                    }
                })}
                // style={{
                //     width: '100px'
                // }}
            >
                {options &&
                    options.map((btn, index) => {
                        return (
                            <Tooltip key={index} text={btn.label}>
                                <Button
                                    className={`gmap-btn ${btn.value === value ? 'gmap-btn-active' : ''}`}
                                    aria-pressed={btn.value === value}
                                    onClick={() => onChange(btn.value)}
                                    disabled={btn.disabled}
                                    title={btn.label}
                                >
                                    {hasIcons ? btn.icon : btn.label}
                                </Button>
                            </Tooltip>
                        );
                    })}
            </ButtonGroup>
        </div>
    );
};

export default ButtonsGroupControl;
