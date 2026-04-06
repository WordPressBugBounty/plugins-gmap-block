/**
 * WordPress dependencies
 */
import { BaseControl, Button, ColorIndicator, ColorPicker, Flex, FlexBlock, FlexItem, Popover } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PREFIX } from '../../constants';

const ColorsControl = ({ label, controlName, objAttrs, instanceId }) => {
    const { attributes, setAttributes } = objAttrs;
    const [colorPanel, setColorPanel] = useState(false);
    const [hoverColorPanel, setHoverColorPanel] = useState(false);

    const COLORS = wp.data.select('core/editor').getEditorSettings().colors;

    const id = `color-control-${instanceId}`;
    const { [`${PREFIX}${controlName}Colors`]: colors } = attributes;

    const hasValue = colors && (colors?.normal || colors?.hover);

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
                        onClick={() => setAttributes({ [`${PREFIX}${controlName}Colors`]: { normal: '', hover: '' } })}
                        className={`gmap-reset-button ${hasValue ? 'active' : 'disabled'}`}
                    />
                </FlexItem>
                <FlexItem>
                    <button className="color-indicator" onClick={() => setColorPanel(true)}>
                        <ColorIndicator colorValue={colors?.normal} />
                    </button>
                    <button className="color-indicator hover-colors" onClick={() => setHoverColorPanel(true)}>
                        <ColorIndicator colorValue={colors?.hover} />
                    </button>
                    {colorPanel && (
                        <Popover position="bottom right" onFocusOutside={() => setColorPanel(false)} offset={10}>
                            <div className="gmap-color-panel">
                                <ColorPicker
                                    color={colors?.normal}
                                    onChangeComplete={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Colors`]: {
                                                ...colors,
                                                normal: value.hex
                                            }
                                        })
                                    }
                                    disableAlpha={false}
                                />
                                <div className="gmap-colors-palette">
                                    <label className="gmap-label gmap-mb-8" htmlFor="gmap-colors-palette">
                                        {__('Colors Palette', 'gmap-block')}
                                    </label>
                                    <div id="gmap-colors-palette">
                                        {COLORS &&
                                            COLORS.map((paletteColor, index) => {
                                                return (
                                                    <ColorIndicator
                                                        className={`gmap-color-indicator ${
                                                            `var(--wp--preset--color--${paletteColor.slug})` === colors?.normal
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                        title={paletteColor.name}
                                                        key={index}
                                                        colorValue={paletteColor.color}
                                                        onClick={() =>
                                                            setAttributes({
                                                                [`${PREFIX}${controlName}Colors`]: {
                                                                    ...colors,
                                                                    normal: `var(--wp--preset--color--${paletteColor.slug})`
                                                                }
                                                            })
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    )}
                    {hoverColorPanel && (
                        <Popover position="bottom right" onFocusOutside={() => setHoverColorPanel(false)} offset={10}>
                            <div className="gmap-color-panel">
                                <ColorPicker
                                    color={colors?.hover}
                                    onChangeComplete={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Colors`]: {
                                                ...colors,
                                                hover: value.hex
                                            }
                                        })
                                    }
                                    disableAlpha={false}
                                />
                                <div className="gmap-colors-palette">
                                    <label className="gmap-label gmap-mb-8" htmlFor="gmap-colors-palette">
                                        {__('Colors Palette', 'gmap-block')}
                                    </label>
                                    <div id="gmap-colors-palette">
                                        {COLORS &&
                                            COLORS.map((paletteColor, index) => {
                                                return (
                                                    <ColorIndicator
                                                        className={`gmap-color-indicator ${
                                                            `var(--wp--preset--color--${paletteColor.slug})` === colors?.hover
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                        title={paletteColor.name}
                                                        key={index}
                                                        colorValue={paletteColor.color}
                                                        onClick={() =>
                                                            setAttributes({
                                                                [`${PREFIX}${controlName}Colors`]: {
                                                                    ...colors,
                                                                    hover: `var(--wp--preset--color--${paletteColor.slug})`
                                                                }
                                                            })
                                                        }
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

export default withInstanceId(ColorsControl);
