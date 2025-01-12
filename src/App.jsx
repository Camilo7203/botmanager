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
import MessageNode from "./components/MessageNode/MessageNode"; // si lo usas en este archivo
import NodeModal from "./components/modalNodes/NodeModal"; // <-- Importamos nuestro nuevo modal

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

  // Estado para modal y nodo seleccionado
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modo oscuro
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  // Manejo de conexiones
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Drag and drop dentro del canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

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

  // Al hacer click en un nodo
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  }, []);

  // Funciones para cerrar modal y para cambiar campos
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
    setNodes(
      (nds) =>
        console.log("1", nds) ||
        nds.map((node) =>
          console.log("2", node.id) ||
          console.log("3", selectedNode.id) ||
          console.log("4", selectedNode.id ? selectedNode : node) ||
          node.id === selectedNode.id
            ? selectedNode
            : node
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
        <div className="botmanager-main">
          <div className="reactflow-container">
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
          <div className="sidebar">
              <Sidebar />
            </div>
        </div>
      </div>

      {/* AQUI USAMOS EL COMPONENTE SEPARADO NodeModal */}
      <NodeModal
        isModalOpen={isModalOpen}
        selectedNode={selectedNode}
        closeModal={closeModal}
        handleDeleteNode={handleDeleteNode}
        handleSaveChanges={handleSaveChanges}
      />
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
