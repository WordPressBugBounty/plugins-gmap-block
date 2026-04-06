/**
 * WordPress Dependencies
 */
import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

// Handle Unique ID
export const handleUniqueId = ({ uniqueId, setAttributes, clientId }) => {
    const generateUniqueId = 'gmap-block' + '-' + Math.random().toString(36).substr(2, 8);

    /**
     * Define and Generate Unique Block ID
     */
    if (!uniqueId) {
        setAttributes({ uniqueId: generateUniqueId });
        return;
    }

    /**
     * Assign New Unique ID when duplicate uniqueId found
     * Mostly happens when User Duplicate a Block
     */
    const allBlocks = select('core/block-editor').getBlocks();

    let duplicateFound = false;
    const fixDuplicateUniqueId = blocks => {
        if (duplicateFound) return;
        for (const item of blocks) {
            const { innerBlocks } = item;
            if (item.attributes.uniqueId === uniqueId) {
                if (item.clientId !== clientId) {
                    setAttributes({ uniqueId: generateUniqueId });
                    duplicateFound = true;
                    return;
                } else if (innerBlocks.length > 0) {
                    fixDuplicateUniqueId(innerBlocks);
                }
            } else if (innerBlocks.length > 0) {
                fixDuplicateUniqueId(innerBlocks);
            }
        }
    };

    fixDuplicateUniqueId(allBlocks);
};

// Style Generator
export const styleGenerator = ($selector, $styles = []) => {
    let styles = '';
    $styles.forEach($style => {
        if ($style?.v !== '' && $style?.v !== undefined) {
            if ($style?.p) {
                styles += `${$style.p}:${$style.v};`;
            } else {
                styles += `${$style.v}`;
            }
        }
    });
    return styles ? `${$selector}{${styles}}` : '';
};

// Soft Minify CSS Strings
export const softMinifyCssStrings = (cssString = ' ') =>
    cssString.replace(/\s+/g, ' ').replace(/\.zb\-[\w\-\s\.\,\:\>\(\)\d\+\[\]\#\>]+\{[\s]+\}/g, '');

// Array to String
export const classArrToString = classess => {
    if (typeof classess !== 'object') {
        return '';
    }
    const uniqueClassess = [...new Set(classess)];

    return uniqueClassess.join(' ');
};

// Generate link props
export const generateLinkProps = btnLink => {
    // link rel
    let linkRel = '';
    if (btnLink?.openInNewTab) {
        linkRel += 'noopener noreferrer';
    }
    if (btnLink?.addNoFollow) {
        linkRel += ' nofollow';
    }
    if (btnLink?.addSponsored) {
        linkRel += ' sponsored';
    }

    return {
        ...(linkRel && { rel: linkRel }),
        ...(btnLink?.openInNewTab && { target: '_blank' })
    };
};

// style generator for global styles
export const GlobalStyleHandler = props => {
    const { attributes, setAttributes, deskStyles, tabStyles, mobStyles } = props;
    const { blockStyle } = attributes;

    /**
     * Block Styles
     */
    const blockStyleCss = `
        ${deskStyles}
        @media (max-width: 1024px) and (min-width: 768px) {
            ${tabStyles}
        }
        @media (max-width: 767px) {
            ${mobStyles}
        }
    `;

    // Set Block Styles
    useEffect(() => {
        if (JSON.stringify(blockStyle) !== JSON.stringify(blockStyleCss)) {
            setAttributes({ blockStyle: blockStyleCss });
        }
    }, [attributes]);

    return <style>{`${softMinifyCssStrings(blockStyleCss)}`}</style>;
};
