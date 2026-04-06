/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
const { BorderControl, ResBoxControl, ResRangeControl, SingleRangeControl, HeaderTabs } = window?.gmapModules;

// obj attributes
import objAttributes from './attributes';

// constants
import { MAP_BORDER, MAP_BRADIUS, MAP_HEIGHT, MAP_MARGIN, MAP_PADDING } from './constants';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { address, zoom, type } = attributes;

    const objAttrs = { attributes, setAttributes, objAttributes };

    console.log('gmapBlockPro', window?.gmapBlockPro);

    return (
        <HeaderTabs
            generalControls={
                <>
                    <PanelBody>
                        <TextControl
                            label={__('Enter a Location', 'embed-blocks')}
                            value={address}
                            onChange={v => setAttributes({ address: v })}
                            placeholder={__('Enter a Location', 'embed-blocks')}
                            __next40pxDefaultSize={true}
                        />
                        <SelectControl
                            label={__('Map Type', 'embed-blocks')}
                            value={type}
                            options={[
                                { label: __('Roadmap', 'embed-blocks'), value: 'roadmap' },
                                { label: __('Satellite', 'embed-blocks'), value: 'satellite' },
                                { label: __('Terrain', 'embed-blocks'), value: 'terrain' },
                                { label: __('Hybrid', 'embed-blocks'), value: 'hybrid' }
                            ]}
                            onChange={type => {
                                setAttributes({ type });
                            }}
                            __next40pxDefaultSize={true}
                            labelPosition="side"
                        />
                        <ResRangeControl
                            label={__('Height', 'embed-blocks')}
                            controlName={MAP_HEIGHT}
                            objAttrs={objAttrs}
                            min={100}
                            max={1000}
                            step={1}
                        />
                        <SingleRangeControl
                            label={__('Zoom Level', 'embed-blocks')}
                            value={zoom}
                            onChange={v => setAttributes({ zoom: v })}
                            min={1}
                            max={20}
                            onClickReset={() => setAttributes({ zoom: 10 })}
                        />
                    </PanelBody>
                    {window?.gmapBlockPro?.has_pro !== '1' && (
                        <div className="gmap-pro-link">
                            <p className="title">{__('Unlock more Features', 'gmap')}</p>
                            <div className="features-list">
                                <li>{__('Advanced Map', 'gmap')}</li>
                                <li>{__('SVG Map', 'gmap')}</li>
                                <li>{__('Multiple Markers', 'gmap')}</li>
                                <li>{__('Custom Marker', 'gmap')}</li>
                                <li>{__('Info Window', 'gmap')}</li>
                                <li>{__('Directions', 'gmap')}</li>
                                <li>{__('Street View', 'gmap')}</li>
                                <li>{__('Map Styles', 'gmap')}</li>
                                <li>{__('And Many More...', 'gmap')}</li>
                            </div>
                            <a
                                href="https://gmap.gutenbergkits.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gmap-pro-link-text"
                            >
                                {__('Upgrade to Pro', 'gmap')}
                            </a>
                        </div>
                    )}
                </>
            }
            styleControls={
                <>
                    <PanelBody>
                        <BorderControl objAttrs={objAttrs} controlName={MAP_BORDER} noHover={true} />
                        <ResBoxControl label={__('Border Radius', 'embed-blocks')} controlName={MAP_BRADIUS} objAttrs={objAttrs} />
                        <ResBoxControl label={__('Padding', 'embed-blocks')} controlName={MAP_PADDING} objAttrs={objAttrs} />
                        <ResBoxControl label={__('Margin', 'embed-blocks')} controlName={MAP_MARGIN} objAttrs={objAttrs} />
                    </PanelBody>
                </>
            }
        />
    );
};

export default Inspector;
