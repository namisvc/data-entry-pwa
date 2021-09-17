
var db;

function indexedDBOk() {
	return "indexedDB" in window;
}

window.addEventListener("load", function() {
	
	//No support? Go in the corner and pout.
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open("Farm Log",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;

		if(!thisDB.objectStoreNames.contains("logs")) {
			var os = thisDB.createObjectStore("logs", {keyPath: 'id', autoIncrement:true});
			//There can be multiple logs from a single Farmer
			os.createIndex("id", "id", {unique:true});
			
		}
		
	}
	
	
	openRequest.onsuccess = function(e) {

		db = e.target.result;
		
		//Listen for clicks
		document.querySelector("#addLogButton").addEventListener("click", addFarmLog, false);
		document.querySelector("#login").addEventListener("click", registerCollector, false);
		document.querySelector("#showLog").addEventListener("click", displayLogs, false);
		document.querySelector("#export").addEventListener("click", exportTableToCSV, false);
		document.querySelector("#prepareLog").addEventListener("click", sanitizeTable, false);
		document.querySelector("#genYield").addEventListener("click", expYield, false);
		
	}	

	openRequest.onerror = function(e) {
		//Do something for the error
	}
	

},false);

document.onload = (event) => {
	
		if (navigator.onLine) {
		M.toast({html: 'online!'});
	} else {
		M.toast({html: 'You are working offline!'});
	}
	
	document.getElementById("menu").style.display = "none";		
};


function registerCollector(){
	var datacollector = document.querySelector("#datacollector").value;
	sessionStorage.datacollector = datacollector;
	window.location.hash = '#data-entry';
}





