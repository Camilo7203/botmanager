import React, { useState, useEffect } from "react";
import ButtonMode from "./ButtonMode";
import ListMode from "./ListMode";
import { getTotalButtonsCount } from "./utils";
import "./MessageNode.css";

function MessageNode({ dataInicial = {}, onDataChange }) {
  const [labelValue, setLabelValue] = useState(dataInicial.label || "Label");
  const [messageValue, setMessageValue] = useState(dataInicial.message || "Message");
  const [listMode, setListMode] = useState(dataInicial.listMode || false);
  const [buttons, setButtons] = useState(dataInicial.buttons || []);
  const [lists, setLists] = useState(dataInicial.lists || []);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ label: labelValue, message: messageValue, listMode, buttons, lists });
    }
  }, [labelValue, messageValue, listMode, buttons, lists, onDataChange]);

  return (
    <div className="message-node">
      <input
        type="text"
        value={labelValue}
        onChange={(e) => setLabelValue(e.target.value)}
        placeholder="Label"
      />
      <input
        type="text"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        placeholder="Message"
      />
      <button onClick={() => setListMode(!listMode)}>
        {listMode ? "Modo Botones" : "Modo Listas"}
      </button>

      {listMode ? (
        <ListMode lists={lists} setLists={setLists} buttons={buttons} />
      ) : (
        <ButtonMode buttons={buttons} setButtons={setButtons} />
      )}

      <p>Total botones: {getTotalButtonsCount(buttons, lists)}</p>
    </div>
  );
}

export default MessageNode;
