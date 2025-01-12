import PropTypes from 'prop-types';
import './flows.css';
import Button from '../Button/Button';
const FlowList = ({flows ,type = 'button',onFlowClick }) => {
    return (
        <div className='flow-list-container'>
            {flows.map((flow, index) => (
                <Button key={index} type = {type} className="flow-item" onClick={()=>{onFlowClick(flow.text)}}>
                    {flow.text}
                </Button>
            ))}
        </div>
    );
};


FlowList.propTypes = {
    flows: PropTypes.array.isRequired,
    nodes: PropTypes.array,
    type: PropTypes.string,
    className: PropTypes.string,
    onFlowClick: PropTypes.func.isRequired,
};

export default FlowList;