function addFarmLog(e) {
	var today = recDate();
	var datacollector = sessionStorage.datacollector;
	var farm_visit = '';
	var visitDate = document.querySelector("#farm_visit").value;
	
	if(visitDate == getDateString()){
		farm_visit = today;
		console.log("Today:" + today);
	} else {
		farm_visit = document.querySelector("#farm_visit").value;
		console.log(farm_visit);
	}
	
	//var farm_visit = visitDate.replace(/\//g, "-").split("-").reverse().join("-");
	var farmer_ID = document.querySelector("#farmer_ID").value;
	var full_name = document.querySelector("#full_name").value;
	var gender = document.querySelector("#gender").value;
	var Farmer_Address = document.querySelector("#Farmer_Address").value;
	var Farm_location = document.querySelector("#Farm_location").value;
	var cropID = document.querySelector("#cropID").value;
	var Acreage = document.querySelector("#Acreage").value;
	//var Exp_Yield = 0;
	var Date_Planted = document.querySelector("#Date_Planted").value;
	//var Exp_Harvest_Date = document.querySelector("#Exp_Harvest_Date").value;

	
	//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["logs"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("logs");

	//Define a log entry
	var farmLog = {
		id:'f' + Math.floor((Math.random() * 100) + 1),
		farmer_ID:farmer_ID,
		full_name:full_name,
		gender:gender,
		farm_visit:farm_visit,
		Farmer_Address:Farmer_Address,
		Farm_location:Farm_location,
		cropID:cropID,
		Acreage:Acreage,
		Exp_Yield: expYield(),
		Date_Planted:Date_Planted,
		Exp_Harvest_Date:expHarvest(),
		Data_collector:datacollector,
		created: recDate()
					
	}
	
		
	//Perform the add
	var request = store.add(farmLog);

	request.onerror = function(e) {
		alert("Sorry, there is something wrong with the data added.");
		console.log("Error",e.target.error.name);
		console.dir(e.target);
		//some type of error handler
	}

	request.onsuccess = function(e) {
		M.toast({html: 'Record saved!'})
		console.log("Record saved");
		
	}
}
	
	function recDate(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var cm = today.getMinutes();
		var cs = today.getSeconds();
		if(dd<10) 
		{
			dd='0'+dd;
		} 

		if(mm<10) 
		{
			mm='0'+mm;
		} 
		today = dd+'-'+mm+'-'+yyyy+'-'+hh+'-'+cm;
		return today;

	}

	function expYield(cropID){
		
		var Acre = document.querySelector("#Acreage").value
		let lbsPlanted;

		if (cropID = 101){
			lbsPlanted = 3000;
		} else if (cropID = 102) {
			lbsPlanted = 5000;
		} else if (cropID = 103){
			lbsPlanted = 0;
		} else if (cropID = 104){
			lbsPlanted = 12000;
		} else if (cropID = 105){
			lbsPlanted = 8000;
		} else if (cropID = 106){
			lbsPlanted = 25000;
		} else if (cropID = 107){
			lbsPlanted = 9000;
		} else if (cropID = 108){
			lbsPlanted = 8000;
		} else if (cropID = 109){
			lbsPlanted = 2000;
		} else if (cropID = 110){
			lbsPlanted = 25000;
		} else if (cropID = 111){
			lbsPlanted = 18000;
		} else if (cropID = 112){
			lbsPlanted = 14000;
		} else if (cropID = 113){
			lbsPlanted = 11000;
		} else if (cropID = 114){
			lbsPlanted = 15000;
		} else if (cropID = 115){
			lbsPlanted = 20000;
		} else if (cropID = 116){
			lbsPlanted = 3000;
		} else if (cropID = 117){
			lbsPlanted = 0;
		} else if (cropID = 118){
			lbsPlanted = 3000;
		} else if (cropID = 119){
			lbsPlanted = 0;
		} else if (cropID = 120){
			lbsPlanted = 30000;
		} else if (cropID = 121){
			lbsPlanted = 2000;
		} else if (cropID = 122){
			lbsPlanted = 10000;
		} else if (cropID = 123){
			lbsPlanted = 15000;
		} else if (cropID = 124){
			lbsPlanted = 7000;
		} else if (cropID = 125){
			lbsPlanted = 8000;
		} else if (cropID = 126){
			lbsPlanted = 10000;
		} else if (cropID = 127){
			lbsPlanted = 2000;
		} else if (cropID = 128){
			lbsPlanted = 6000;
		} else if (cropID = 129){
			lbsPlanted = 5000;
		} else if (cropID = 130){
			lbsPlanted = 15000;
		} else if (cropID = 131){
			lbsPlanted = 100000;
		} else if (cropID = 132){
			lbsPlanted = 9000;
		} else if (cropID = 133){
			lbsPlanted = 600;
		} else if (cropID = 134){
			lbsPlanted = 15000;
		} else if (cropID = 135){
			lbsPlanted = 20000;
		} else if (cropID = 136){
			lbsPlanted = 8000;
		}




			var yield = Acre * lbsPlanted;
			return yield;
		}



		function expHarvest(){
			var datePlanted = document.querySelector("#Date_Planted").value;
			let growTime;

			if (cropID = 101){
				growTime = 365;
			} else if (cropID = 102) {
				growTime = 456.25;
			} else if (cropID = 103){
				growTime = 0;
			} else if (cropID = 104){
				growTime = 1095;
			} else if (cropID = 105){
				growTime = 8000;
			} else if (cropID = 106){
				growTime = 8000;
			} else if (cropID = 107){
				growTime = 8000;
			} else if (cropID = 108){
				growTime = 8000;
			} else if (cropID = 109){
				growTime = 8000;
			} else if (cropID = 110){
				growTime = 8000;
			} else if (cropID = 111){
				growTime = 8000;
			} else if (cropID = 112){
				growTime = 8000;
			} else if (cropID = 113){
				growTime = 8000;
			} else if (cropID = 114){
				growTime = 8000;
			} else if (cropID = 115){
				growTime = 8000;
			} else if (cropID = 116){
				growTime = 8000;
			} else if (cropID = 117){
				growTime = 8000;
			} else if (cropID = 118){
				growTime = 8000;
			} else if (cropID = 119){
				growTime = 8000;
			} else if (cropID = 120){
				growTime = 8000;
			} else if (cropID = 121){
				growTime = 8000;
			} else if (cropID = 122){
				growTime = 8000;
			} else if (cropID = 123){
				growTime = 8000;
			}




			function convertFromStringToDate(responseDate) {
				let dateComponents = responseDate.split('T');
				let datePieces = dateComponents[0].split("-");
				
				return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
			}

			var DateHelper = {
				addDays : function(aDate, numberOfDays) {
					aDate.setDate(aDate.getDate() + numberOfDays); // Add numberOfDays
					return aDate;                                  // Return the date
				},
				format : function format(date) {
					return [
					   ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
					   ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
					   date.getFullYear()                          // Get full year
					].join('-');                                   // Glue the pieces together
				}
			}

			return DateHelper.format(DateHelper.addDays(convertFromStringToDate(datePlanted), growTime));

		}
		
	


