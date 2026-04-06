/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const HeaderTabs = ({ generalControls, styleControls }) => {
    return (
        <>
            <InspectorControls group="settings">
                <div className="gmap-panels">{generalControls}</div>
            </InspectorControls>
            <InspectorControls group="styles">
                <div className="gmap-panels">{styleControls}</div>
            </InspectorControls>
        </>
    );
};

export default HeaderTabs;
