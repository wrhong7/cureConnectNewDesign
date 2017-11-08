var removeItem = function (object, key, value) {
    if (value == undefined)
        return;

    for (var i in object) {
    	console.log(object[i])
    	console.log(object);
    	console.log(key)
    	console.log(value);
        if (object[i][key] == value) {
            object.splice(i, 1);
        }
    }
};

function removeColumnClicked(columnNumber, columnObjectName) {
	$(`.column${columnNumber}`).css("display", "none");
	result.forEach(function(record){delete record[columnObjectName]});
	console.log(result)
	localStorage.setItem("csvArray", JSON.stringify(result));
}

function removeRowClicked(rowNumber) {
	$(`#row${rowNumber}`).css("display", "none");
	removeItem(result, "index", rowNumber);
	localStorage.setItem("csvArray", JSON.stringify(result));
}

var memorizedRow = null;
var memorizedObjectKey = null;


function editCellClick(columnNumber, rowNumber, columnContent) {
	setTimeout(function() {
		for (var i in result) {
			if (result[i]["index"] == rowNumber) {
				resultEachRow = result[i];
				objectKeys = Object.keys(result[i]);
				objectKeys.forEach(function(objectKey) {
					if (resultEachRow[objectKey] == columnContent) {
						memorizedRow = i;
						memorizedObjectKey = objectKey;
					}

					if (memorizedRow != null && memorizedObjectKey != null) {
						setTimeout(function() {
							columnValue = $(`#column${columnNumber}Row${rowNumber}`).val();
							console.log(result)
							console.log(columnValue);
							result[memorizedRow][memorizedObjectKey] = columnValue;
						}, 300)

					}
				})

				console.log("updated")
			}
		}
	}, 100)
}