/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// Internal Dependencies
import GoogleMap from './map';

// block save function
const Save = props => {
    const { attributes } = props;
    const { uniqueId, address, zoom, type } = attributes;

    /**
     * Block Props
     */
    const blockProps = useBlockProps.save({
        className: classNames('wp-block-gmap-gmap-block', uniqueId)
    });

    return (
        <div {...blockProps}>
            <GoogleMap location={address} zoom={zoom} type={type} className="embd-map" />
        </div>
    );
};

export default Save;
