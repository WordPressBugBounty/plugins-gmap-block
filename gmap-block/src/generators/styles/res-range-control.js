import { PREFIX } from '../../constants';

const generateRangeStyles = ({ controlName, attributes, propertyName, noUnits = false, noProperty = false }) => {
    const { [`${PREFIX}${controlName}Ranges`]: ranges, [`${PREFIX}${controlName}Units`]: units } = attributes;

    const { desk, tab, mob } = ranges;

    const deskStyle =
        desk !== undefined && desk !== '' && isNaN(desk) === false
            ? `${noProperty ? '' : propertyName + ':'}${desk}${noUnits ? '' : units.desk + ';'}`
            : '';

    const tabStyle =
        tab !== undefined && tab !== '' && isNaN(tab) === false
            ? `${noProperty ? '' : propertyName + ':'}${tab}${noUnits ? '' : units.tab + ';'}`
            : '';

    const mobStyle =
        mob !== undefined && mob !== '' && isNaN(mob) === false
            ? `${noProperty ? '' : propertyName + ':'}${mob}${noUnits ? '' : units.mob + ';'}`
            : '';

    return {
        deskStyle,
        tabStyle,
        mobStyle
    };
};

export default generateRangeStyles;