function displayLogs() {
		var transaction = db.transaction(["logs"], "readonly");  
        var content="<table id='logTable' class='highlight responsive-table'><thead><tr><th>id</th><th>Created</th><th>Farmer ID</th><th>Name</th><th>Gender</th><th>Visit Date</th><th>Farmer Address</th><th>Farm Location</th><th>Crop ID</th><th>Acreage</th><th>Exp Yield</th><th>Date Planted</th><th>Exp Harvest Date</th><th>Data Collector</th></thead><tbody>";

		transaction.oncomplete = function(event) {
            $("#LogList").html(content);
        };

        var handleResult = function(event) {  
          var cursor = event.target.result;  
          if (cursor) {  
			content	+="<tr>";
			content += "<td>"+cursor.value.id+"</td>";
            content += "<td>"+cursor.value.created+"</td>";
			content +="<td>"+cursor.value.farmer_ID+"</td>";
			content +="<td>"+cursor.value.full_name+"</td>";
			content +="<td>"+cursor.value.gender+"</td>";
			content +="<td>"+cursor.value.farm_visit+"</td>";
			content +="<td>"+cursor.value.Farmer_Address+"</td>";
			content +="<td>"+cursor.value.Farm_location+"</td>";
			content +="<td>"+cursor.value.cropID+"</td>";
			content +="<td>"+cursor.value.Acreage+"</td>";
			content +="<td>"+cursor.value.Exp_Yield+"</td>";
			content +="<td>"+cursor.value.Date_Planted+"</td>";
			content +="<td>"+cursor.value.Exp_Harvest_Date+"</td>";
			content +="<td>"+cursor.value.Data_collector+"</td>";
			content +="</tr>";
            cursor.continue();  
          }  
          else {  
            content += "</tbody></table>";
			content += "<div class=\"row \"><a onclick=\"editData()\" class=\"btn edit\"><i class=\"material-icons\">edit</i></a> <a onclick=\"deleteData()\" class=\"btn delete\"><i class=\"material-icons\">delete</i></a></div>";
          }  
        };  

        var store = transaction.objectStore("logs");

		store.openCursor().onsuccess = handleResult;
		
				
		let div = document.querySelector('#prepareLog');
			div.classList.remove('disabled');


}

function deleteData() {
	
	var id = prompt("Item ID:");
	var request = db.transaction(["logs"], "readwrite").objectStore("logs").delete(id);
	
	   request.onsuccess = function(event) {
        displayLogs();
        console.log("Item removed successfully.");
    };

    request.onerror = function(event) {
        displayLogs();
        console.log("Error while removing the item.");
    };
	
}

