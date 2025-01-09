import React from "react";

function ListMode({ lists, setLists, buttons }) {
  const addList = () => {
    setLists([
      ...lists,
      { id: Date.now(), name: `Lista ${lists.length + 1}`, sections: [] },
    ]);
  };

  const addSection = (listId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              sections: [
                ...list.sections,
                { id: Date.now(), name: `Sección ${list.sections.length + 1}`, buttons: [] },
              ],
            }
          : list
      )
    );
  };

  const addButtonToSection = (listId, sectionId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              sections: list.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      buttons: [
                        ...section.buttons,
                        { id: Date.now(), name: "", description: "" },
                      ],
                    }
                  : section
              ),
            }
          : list
      )
    );
  };

  return (
    <div>
      <button onClick={addList}>Añadir Lista</button>
      {lists.map((list) => (
        <div key={list.id} style={{ margin: "1rem 0", border: "1px solid gray" }}>
          <h4>{list.name}</h4>
          <button onClick={() => addSection(list.id)}>Añadir Sección</button>
          {list.sections.map((section) => (
            <div key={section.id} style={{ marginLeft: "1rem" }}>
              <h5>{section.name}</h5>
              <button onClick={() => addButtonToSection(list.id, section.id)}>
                Añadir Botón
              </button>
              {section.buttons.map((button) => (
                <div key={button.id} style={{ marginLeft: "1rem" }}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={button.name}
                    onChange={(e) =>
                      setLists(
                        lists.map((l) =>
                          l.id === list.id
                            ? {
                                ...l,
                                sections: l.sections.map((s) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        buttons: s.buttons.map((b) =>
                                          b.id === button.id
                                            ? { ...b, name: e.target.value }
                                            : b
                                        ),
                                      }
                                    : s
                                ),
                              }
                            : l
                        )
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={button.description}
                    onChange={(e) =>
                      setLists(
                        lists.map((l) =>
                          l.id === list.id
                            ? {
                                ...l,
                                sections: l.sections.map((s) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        buttons: s.buttons.map((b) =>
                                          b.id === button.id
                                            ? { ...b, description: e.target.value }
                                            : b
                                        ),
                                      }
                                    : s
                                ),
                              }
                            : l
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListMode;
