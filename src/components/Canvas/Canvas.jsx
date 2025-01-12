import { ReactFlow } from '@xyflow/react';
import PropTypes from 'prop-types';
import { Background, BackgroundVariant, ControlButton, Controls, Panel  } from '@xyflow/react';
import Button from '../Button/Button';
import '@xyflow/react/dist/style.css';
import './Canvas.css';
const Canvas = ({nodes}) => {
    //const initialNodes = [];
    const initialEdges = [];

    return (
        <div className='canvas'>
            <ReactFlow nodes={nodes} edges={initialEdges}>
            <Panel position="top-left">top-left</Panel>
                <Controls>
                    <ControlButton>
                        <Button key='Prueba' className="yyy" onClick={() => alert('Something magical just happened. ✨')}> a </Button>
                    </ControlButton>
                </Controls>
                <Background
                    id="1"
                    gap={10}
                    color="#f1f1f1"
                    variant={BackgroundVariant.Dots}
                />

                <Background
                    id="2"
                    gap={100}
                    color="#ccc"
                    variant={BackgroundVariant.Dots}
                />
            </ReactFlow>
        </div>
    );
};


Canvas.propTypes = {
    nodes: PropTypes.array
};
export default Canvas;