function editData() {
	var id = prompt("Item ID:");
	sessionStorage.id = id;
	var request = db.transaction(["logs"], "readwrite").objectStore("logs").get(id);
		
		request.onsuccess = function (event){
			const matching = request.result;
					if (matching !== undefined) {
			// A match was found.
					let btn = "<button onclick=\"updateLog()\" class=\"btn waves-effect waves-light\">Submit"+" <i class=\"material-icons right\">"+"send</i></button>";
					
	   			    $("#farmer_ID").val(matching.farmer_ID);
					$("#full_name").val(matching.full_name);
					$("#gender").val(matching.gender);
					$("#farm_visit").val(matching.farm_visit);
					$("#Farmer_Address").val(matching.Farmer_Address);
					$("#Farm_location").val(matching.Farm_location);
					$("#cropID").val(matching.cropID);
					$("#Acreage").val(matching.Acreage);
					$("#Exp_Yield").val(matching.Exp_Yield);
					$("#Date_Planted").val(matching.Date_Planted);
					$("#Exp_Harvest_Date").val(matching.Exp_Harvest_Date);
				
					$(document).ready(function() {
						M.updateTextFields();
					  }); 
					  				        
					document.getElementById('add-update').innerHTML = btn;
					
					window.location.hash = '#data-entry';
					} else {
					// No match was found.
						//console.log(null);
						}
				
		};

}

function updateLog(){	

	let btn = "<button id=\"addLogButton\" class=\"btn waves-effect waves-light\">Submit"+" <i class=\"material-icons right\">"+"send</i></button>";
	var id = sessionStorage.id;
	var transaction = db.transaction(["logs"],"readwrite");
	var store = transaction.objectStore("logs");
	var request = store.get(id);
	
		request.onsuccess = function (e){
		
		var farmLog = e.target.result;
				farmLog.farmer_ID = document.querySelector("#farmer_ID").value;
				farmLog.full_name = document.querySelector("#full_name").value;
				farmLog.gender = document.querySelector("#gender").value;
				farmLog.farm_visit = document.querySelector("#farm_visit").value;
				farmLog.Farmer_Address = document.querySelector("#Farmer_Address").value;
				farmLog.Farm_location = document.querySelector("#Farm_location").value;
				farmLog.cropID = document.querySelector("#cropID").value;
				farmLog.Acreage = document.querySelector("#Acreage").value;
				farmLog.Exp_Yield = expYield();
				farmLog.Exp_Harvest_Date = document.querySelector("#Exp_Harvest_Date").value;
				
			var objRequest = store.put(farmLog);
				    objRequest.onsuccess = function(e){
																
						document.getElementById('add-update').innerHTML = btn;
						document.getElementById("entry-form").reset();
						window.location.hash = '#log';
						console.log('Success in updating record');
					};

		}

}
	
    
function  sanitizeTable(){
	var password = prompt("Please enter key:");
        if (password=="456852") {
            //$('#logTable tr').find('th:last-child, td:last-child').remove();
		  
			$('#logTable tr').find('td:eq(0),th:eq(0)').remove();
			$('#logTable tr').append('<th>Verified</th>');
		  
			let div = document.querySelector('#export');
		 		div.classList.remove('disabled');
          
        } else {
			alert("Incorrect Key");
        }
          
  }



	
	
	
function clearData(){
		//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["logs"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("logs");
	// Make a request to clear all the data
	var request = store.clear();
	
	request.onerror = function(e) {
		alert("Sorry, there is something wrong with the data added.");
		console.log("Error",e.target.error.name);
		console.dir(e.target);
		//some type of error handler
	}

		request.onsuccess = function(e) {
		M.toast({html: 'Records exported!', classes: 'center-align'});
		}
}
	
function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0');
  return `${day}-${month}-${year}`;
}
		
	function exportTableToCSV() {
	var datacollector = sessionStorage.datacollector;
	var	filename = 'farm-' + getDateString()+ '-' +datacollector+'.csv';
		
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
	
	clearData();
	let div = document.querySelector('#export', '#prepareLog');
			div.classList.add('disabled');
	
}

  // ServiceWorker is a progressive technology. Ignore unsupported browsers
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  };

	