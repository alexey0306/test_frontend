import React from 'react';

// HTML templates
export const TMPL_ATTACH = "<div className=''>File name: %s, Type: %s, Size: %s</div>";
//export const TMPL_FILE_ATTACH = "<div class=\"attachment\"><div class=\"row\"><div class=\"col-md-10\" style=\"display:inline-block\"><span style=\"margin-left:10px\"><img src=\"/images/%s\"/></span><span style=\"margin-left:10px\"><a href=\"%sstatic/%s\">%s (Size: %s)</a></span><span id='enml'><en-media data-type=\"%s\" data-hash=\"%s\" data-filename=\"%s\"/></span></div><div class=\"col-md-2\"><span id='txtFilename' style='display:none'>%s</span><span class=\"pull-right\" style=\"margin-right:10px\"><span id='removeAttach' class=\"glyphicon glyphicon-remove link\" aria-hidden=\"true\"></span></span></div></div></div><br/>";
export const TMPL_FILE_ATTACH = "<table class=\"table table-bordered\"><tbody><tr><td><span style='margin-left:10px'><img src='/images/%s'></span><span style='margin-left:10px'><a href='%sstatic/%s'>%s</a></span><span id='enml'><en-media data-type='%s' data-hash='%s' data-filename='%s'/></span></td></tr></tbody></table><p><br></p>";
export const TMPL_IMG_ATTACH = "<img class='attach' style='max-width:%s;max-height=%s' data-type='%s' data-filename='%s' data-hash='%s' src='%sstatic/%s'/>";

// HTML outputs
export const no_users_found = <tr><td colSpan="10" className="not_found"> [ No users found ] </td></tr>;
export const no_groups_found = <tr><td colSpan="10" className="not_found"> [ No groups found ] </td></tr>;
export const no_notebooks_found = <tr><td colSpan="10" className="not_found"> [ No notebooks found ] </td></tr>;
export const no_accounts_found = <li  className='list-group-item'> No accounts found </li>;
export const no_notes_found = <tr><td colSpan="10" className="not_found"> [ No notes found ] </td></tr>;
export const no_policies_found = <tr><td colSpan="10" className="not_found"> [ No policies found ] </td></tr>;
export const no_certificates_found = <tr><td colSpan="10" className="not_found"> [ No certificates found ] </td></tr>;
export const no_sections_found = <tr><td colSpan="10" className="not_found"> [ No sections found ] </td></tr>;
export const no_tasks_found = <tr><td colSpan="10" className="not_found"> [ No tasks found ] </td></tr>;
export const no_favourites_found = <tr><td colSpan="10" className="not_found"> [ No favourites found ] </td></tr>;


// Service IDs
export const DEFAULT_SERVICE = -1;
export const SERVICE_EVERNOTE = 0;
export const SERVICE_ONENOTE = 1;
export const EVERNOTE_COLOR = "#2dbe60";
export const ONENOTE_COLOR = "#80397B";
export const DEFAULT_COLOR = "#dddddd"

// Supported services
export const SUPPORTED_SERVICES = [
	{id: SERVICE_EVERNOTE, name: "Evernote"},
	{id: SERVICE_ONENOTE, name: "Onenote"}	
]

// Premium status and Privileges
export const PREMIUM_STATUS = {
	"0": "None",
	"1":"Pending",
	"2":"Active",
	"3":"FAILED",
	"4":"Cancellation pending",
	"5":"CANCELLED"
}

export const PRIVILEGE_LEVEL = {"1":"Normal","3":"Premium"};


// MIME types
export const MIME_TYPES = {
	pdf: "application/pdf",
	doc: "application/msword",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	xls: "application/vnd.ms-excel",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	ppt: "application/vnd.ms-powerpoint",
	pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	jpeg: "image/jpeg",
	gif: "image/gif",
	png: "image/png",
	default: "text/*",
	flac: "audio/flac",
	mp3: "audio/mp3",
	mp4: "video/mp4",
	xml: "text/xml"
}

// PATHS
export const PATHS = {
	notebooks: "/notebooks/%s/list",
	sections: "/sections/%s/list/%s/%s",
	notes: "/notes/%s/list/%s",
	notes_info: "/notes/%s/%s"
}