

////////////////////columns//////////////////////////////////
let topRow = document.querySelector(".top_row");
let str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;

//////////////////////////////rows///////////////////////////

let leftCol = document.querySelector(".left_col");
str = ""
for (let i = 0; i < 100; i++) {
    str += `<div class='left_col_box'>${i + 1}</div>`
}
leftCol.innerHTML = str;


///////////////////////////grid/////////////////////////////////

let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col' rid=${i} cid=${j} contenteditable="true"></div>`
    }
    str += "</div>";
}
grid.innerHTML = str;



// initial load
//for multiple sheets creating db

let workSheetDB = [];
function initCurrentSheetDb() {
    let sheetDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = {
                bold: "normal",
                italic: "normal",
                underline: "none",
                fontFamily: "Arial",
                fontSize: "10",
                halign: "left",
                value: "",
                children: [],
                formula: "",
                bgColor: "white",
                color: "black"
            }

            row.push(cell);
        }
        sheetDB.push(row);
    }
    console.log(sheetDB);
    workSheetDB.push(sheetDB);
    console.log(workSheetDB);
}
initCurrentSheetDb();

