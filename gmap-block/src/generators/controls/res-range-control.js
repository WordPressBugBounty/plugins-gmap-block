import { PREFIX } from '../../constants';

const generateResRangeAttributes = ({
    controlName,
    defaults = {
        desk: '',
        tab: '',
        mob: ''
    },
    defaultUnits = {
        desk: 'px',
        tab: 'px',
        mob: 'px'
    }
}) => {
    return {
        [`${PREFIX}${controlName}Ranges`]: {
            type: 'object',
            default: {
                desk: defaults.desk,
                tab: defaults.tab,
                mob: defaults.mob
            }
        },
        [`${PREFIX}${controlName}Units`]: {
            type: 'object',
            default: {
                desk: defaultUnits.desk,
                tab: defaultUnits.tab,
                mob: defaultUnits.mob
            }
        }
    };
};
export default generateResRangeAttributes;
