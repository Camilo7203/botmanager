import React from "react";

function ButtonMode({ buttons, setButtons }) {
  const addButton = () => {
    if (buttons.length >= 3) return alert("Máximo 3 botones individuales.");
    setButtons([...buttons, { id: Date.now(), label: "", editing: true }]);
  };

  const updateButton = (id, label) => {
    setButtons(buttons.map((btn) => (btn.id === id ? { ...btn, label } : btn)));
  };

  return (
    <div>
      <button onClick={addButton}>Añadir botón</button>
      {buttons.map((btn) => (
        <div key={btn.id}>
          {btn.editing ? (
            <>
              <input
                type="text"
                value={btn.label}
                onChange={(e) => updateButton(btn.id, e.target.value)}
              />
              <button onClick={() => updateButton(btn.id, { editing: false })}>Aplicar</button>
            </>
          ) : (
            <>
              <span>{btn.label}</span>
              <button onClick={() => updateButton(btn.id, { editing: true })}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ButtonMode;
