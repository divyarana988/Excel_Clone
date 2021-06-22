let addbtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font_size");
let fontFamily = document.querySelector(".font_family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let colorElem = document.querySelector(".color");
let bgColorElem = document.querySelector(".bg-color");
let allAlignBtns = document.querySelectorAll(".alignment_container>input");
let formulaInput = document.querySelector(".formula_box");
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top_left_block");
let sheetDB = workSheetDB[0];
firstSheet.addEventListener("click", handleActiveSheet);
// create sheets and add functionlities
addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;
    // page add
    sheetList.appendChild(NewSheet);
    //  db
    // active set 
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active_sheet");
    // 2 d array 
    initCurrentSheetDb();
    // /current change
    sheetDB = workSheetDB[idx];
    // cell empty 
    // new page element value empty
    initUI();
    // change sheet
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active_sheet");
    }
    //  index
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    // get data from that and set ui
    setUI(sheetDB);

}

/////////////////////to get address of clicked cell////////////////////////////////
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObject = sheetDB[rid][cid];
        // styling-> set 
        // object styling set 
        // UI 
        // cell
        // boldness
        if (cellObject.formula != "") {
            formulaInput.value = cellObject.formula;
        } else {
            formulaInput.value = "";
        }
        if (cellObject.bold == true) {
            boldElem.classList.add("active_btn")
        } else {
            boldElem.classList.remove("active_btn");
        }
        // alignment
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active_btn");
        }
        console.log(cellObject.halign);
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active_btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active_btn")
            // right active
        } else if (cellObject.halign == "center") {
            centerBtn.classList.add("active_btn")
        }
    });

    Allcells[i].addEventListener("keydown", function (e) {
        let obj = Allcells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left_col .left_col_box")[rid];
        leftCol.style.height = height + "px";
    });
}

/////////////////////initial cell click emulate
Allcells[0].click();


gridContainer.addEventListener("scroll", function () {
    // console.log(e);
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})


// ************Formatting****************
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active_btn");
    }
    leftBtn.classList.add("active_btn");
    // ui update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
    //db update
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active_btn");
    }
    rightBtn.classList.add("active_btn");
    // ui update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
    //db update
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active_btn");
    }
    centerBtn.classList.add("active_btn");
    //ui update
    let cellObject = sheetDB[rid][cid];
    
    cellObject.halign = "center";
    //db update
})
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize + "px";

    let cellObject = sheetDB[rid][cid];
    cellObject.fontSize = fontSize;
})
fontFamily.addEventListener("change", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cFont = fontFamily.value
    cell.style.fontFamily = cFont;
})
boldElem.addEventListener("click", function () {
    let isActive = boldElem.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active_btn");
        cellObject.bold = true
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active_btn");
        cellObject.bold = false
    }
    // console.log(sheetDB)
})
italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text itlaic
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active_btn");
        cellObject.italic = true;
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active_btn");
        cellObject.italic = false;
    }
})
underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text underline
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active_btn");
        cellObject.underline = true;
    } else {
        // cell text normal
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active_btn");
        cellObject.underline = false;
    }
})

colorElem.addEventListener("change", function() {
    let color = colorElem.value;
    console.log(color);
    let address = addressBar.value;
    let { rid, cid } = getRIDCIDfromAddress(address);
    let cell = document.querySelector(`.col[rid='${rid}'][cid='${cid}']`);
    cell.style.color = color;
    let cellObject = sheetDB[rid][cid];
    cellObject.color = color;
})

bgColorElem.addEventListener("change", function() {
    let val = bgColorElem.value;

    let address = addressInput.value;
    let { rid, cid } = getRIDCIDfromAddress(address);

    let cellElem = document.querySelector(`.grid .cell[rid='${rid}'][cid='${cid}']`);
    cellElem.style.backgroundColor = val;

    //update db
    let cellObject = sheetDB[rid][cid];
    cellObject.bColor = val;


})


           // Helper function

function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        // boldness
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "8px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].style.color = "black";
        Allcells[i].style.backgroundColor = "white";
        Allcells[i].innerText = "";
    }
}


function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value, bgColor, color } = sheetDB[i][j];
            cell.innerText = value;
            cell.style.fontWeight = bold;
            cell.style.fontStyle = italic;
            cell.style.textDecoration = underline;
            cell.style.textAlign = hAlign;
            cell.style.fontFamily = fontFamily;
            cell.style.fontSize = fontSize;
            cell.style.color = color;
            cell.style.backgroundColor = bgColor;
        }
    }
}


// ********Formula code*******************
// cell blur
// "value"-> value
//  fomrula value-> manually value set  
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        // 2d array
        let cellObject = sheetDB[rid][cid];

        // grid 
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        //   formula -> 40, 40
        if (cellObject.value == cell.innerText) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }
        // db entry
        cellObject.value = cell.innerText;
        // depend update 
        updateChildren(cellObject);
    });
}
// formula bar enter// value -> formula set
// old formula -> new formula  
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let Newformula = formulaInput.value;
        // cellObject formula
        let address = addressBar.value;
        // getCurrentCell
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == Newformula) {
            return;
        }
        if (prevFormula != "" && prevFormula != Newformula) {
            removeFormula(cellObject, address);
        }
        let evaluatedValue = evaluateFormula(Newformula);
        // alert(value);
        //    UI change
        setUIByFormula(evaluatedValue, rid, cid);
        // db -> works
        setFormula(evaluatedValue, Newformula, rid, cid, address);
        updateChildren(cellObject);
    }
})
// parsing 
function evaluateFormula(formula) {
    // (A100+A20)
    // 
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // console.log(formulaTokens[i]);
            // A1
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            //  getting value from  db
            let { value } = cellObject;
            formulaTokens[i] = value;
        }
    }
    // (10 +20 )
    // infix evaluation
    let finalFormula = formulaTokens.join(" ");
    return eval(finalFormula);
    // eval
    // ( 10 + 20 )
}
function setUIByFormula(value, rid, cid) {
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
    //  parent add yourself as a
}
// formula update db, value update , parent children array update
function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    //(A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            cellObject.children.push(address)
        }
    }
}
function updateChildren(cellObject) {
    // children get
    // formula reevaluate
    // recursively call
    let children = cellObject.children;
    for (let i = 0; i < children.length; i++) {
        let childAdd = children[i];
        let childRICIObj = getRIdCIdfromAddress(childAdd);
        let childObj = sheetDB[childRICIObj.rid][childRICIObj.cid];
        let formula = childObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, childRICIObj.rid, childRICIObj.cid);
        childObj.value = evaluatedValue;
        // your children have children
        updateChildren(childObj);
    }

}
// remove yourself from parents children array
function removeFormula(cellObject, address) {
    // (A1)
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            let children = parentCellObject.children;
            let idx = children.indexOf(address);
            children.splice(idx, 1);
        }
    }
    cellObject.formula = "";

}


function getRIdCIdfromAddress(address) {
    // A1
    let cellColAdr = address.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = address.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}