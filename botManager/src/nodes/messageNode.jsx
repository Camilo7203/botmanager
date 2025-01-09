import React, { useState, useEffect } from "react";
import "./MessageNode.css";

function MessageNode({ dataInicial = {}, onDataChange }) {
  // ==============================
  // Estados del nodo, tomando "por defecto" lo que venga en dataInicial
  // ==============================
  const [labelValue, setLabelValue] = useState(dataInicial.label || "Label");
  const [messageValue, setMessageValue] = useState(
    dataInicial.message || "Message"
  );

  // "listMode = false" => modo BOTONES.
  // "listMode = true"  => modo LISTAS.
  const [listMode, setListMode] = useState(dataInicial.listMode || false);

  // Botones individuales
  const [buttons, setButtons] = useState(dataInicial.buttons || []);

  // Listas
  const [lists, setLists] = useState(dataInicial.lists || []);

  // ----------------------------------------------------------------
  // Cálculo del total de BOTONES (individuales + los de las secciones)
  // ----------------------------------------------------------------
  const getTotalButtonsCount = () => {
    // Botones individuales
    const individualCount = buttons.length;

    // Botones dentro de secciones de cada lista
    const listButtonsCount = lists.reduce((accList, list) => {
      const sectionCount = list.sections.reduce((accSec, section) => {
        return accSec + section.buttons.length;
      }, 0);
      return accList + sectionCount;
    }, 0);

    return individualCount + listButtonsCount;
  };

  // ----------------------------------------------------------------
  // Función para CAMBIAR de modo con un solo botón (switch)
  // ----------------------------------------------------------------
  const toggleMode = () => {
    setListMode((prev) => !prev);
  };

  // ----------------------------------------------------------------
  // Modo BOTONES individuales (listMode === false)
  // ----------------------------------------------------------------

  // Añadir un botón individual
  const handleAddButton = () => {
    // Primero, validamos el límite total de 10
    if (getTotalButtonsCount() >= 10) {
      alert("Ya tienes 10 botones en total, no puedes agregar más.");
      return;
    }
    // Límite de 3 botones individuales
    if (buttons.length >= 3) {
      alert("No puedes añadir más de 3 botones individuales.");
      return;
    }

    setButtons((prevButtons) => [
      ...prevButtons,
      { id: Date.now(), label: "", editing: true },
    ]);
  };

  // Manejamos el cambio de texto en el input de cada botón individual
  const handleChangeButtonLabel = (id, value) => {
    setButtons((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, label: value } : btn))
    );
  };

  // Al hacer clic en "Apply" (botón individual)
  const handleApplyButton = (id) => {
    setButtons((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, editing: false } : btn))
    );
  };

  // Al hacer clic en "Edit" (botón individual)
  const handleEditButton = (id) => {
    setButtons((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, editing: true } : btn))
    );
  };

  // Al hacer clic en "Delete" (botón individual)
  const handleDeleteButton = (id) => {
    setButtons((prev) => prev.filter((btn) => btn.id !== id));
  };

  // ----------------------------------------------------------------
  // Modo LISTAS (listMode === true)
  // ----------------------------------------------------------------

  // Añadir una nueva lista
  const handleAddList = () => {
    const newList = {
      id: Date.now(),
      name: `Lista ${lists.length + 1}`,
      sections: [],
    };
    setLists((prev) => [...prev, newList]);
  };

  // Añadir una nueva sección a una lista (máximo 10 secciones por lista)
  const handleAddSection = (listId) => {
    setLists((prevLists) =>
      prevLists.map((l) => {
        if (l.id === listId) {
          if (l.sections.length >= 10) {
            alert("Esta lista ya tiene 10 secciones, no puedes añadir más.");
            return l;
          }
          const newSection = {
            id: Date.now(),
            name: `Sección ${l.sections.length + 1}`,
            buttons: [],
          };
          return { ...l, sections: [...l.sections, newSection] };
        }
        return l;
      })
    );
  };

  // Añadir un “botón” (con name/description) dentro de una sección
  const handleAddSectionButton = (listId, sectionId) => {
    // Verifica si llegamos a 10 botones globales
    if (getTotalButtonsCount() >= 10) {
      alert("Ya tienes 10 botones en total. No puedes agregar más.");
      return;
    }
    setLists((prevLists) =>
      prevLists.map((l) => {
        if (l.id === listId) {
          const updatedSections = l.sections.map((sec) => {
            if (sec.id === sectionId) {
              return {
                ...sec,
                buttons: [
                  ...sec.buttons,
                  {
                    id: Date.now(),
                    name: "",
                    description: "",
                  },
                ],
              };
            }
            return sec;
          });
          return { ...l, sections: updatedSections };
        }
        return l;
      })
    );
  };

  // Manejador para cambiar name/description de un botón dentro de una sección
  const handleSectionButtonChange = (
    listId,
    sectionId,
    buttonId,
    field,
    value
  ) => {
    setLists((prevLists) =>
      prevLists.map((l) => {
        if (l.id === listId) {
          const updatedSections = l.sections.map((sec) => {
            if (sec.id === sectionId) {
              const updatedButtons = sec.buttons.map((b) => {
                if (b.id === buttonId) {
                  return { ...b, [field]: value };
                }
                return b;
              });
              return { ...sec, buttons: updatedButtons };
            }
            return sec;
          });
          return { ...l, sections: updatedSections };
        }
        return l;
      })
    );
  };

  // Eliminar un botón dentro de una sección
  const handleDeleteSectionButton = (listId, sectionId, buttonId) => {
    setLists((prevLists) =>
      prevLists.map((l) => {
        if (l.id === listId) {
          const updatedSections = l.sections.map((sec) => {
            if (sec.id === sectionId) {
              const filteredButtons = sec.buttons.filter(
                (b) => b.id !== buttonId
              );
              return { ...sec, buttons: filteredButtons };
            }
            return sec;
          });
          return { ...l, sections: updatedSections };
        }
        return l;
      })
    );
  };

  // ----------------------------------------------------------------
  // useEffect para "subir" el nuevo estado cada vez que cambie
  // ----------------------------------------------------------------
  useEffect(() => {
    if (onDataChange) {
      // Creamos un objeto que represente TODO el estado de este nodo
      const newData = {
        label: labelValue,
        message: messageValue,
        listMode,
        buttons,
        lists,
      };
      // Mandamos al padre el "newData"
      onDataChange(newData);
    }
  }, [labelValue, messageValue, listMode, buttons, lists, onDataChange]);

  // ----------------------------------------------------------------
  // Render principal
  // ----------------------------------------------------------------
  return (
    <div className="message-node">
      {/* Inputs siempre editables para Label y Message */}
      <div className="dynamic-button-container">
        <label className="fixed-text" htmlFor="labelInput">
          Label:
        </label>
        <input
          id="labelInput"
          className="input-field"
          type="text"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />
      </div>

      <div className="dynamic-button-container">
        <label className="fixed-text" htmlFor="messageInput">
          Message:
        </label>
        <input
          id="messageInput"
          className="input-field"
          type="text"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
      </div>

      {/* BOTÓN SWITCH para cambiar entre modo Listas y modo Botones */}
      <button
        className="add-button"
        style={{ marginBottom: "1rem" }}
        onClick={toggleMode}
      >
        {listMode ? "Cambiar a modo Botones" : "Cambiar a modo Listas"}
      </button>

      {/* ============ MODO BOTONES (listMode === false) ============ */}
      {!listMode && (
        <div style={{ marginBottom: "2rem" }}>
          <button
            className="add-button"
            onClick={handleAddButton}
            disabled={getTotalButtonsCount() >= 10}
          >
            Añadir botón (max 3 individuales, total 10)
          </button>

          {buttons.map((btn) => (
            <div key={btn.id} className="dynamic-button-container">
              {btn.editing ? (
                <>
                  <input
                    className="input-field"
                    type="text"
                    value={btn.label}
                    onChange={(e) =>
                      handleChangeButtonLabel(btn.id, e.target.value)
                    }
                  />
                  <button
                    className="apply-button"
                    onClick={() => handleApplyButton(btn.id)}
                  >
                    Apply
                  </button>
                </>
              ) : (
                <>
                  <span className="button-label">{btn.label}</span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditButton(btn.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteButton(btn.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ============ MODO LISTAS (listMode === true) ============ */}
      {listMode && (
        <div style={{ marginBottom: "2rem" }}>
          <button
            className="add-button"
            onClick={handleAddList}
          >
            Crear lista
          </button>

          {/* Render de las listas existentes */}
          {lists.map((list) => (
            <div
              key={list.id}
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <h4>{list.name}</h4>

              <button
                className="add-button"
                onClick={() => handleAddSection(list.id)}
              >
                Añadir sección (máx 10)
              </button>

              {/* Render de secciones */}
              {list.sections.map((sec) => (
                <div
                  key={sec.id}
                  style={{
                    marginTop: "1rem",
                    border: "1px dashed #999",
                    padding: "0.5rem",
                  }}
                >
                  <h5>{sec.name}</h5>

                  <button
                    className="add-button"
                    onClick={() => handleAddSectionButton(list.id, sec.id)}
                    disabled={getTotalButtonsCount() >= 10}
                  >
                    Añadir botón (name/description)
                  </button>

                  {/* Render de botones dentro de la sección */}
                  {sec.buttons.map((b) => (
                    <div
                      key={b.id}
                      className="dynamic-button-container"
                      style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
                    >
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Nombre"
                        value={b.name}
                        onChange={(e) =>
                          handleSectionButtonChange(
                            list.id,
                            sec.id,
                            b.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Descripción"
                        value={b.description}
                        onChange={(e) =>
                          handleSectionButtonChange(
                            list.id,
                            sec.id,
                            b.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteSectionButton(list.id, sec.id, b.id)
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Mostrar el total de "botones" (individuales + en secciones) */}
      <p style={{ fontWeight: "bold" }}>
        Total de botones en el sistema: {getTotalButtonsCount()}/10
      </p>
    </div>
  );
}

export default MessageNode;
