/**
 * Internal dependencies
 */
import ResBtn from '../res-btn';

const ResLabelControl = ({ label, requiredProps = {}, noResBtns = false }) => {
    const { id, attributes, setAttributes } = requiredProps;

    return (
        <div className="gmap-res-label-control">
            <label className="gmap-label" htmlFor={id ? id : ''}>
                {label}
            </label>
            {!noResBtns && <ResBtn setAttributes={setAttributes} attributes={attributes} />}
        </div>
    );
};

export default ResLabelControl;
