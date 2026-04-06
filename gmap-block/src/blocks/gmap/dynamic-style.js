// helper
const { styleGenerator, GlobalStyleHandler } = window?.gmapModules?.Helpers;

/**
 * Internal dependencies
 */
const { generateBorderStyles, generateResBoxStyles, generateRangeStyles } = window?.gmapModules;

// constants
import { MAP_BORDER, MAP_BRADIUS, MAP_HEIGHT, MAP_MARGIN, MAP_PADDING } from './constants';

// Generate Dynamic Style
const DynamicStyle = props => {
    const { attributes, setAttributes } = props;
    const { uniqueId } = attributes;

    // border
    const {
        desktopStyles: mapDeskBorder,
        tabletStyles: mapTabBorder,
        mobileStyles: mapMobBorder
    } = generateBorderStyles({
        controlName: MAP_BORDER,
        attributes
    });

    // border radius
    const {
        boxDeskStyles: mapDeskBRadius,
        boxTabStyles: mapTabBRadius,
        boxMobStyles: mapMobBRadius
    } = generateResBoxStyles({
        controlName: MAP_BRADIUS,
        attributes,
        propertyName: 'border-radius',
        forRadius: true
    });

    // height
    const {
        deskStyle: mapDeskHeight,
        tabStyle: mapTabHeight,
        mobStyle: mapMobHeight
    } = generateRangeStyles({
        controlName: MAP_HEIGHT,
        attributes,
        propertyName: 'height'
    });

    // padding
    const {
        boxDeskStyles: mapDeskPadding,
        boxTabStyles: mapTabPadding,
        boxMobStyles: mapMobPadding
    } = generateResBoxStyles({
        controlName: MAP_PADDING,
        attributes,
        propertyName: 'padding',
        forRadius: false
    });

    // margin
    const {
        boxDeskStyles: mapDeskMargin,
        boxTabStyles: mapTabMargin,
        boxMobStyles: mapMobMargin
    } = generateResBoxStyles({
        controlName: MAP_MARGIN,
        attributes,
        propertyName: 'margin',
        forRadius: false
    });

    // Desktop Styles
    const deskStyles = `
        ${
            mapDeskHeight || mapDeskBorder || mapDeskBRadius || mapDeskPadding || mapDeskMargin
                ? `${styleGenerator(`.${uniqueId}.wp-block-gmap-gmap-block iframe`, [
                      { v: mapDeskHeight },
                      { v: mapDeskBorder },
                      { v: mapDeskBRadius },
                      { v: mapDeskPadding },
                      { v: mapDeskMargin }
                  ])}`
                : ''
        }
    `;
    const tabStyles = `
        ${
            mapTabHeight || mapTabBorder || mapTabBRadius || mapTabPadding || mapTabMargin
                ? styleGenerator(`.${uniqueId}.wp-block-gmap-gmap-block iframe`, [
                      { v: mapTabHeight },
                      { v: mapTabBorder },
                      { v: mapTabBRadius },
                      { v: mapTabPadding },
                      { v: mapTabMargin }
                  ])
                : ''
        } 
    `;
    const mobStyles = `
        ${
            mapMobHeight || mapMobBorder || mapMobBRadius || mapMobPadding || mapMobMargin
                ? styleGenerator(`.${uniqueId}.wp-block-gmap-gmap-block iframe`, [
                      { v: mapMobHeight },
                      { v: mapMobBorder },
                      { v: mapMobBRadius },
                      { v: mapMobPadding },
                      { v: mapMobMargin }
                  ])
                : ''
        } 
    `;

    return (
        <GlobalStyleHandler
            attributes={attributes}
            setAttributes={setAttributes}
            deskStyles={deskStyles}
            tabStyles={tabStyles}
            mobStyles={mobStyles}
        />
    );
};

export default DynamicStyle;
