/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Internal dependencies
import { PREFIX } from '../../constants';

const DimensionControl = ({ top, right, bottom, left, onChange, neededProps, min = null, max = null, instanceId }) => {
    const { setAttributes, controlName, isLinked } = neededProps;

    const [dimensions, setDimensions] = useState({
        top,
        right,
        bottom,
        left
    });

    useEffect(() => {
        setDimensions({
            top,
            right,
            bottom,
            left
        });
    }, [top, left, right, bottom]);

    const onInputChange = e => {
        const { name, value } = e.target;

        if (isLinked) {
            setDimensions({
                top: value,
                right: value,
                bottom: value,
                left: value
            });
        } else {
            setDimensions({
                ...dimensions,
                [name]: value
            });
        }
    };

    useEffect(() => {
        onChange(dimensions);
    }, [dimensions]);

    useEffect(() => {
        setAttributes({
            [`${controlName}IsLinked`]: isLinked
        });
    }, [isLinked]);

    return (
        <div className="gmap-single-inputs-group">
            <div className="single-input first-item">
                <input type="number" name="top" id={`top-${instanceId}`} value={dimensions.top} onChange={onInputChange} placeholder="-" />
                <label className="input-label" htmlFor={`top-${instanceId}`}>
                    {__('Top', 'gmap-block')}
                </label>
            </div>
            <div className="single-input">
                <input
                    type="number"
                    name="right"
                    id={`right-${instanceId}`}
                    value={dimensions.right}
                    onChange={onInputChange}
                    placeholder="-"
                />
                <label className="input-label" htmlFor={`right-${instanceId}`}>
                    {__('Right', 'gmap-block')}
                </label>
            </div>
            <div className="single-input">
                <input
                    type="number"
                    id={`bottom-${instanceId}`}
                    name="bottom"
                    value={dimensions.bottom}
                    onChange={onInputChange}
                    placeholder="-"
                />
                <label className="input-label" htmlFor={`bottom-${instanceId}`}>
                    {__('Bottom', 'gmap-block')}
                </label>
            </div>
            <div className="single-input">
                <input
                    type="number"
                    id={`left-${instanceId}`}
                    name="left"
                    value={dimensions.left}
                    onChange={onInputChange}
                    placeholder="-"
                />
                <label className="input-label" htmlFor={`left-${instanceId}`}>
                    {__('Left', 'gmap-block')}
                </label>
            </div>
            <div className="single-input desk-linked-btn">
                <Button
                    className={isLinked ? 'active' : ''}
                    onClick={() =>
                        setAttributes({
                            [`${PREFIX}${controlName}IsLinked`]: !isLinked
                        })
                    }
                    icon={isLinked ? 'admin-links' : 'editor-unlink'}
                />
            </div>
        </div>
    );
};

export default withInstanceId(DimensionControl);
