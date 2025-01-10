// NodeModal.jsx
import React from "react";
import MessageNode from "../MessageNode/MessageNode"; // Ajusta la ruta según tu estructura

const NodeModal = ({
  isModalOpen,
  selectedNode,
  closeModal,
  handleDeleteNode,
  handleSaveChanges,
}) => {
  // Si no está abierto o no hay nodo seleccionado, no renderizamos nada.
  if (!isModalOpen || !selectedNode) return null;
console.log(selectedNode);
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Botón para cerrar el modal */}
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        {/* Información del nodo */}
        <div className="node-info">
          <h2>Node Information</h2>
          <p>ID: {selectedNode.id}</p>
          <p>Type: {selectedNode.type}</p>
        </div>

        {/* Aquí insertamos el componente que maneja los campos o la lógica de edición */}
        <div className="node-fields-actions">
          <MessageNode />
        </div>

        <p>
          Position: x: {selectedNode.position.x}, y: {selectedNode.position.y}
        </p>

        {/* Botones para eliminar y guardar */}
        <button className="deleteButton" onClick={handleDeleteNode}>
          Delete Node
        </button>
        <button className="saveButton" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NodeModal;
