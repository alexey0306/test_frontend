import {
		MIME_TYPES, SERVICE_ONENOTE, 
		SERVICE_EVERNOTE, EVERNOTE_COLOR,ONENOTE_COLOR, DEFAULT_COLOR,
		TMPL_FILE_ATTACH,TMPL_IMG_ATTACH
} from './globals';
import {ROOT_URL} from '../actions/index';
import {vsprintf} from 'sprintf-js';



// Function used to return the name of icon based on MIME type
export function get_icon(mime){	

	// Returning icon name based on MIME
	if (mime == MIME_TYPES.pdf){
		return "icon_pdf.png";
	} 
	else if ( (mime == MIME_TYPES.doc) || (mime == MIME_TYPES.docx) ){
		return "icon_word.png";
	}
	else if ( (mime == MIME_TYPES.xls) || (mime == MIME_TYPES.xlsx) ){
		return "icon_excel.png";
	}
	else if ( (mime == MIME_TYPES.ppt) || (mime == MIME_TYPES.pptx) ){
		return "icon_ppt.png";
	}
	else if ( mime == MIME_TYPES.xml ){
		return "icon_xml.png";
	}
	else if ( mime == MIME_TYPES.mp3 ){
		return "icon_mp3.png";
	}
	else if ( mime == MIME_TYPES.flac ){
		return "icon_flac.png";
	}
	else if ( mime == MIME_TYPES.mp4 ){
		return "icon_mp4.png";
	}
	else{
		return "icon_doc.png";
	}
}

// Function used to return service icon
export function get_service_icon(service){
	switch (parseInt(service)){
		case SERVICE_EVERNOTE:
			return "evernote_icon_16.png";
		case SERVICE_ONENOTE:
			return "onenote_icon_16.png";
	}
}

// Function used to return the node to be inserted into Editor
export function insert_node(item){

	// Initializing the node
	var node = document.createElement("p");
	node.setAttribute("id","saferoomAttach");

	// Defining the MIME of inserted file
	switch(item.type){
		case MIME_TYPES.jpeg:
		case MIME_TYPES.gif:
		case MIME_TYPES.png:
			node.innerHTML = vsprintf(TMPL_IMG_ATTACH,["70%","70%",item.type,item.hash,item.name,ROOT_URL,item.name]);
			console.log(node.innerHTML);
			break;
		default:
			node.innerHTML = vsprintf(TMPL_FILE_ATTACH,
          [get_icon(item.type),ROOT_URL,item.name,item.name,item.size,item.type,item.hash,item.name]);
			break;
	}

	return node;

}

// Function used to get account color based on service ID
export function get_account(service_id){
	switch(service_id){
		case SERVICE_ONENOTE:
			return ONENOTE_COLOR;
		case SERVICE_EVERNOTE:
			return EVERNOTE_COLOR;
		default:
			return DEFAULT_COLOR;
	}
}

// Function used to select specific item
export function selectItem(id,checked,state){
	var arrayVar = state.selected;
	if (checked){
		arrayVar.push(parseInt(id));
	}
	else{
		arrayVar = arrayVar.filter(function(item){
			return item !== parseInt(id);
		});
	}

	return arrayVar
}

// Function used to select all items
export function selectAll(event,items){
	var arrayVar = [];
	if (event.target.checked){
		items.map(function(cert){arrayVar.push(cert.id);})
	}
	return arrayVar;
}

export function showNotification(title,message,type){
        
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.');
		return;
	}        

	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}
	else{

		var icon = 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';
		// Defining the icon
		switch (type){default:icon = icon;}
		var notification = new Notification(title, {icon: icon,body: message});
	}
}

export function generate_items(params){
	var items = []

	// Pushing the first element
	items.push({
		id:1,
		name:"Notebooks",
		link:`/notebooks/${params.id}`,
		isLink: (params.notebook != null)
	});
}

// Function used to convert the Timestamp into a real date
export function millisToDate(timestamp){
	var a = new Date(timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
	var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}