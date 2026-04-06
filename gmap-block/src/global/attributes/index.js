/**
 * Add global attributes to all blocks
 */

wp.hooks.addFilter('blocks.registerBlockType', 'gmap/attribute/global', function (settings, name) {
    if (name.includes('gmap/')) {
        settings.attributes = {
            ...settings.attributes,
            uniqueId: {
                type: 'string'
            },
            preview: {
                type: 'boolean',
                default: false
            },
            resMode: {
                type: 'string',
                default: 'Desktop'
            },
            blockStyle: {
                type: 'object'
            }
        };
    }

    return settings;
});
