export const getTotalButtonsCount = (buttons, lists) => {
    const listButtons = lists.reduce(
      (total, list) =>
        total + list.sections.reduce((secTotal, sec) => secTotal + sec.buttons.length, 0),
      0
    );
    return buttons.length + listButtons;
  };
  