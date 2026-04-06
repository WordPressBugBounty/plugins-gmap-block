// import editor style
import './editor.scss';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';

/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
const { handleUniqueId } = window?.gmapModules?.Helpers;

import GoogleMap from './map';
import Inspector from './inspector';

// Dynamic Style
import DynamicStyle from './dynamic-style';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const { uniqueId, address, zoom, type } = attributes;

    /**
     * Handle Block Unique Id
     */
    useEffect(() => {
        handleUniqueId({ uniqueId, setAttributes, clientId });
    }, []);

    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        className: classNames(uniqueId)
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <DynamicStyle {...props} />
            <div {...blockProps}>
                <GoogleMap location={address} zoom={zoom} type={type} className="embd-map" />
            </div>
        </Fragment>
    );
};

export default Edit;
