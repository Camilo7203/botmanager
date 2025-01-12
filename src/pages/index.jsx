import { useState } from 'react';

import './index.css';
import Button from '../components/Button/Button';
import FlowList from '../components/flows/Flows';
import Canvas from '../components/Canvas/Canvas';
import DragAndDrop from '../components/DragAndDrop/DragAndDrop';
import PropTypes from 'prop-types';

export default function MyApp() {
    const [flowName, setFlowName] = useState('');
    const [listFlows, setListFlows] = useState({});
    const [flows, setFlows] = useState([]);
    const handleAddFlow = () => {
        const newNodes = [
            { id: '1', position: { x: 0, y: 0 }, data: { label: `Flow #${flows.length + 1} Node #${1}` } },
            { id: '2', position: { x: 0, y: 100 }, data: { label: `Flow #${flows.length + 1} Node #${2}` } },
        ];
        const newFlow = { text: `Flow #${flows.length + 1}` };
        setFlows([...flows, newFlow]);
        setListFlows({ ...listFlows, [`Flow #${flows.length + 1}`]: newNodes });
        setFlowName(`Flow #${flows.length + 1}`);
    };
    const handleFlowClick = (flowText) => {
        setFlowName(flowText);
    };

    Button.propTypes = {
        onClick: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        type: PropTypes.string,
        className: PropTypes.string,
    };
    FlowList.propTypes = {
        flows: PropTypes.array.isRequired,
        onFlowClick: PropTypes.func.isRequired,
        nodes: PropTypes.array,
        type: PropTypes.string,
        className: PropTypes.string,
    };
    Canvas.propTypes = {
        nodes: PropTypes.array
    };
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="header-title">Flow Editor</h1>
            </header>
            <main className="app-main">
                <div className="flow-manager">
                    <div className="flow-add">
                        <Button
                            onClick={handleAddFlow}
                            type="button"
                            className="custom-button"
                        >
                            Añadir flujo
                        </Button>
                    </div>
                    <div className='flow-list'>
                        <FlowList
                            flows={flows}
                            nodes={listFlows[flowName]}
                            onFlowClick={handleFlowClick}
                        />
                    </div>
                </div>
                <div className="flow-editor">
                    <div className="flow-editor-title">Titulo editor</div>
                    <div className="flow-editor-canvas">
                        <Canvas nodes={listFlows[flowName]} />
                        <DragAndDrop />
                    </div>
                </div>
            </main>
        </div>
    );
}
