/**
 * WordPress dependencies
 */
import { Button, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ResetButton = ({ children, onReset, value }) => {
    return (
        <div className="gmap-reset-control">
            <Flex
                justify={{
                    justifyContent: 'flex-start'
                }}
            >
                <FlexItem>
                    <Button
                        icon="image-rotate"
                        label={__('Reset', 'gmap-block')}
                        onClick={() => onReset()}
                        className={`gmap-reset-button range-btn ${value && typeof value !== 'object' ? 'active' : 'disabled'}`}
                    />
                </FlexItem>
                {children && <FlexBlock>{children}</FlexBlock>}
            </Flex>
        </div>
    );
};

export default ResetButton;
