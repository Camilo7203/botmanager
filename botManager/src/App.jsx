import React, { useRef, useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "./Sidebar";
import { DnDProvider, useDnD } from "./DnDContext";
import "./App.css";
import nodeFields from "./utils/cosas";
import MessageNode from "./components/MessageNode/MessageNode"; // Ajusta la ruta según tu estructura

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const nodeFields2 = nodeFields;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };
  const handleFieldChange = (key, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [key]: value } }
          : node
      )
    );
    setSelectedNode((node) => ({
      ...node,
      data: { ...node.data, [key]: value },
    }));
  };
  const handleDeleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    closeModal();
  };
  const handleSaveChanges = () => {
    setNodes((nds) =>
      console.log(nds) ||
      nds.map((node) =>
        console.log(node.id === selectedNode.id ? selectedNode : node) ||
        node.id === selectedNode.id ? selectedNode : node
      )
    );
    closeModal();
  };
  return (
    <div className={`dndflow ${darkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          fitView
        >
          <Controls />
          <Background />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
      <Sidebar />
      {isModalOpen && selectedNode && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>
        &times;
      </span>

      <div className="node-info">
        <h2>Node Information</h2>
        <p>ID: {selectedNode.id}</p>
        <p>Type: {selectedNode.type}</p>
      </div>

      <div className="node-fields-actions">
          <MessageNode/>
      </div>

      <p>
        Position: x: {selectedNode.position.x}, y: {selectedNode.position.y}
      </p>

      <button className="deleteButton" onClick={handleDeleteNode}>
        Delete Node
      </button>

      <button className="saveButton" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
