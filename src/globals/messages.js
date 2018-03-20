// Password fields
export const TITLE = "Password"
export const PFX_DSCR = "This password is needed to protect your users' P12 files (encrypted private and public keypairs). If none is specified, system will use empty password and P12 files can be opened by anyone";

// System messages
export const messages = {
	certificates_deleted_ok: "Certificates have been successfully deleted",
	group_created_ok: "Group has been successfully created",
	group_users_deleted: "Users have been successfully deleted from the group",
	group_updated: "Group has been successfully updated",
	group_users_added: "Users have been successfully added to the group",
	groups_deleted: "Groups have been successfully deleted",
	removed_from_favourites: "Items have been successfully removed from favourites",
	note_status_updated: "Note status updated",
	request_sent: "Request has been successfully sent",
	password_mandatory: "Password is mandatory",
	no_recipients: "List of recipients is empty",
	no_users_selected: "Please select at least one user to continue",
	no_certificates_selected: "Please select at least one certificate to continue",
	passwords_mismatch: "Passwords don't match",
	network_error: "Error while connecting to the server: server not responding",
	internal_error: "Internal server error. Please contact system administrator",
	account_created: "Account has been successfully created",
	account_disconnected: "Account has been successfully disconnected. To connect it once again, please click Login button",
	accounts_deleted: "Account(s) have been successfully deleted"
	
}

// Confirmation messages
export const confirmations = {
	restore_notes: "Do you really want to restore selected note(s) from the backup?",
	update_note: "Do you really want to update the note?",
	delete_account: "Are you sure that you want to delete this account? Please note that deleting your account won't affect your data stored in the cloud",
	delete_users: "Do you really want to delete selected users?",
	delete_certificates: "Do you really want to delete selected certificates?",
	disconnect_account: "Do you really want to disconnect this account?"
}