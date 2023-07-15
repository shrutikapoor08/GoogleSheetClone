import { alphabet } from "./utilities";

function createSheet() {
  const sheet = {
    numRows: 50,
    activeCell: null,
  };

  for (let i = 1; i <= 50; i++) {
    sheet[i] = {};
    for (let j = 0; j < 26; j++) {
      sheet[i][alphabet[j]] = {
        id: alphabet[j] + i,
        content: "",
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "arial",
        fontSize: 14,
        color: "black",
        backgroundColor: "white",
      };
    }
  }

  return sheet;
}

export default function reducer(draft, action) {
  switch (action.type) {
    case "CREATE_SHEET":
      const sheetName = "sheet" + (draft ? Object.keys(draft).length + 1 : 1);
      draft[sheetName] = createSheet();
      break;
    case "CHANGE_ACTIVE_CELL":
      draft[action.currentSheet]["activeCell"] = action.cellId;
      break;
    case "CHANGE_ACTIVE_CELL_PROPERTIES":
      draft[action.currentSheet][action.cellId[1]][action.cellId[0]][
        action.property
      ] = action.value;

      break;
    default:
      break;
  }
}

export const CreateSheetAction = () => {
  return { type: "CREATE_SHEET" };
};

export const ChangeActiveCell = (cellId, currentSheet) => {
  return { type: "CHANGE_ACTIVE_CELL", cellId, currentSheet };
};

export const ChangeActiveCellProperties = (
  cellId,
  currentSheet,
  property,
  value
) => {
  return {
    type: "CHANGE_ACTIVE_CELL_PROPERTIES",
    cellId,
    currentSheet,
    property,
    value,
  };
};
