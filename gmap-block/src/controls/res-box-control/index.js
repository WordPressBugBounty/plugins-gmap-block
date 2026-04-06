/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { GENERAL_UNITS, PREFIX } from '../../constants';
import ResLabelControl from '../res-label-control';
import ResetButton from '../reset-btn';
import UnitsControl from '../units-control';
import DimensionControl from './dimension';

const ResBoxControl = ({ label, controlName, objAttrs, noUnits = false, units, min, max, instanceId }) => {
    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;

    const {
        [`${PREFIX}${controlName}Values`]: deskValues,
        [`${PREFIX}${controlName}TabValues`]: tabValues,
        [`${PREFIX}${controlName}MobValues`]: mobValues,
        [`${PREFIX}${controlName}Units`]: boxUnits,
        [`${PREFIX}${controlName}IsLinked`]: isLinked
    } = attributes;

    const id = `res-controls-${instanceId}`;
    const availableUnits = units || GENERAL_UNITS;

    const hasValue =
        (deskValues && deskValues.top !== undefined && deskValues.top !== '' && isNaN(deskValues.top) === false) ||
        (deskValues && deskValues.right !== undefined && deskValues.right !== '' && isNaN(deskValues.right) === false) ||
        (deskValues && deskValues.bottom !== undefined && deskValues.bottom !== '' && isNaN(deskValues.bottom) === false) ||
        (deskValues && deskValues.left !== undefined && deskValues.left !== '' && isNaN(deskValues.left) === false) ||
        (tabValues && tabValues.top !== undefined && tabValues.top !== '' && isNaN(tabValues.top) === false) ||
        (tabValues && tabValues.right !== undefined && tabValues.right !== '' && isNaN(tabValues.right) === false) ||
        (tabValues && tabValues.bottom !== undefined && tabValues.bottom !== '' && isNaN(tabValues.bottom) === false) ||
        (tabValues && tabValues.left !== undefined && tabValues.left !== '' && isNaN(tabValues.left) === false) ||
        (mobValues && mobValues.top !== undefined && mobValues.top !== '' && isNaN(mobValues.top) === false) ||
        (mobValues && mobValues.right !== undefined && mobValues.right !== '' && isNaN(mobValues.right) === false) ||
        (mobValues && mobValues.bottom !== undefined && mobValues.bottom !== '' && isNaN(mobValues.bottom) === false) ||
        (mobValues && mobValues.left !== undefined && mobValues.left !== '' && isNaN(mobValues.left) === false);

    return (
        <div className="gmap-control-container nx-box">
            <Flex align="flex-start">
                <FlexBlock>
                    <ResLabelControl
                        label={label}
                        requiredProps={{
                            id,
                            resMode,
                            setAttributes,
                            attributes
                        }}
                    />
                </FlexBlock>
                <FlexItem>
                    <ResetButton
                        onReset={() => {
                            setAttributes({
                                [`${PREFIX}${controlName}Values`]: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: ''
                                },
                                [`${PREFIX}${controlName}TabValues`]: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: ''
                                },
                                [`${PREFIX}${controlName}MobValues`]: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: ''
                                }
                            });
                        }}
                        value={hasValue}
                    />
                </FlexItem>
                <FlexItem>
                    {!noUnits && (
                        <Fragment>
                            {resMode === 'Desktop' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.desk}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                desk: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                            {resMode === 'Tablet' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.tab}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                tab: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                            {resMode === 'Mobile' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.mob}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                mob: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                        </Fragment>
                    )}
                </FlexItem>
            </Flex>
            <div className="gmap-controls-body" id={id}>
                {resMode === 'Desktop' && (
                    <DimensionControl
                        top={deskValues && deskValues.top}
                        right={deskValues && deskValues.right}
                        bottom={deskValues && deskValues.bottom}
                        left={deskValues && deskValues.left}
                        onChange={value =>
                            setAttributes({
                                [`${PREFIX}${controlName}Values`]: {
                                    ...deskValues,
                                    ...value
                                }
                            })
                        }
                        neededProps={{ setAttributes, controlName, isLinked }}
                        min={min}
                        max={max}
                    />
                )}
                {resMode === 'Tablet' && (
                    <DimensionControl
                        top={tabValues && tabValues.top}
                        right={tabValues && tabValues.right}
                        bottom={tabValues && tabValues.bottom}
                        left={tabValues && tabValues.left}
                        onChange={value =>
                            setAttributes({
                                [`${PREFIX}${controlName}TabValues`]: {
                                    ...tabValues,
                                    ...value
                                }
                            })
                        }
                        neededProps={{ setAttributes, controlName, isLinked }}
                        min={min}
                        max={max}
                    />
                )}
                {resMode === 'Mobile' && (
                    <DimensionControl
                        top={mobValues && mobValues.top}
                        right={mobValues && mobValues.right}
                        bottom={mobValues && mobValues.bottom}
                        left={mobValues && mobValues.left}
                        onChange={value =>
                            setAttributes({
                                [`${PREFIX}${controlName}MobValues`]: {
                                    ...mobValues,
                                    ...value
                                }
                            })
                        }
                        neededProps={{ setAttributes, controlName, isLinked }}
                        min={min}
                        max={max}
                    />
                )}
            </div>
        </div>
    );
};

export default ResBoxControl;
