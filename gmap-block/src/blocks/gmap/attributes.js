// constants
import { MAP_BORDER, MAP_BRADIUS, MAP_HEIGHT, MAP_MARGIN, MAP_PADDING } from './constants';

// Internal dependencies
const { generateBorderAttributes, generateResBoxControlAttributes, generateResRangeAttributes } = window?.gmapModules;

const attributes = {
    address: {
        type: 'string',
        default: 'New York, NY, USA'
    },
    zoom: {
        type: 'number',
        default: 10
    },
    type: {
        type: 'string',
        default: 'roadmap'
    },
    // generator
    ...generateResRangeAttributes({ controlName: MAP_HEIGHT }),
    ...generateBorderAttributes({ controlName: MAP_BORDER }),
    ...generateResBoxControlAttributes({ controlName: MAP_BRADIUS }),
    ...generateResBoxControlAttributes({ controlName: MAP_PADDING }),
    ...generateResBoxControlAttributes({ controlName: MAP_MARGIN })
};

export default attributes;
