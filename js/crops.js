
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
			var os = thisDB.createObjectStore("logs", {keyPath: 'id', autoIncrement:false});
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
	
				
};


function registerCollector(){
	var datacollector = document.querySelector("#datacollector").value;
	sessionStorage.datacollector = datacollector;
}



function addFarmLog(e) {
	var farmer_ID = document.querySelector("#farmer_ID").value;
	var full_name = document.querySelector("#full_name").value;
	var gender = document.querySelector("#gender").value;
	var farm_visit = document.querySelector("#farm_visit").value;
	var Farmer_Address = document.querySelector("#Farmer_Address").value;
	var Farm_location = document.querySelector("#Farm_location").value;
	var cropID = document.querySelector("#cropID").value;
	var Acreage = document.querySelector("#Acreage").value;
	var Exp_Yield = document.querySelector("#Exp_Yield").value;
	var Date_Planted = document.querySelector("#Date_Planted").value;
	var Exp_Harvest_Date = document.querySelector("#Exp_Harvest_Date").value;

	
	//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["logs"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("logs");

	//Define a log entry
	var farmLog = {
		id:recID(),
		farmer_ID:farmer_ID,
		full_name:full_name,
		gender:gender,
		farm_visit:farm_visit,
		Farmer_Address:Farmer_Address,
		Farm_location:Farm_location,
		cropID:cropID,
		Acreage:Acreage,
		Exp_Yield:Exp_Yield,
		Date_Planted:Date_Planted,
		Exp_Harvest_Date:Exp_Harvest_Date,
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
		console.log("record saved");
		
	}
}


	function recID(){
		var time = new Date();
		var hh = time.getHours();
		var cm = time.getMinutes();
		var cs = time.getSeconds();
		
		time = 'f'+hh+cm+cs; 
		
		
		return time;
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
		today = mm+'-'+dd+'-'+yyyy+'-'+hh+'-'+cm;
		return today;

	}




function displayLogs() {
		var datacollector = sessionStorage.datacollector;
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
			content +="<td>"+datacollector+"</td>";
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
				farmLog.Exp_Yield = document.querySelector("#Exp_Yield").value;
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

          //$('#logTable tr').find('th:last-child, td:last-child').remove();
		  
		  $('#logTable tr').find('td:eq(0),th:eq(0)').remove();
		  
		  
		  let div = document.querySelector('#export');
			div.classList.remove('disabled');
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
		M.toast({html: 'Deleted All Records!', classes: 'center-align'});
		}
}
	
	function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0');
  return `${year}${month}${day}`;
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

	