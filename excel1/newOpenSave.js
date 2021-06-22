let download = document.querySelector(".download");
let open = document.querySelector('.open');
let input = document.querySelector(".file_taker");
let newFile = document.querySelector(".new");


download.addEventListener("click", function () {
    const data = JSON.stringify(workSheetDB);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    // download btn
    let a = document.createElement("a");
    // /download
    a.download = "file.json";
    a.href = url;
    a.click();
})

open.addEventListener("click", function () {
    input.click();

    input.addEventListener("change", function () {
        let filesArr = input.files;
        let fileObj = filesArr[0];
        console.log(fileObj);
        let fr = new FileReader();
        fr.readAsText(fileObj);
        fr.addEventListener("load", function () {
            let stringData = fr.result;
            workSheetDB = JSON.parse(stringData);
            sheetDB = workSheetDB[0];
            setUI(sheetDB);
            for (let i = 0; i < workSheetDB.length - 1; i++){
                addBtnContainer.click();
            }
        })
    })
})

newFile.addEventListener("click", function() {

    initUI();
    let newSheetDB = cleanSheetDB();
    let activeSheet = document.querySelector(".sheet .active_sheet");
    let sheetIdx = activeSheet.getAttribute("sheetIdx");
    sheetDB = newSheetDB;
    workSheetDB[sheetIdx] = newSheetDB;

})


function cleanSheetDB() {
    let newSheetDB = []; // Stores data of all cells present in the sheet
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = {
                bold: "normal",
                italic: "normal",
                underline: "none",
                hAlign: "center",
                fontFamily: "Arial",
                fontSize: "16",
                color: "black",
                bColor: "white",
                value: "",
                formula: "",
                children: []
            };
            row.push(cell);
        }
        newSheetDB.push(row);
    }
    return newSheetDB;
}