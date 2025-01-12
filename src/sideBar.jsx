import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Puedes arrastrar estos nodos al panel de la derecha.</div>
      <div className="dndnode action" onDragStart={(event) => onDragStart(event, 'action')} draggable>
        Action Node
      </div>
      <div className="dndnode condition" onDragStart={(event) => onDragStart(event, 'condition')} draggable>
        Condition Node
      </div>
      <div className="dndnode httpRequest" onDragStart={(event) => onDragStart(event, 'httpRequest')} draggable>
        Http Request Node
      </div>
      <div className="dndnode IANode" onDragStart={(event) => onDragStart(event, 'IANode')} draggable>
        IA Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode message" onDragStart={(event) => onDragStart(event, 'message')} draggable>
        Message Node
      </div>
      <div className="dndnode trigger" onDragStart={(event) => onDragStart(event, 'trigger')} draggable>
        Trigger Node
      </div>
      <div className="dndnode wait" onDragStart={(event) => onDragStart(event, 'wait')} draggable>
        Wait Node
      </div>
    </aside>
  );
};
