const nodeFields2 = {
    input: [{ label: 'Label', key: 'label', type: 'text' }],
    action: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Action Name', key: 'actionName', type: 'text' },
    ],
    condition: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Condition', key: 'condition', type: 'text' },
    ],
    httpRequest: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'URL', key: 'url', type: 'text' },
    ],
    IANode: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Model', key: 'model', type: 'text' },
    ],
    message: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Message', key: 'message', type: 'text' },
      { label: 'Añadir boton', key: 'addButton', type: 'button', onClick: () => console.log('Boton añadido') },
    ],
    trigger: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Trigger Event', key: 'triggerEvent', type: 'text' },
    ],
    wait: [
      { label: 'Label', key: 'label', type: 'text' },
      { label: 'Duration', key: 'duration', type: 'text' },
    ],
  };
import MessageNode from '../nodes/messageNode';

const nodeFields = {
    messageNode : MessageNode
  };
export default nodeFields ;