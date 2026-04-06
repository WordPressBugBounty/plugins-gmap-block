/**
 * WordPress dependencies
 */
import { BaseControl, Button, ColorIndicator, ColorPicker, Flex, FlexBlock, FlexItem, Popover } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const ColorControl = ({ label, color, onChange, instanceId }) => {
    const [colorPanel, setColorPanel] = useState(false);

    const id = `color-control-${instanceId}`;

    // get colors from theme
    const COLORS = wp.data.select('core/editor').getEditorSettings().colors;

    return (
        <div className="gmap-control-container gmap-color-control gmap-mb-0">
            <Flex>
                <FlexBlock>
                    <BaseControl id={id} label={label} />
                </FlexBlock>
                <FlexItem>
                    <Button
                        icon="image-rotate"
                        label={__('Reset', 'gmap-block')}
                        onClick={() => onChange('')}
                        className={`gmap-reset-button ${color ? 'active' : 'disabled'}`}
                    />
                </FlexItem>
                <FlexItem>
                    <button className="color-indicator" onClick={() => setColorPanel(true)}>
                        <ColorIndicator colorValue={color} />
                    </button>
                    {colorPanel && (
                        <Popover position="bottom right" onFocusOutside={() => setColorPanel(false)} offset={10}>
                            <div className="gmap-color-panel">
                                <ColorPicker color={color} onChangeComplete={value => onChange(value.hex)} disableAlpha={false} />
                                <div className="gmap-colors-palette">
                                    <label className="gmap-label gmap-mb-8" htmlFor="gmap-colors-palette">
                                        {__('Theme Colors', 'gmap-block')}
                                    </label>
                                    <div id="gmap-colors-palette">
                                        {COLORS &&
                                            COLORS.map((paletteColor, index) => {
                                                return (
                                                    <ColorIndicator
                                                        className={classNames(
                                                            'gmap-color-indicator',
                                                            `${color === `var(--wp--preset--color--${paletteColor.slug})` ? 'active' : ''}`
                                                        )}
                                                        title={paletteColor.name}
                                                        key={index}
                                                        colorValue={paletteColor.color}
                                                        onClick={() => onChange(`var(--wp--preset--color--${paletteColor.slug})`)}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    )}
                </FlexItem>
            </Flex>
        </div>
    );
};

export default withInstanceId(ColorControl);
