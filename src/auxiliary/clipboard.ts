const copyToClipboard = (text: string): void => {
	var copyFrom = document.createElement("textarea");
	var copyTo = document.getElementById("clipboard");
	copyFrom.textContent = text;

	if (copyTo != null){
		copyTo.appendChild(copyFrom);

		copyFrom.select();
		document.execCommand('copy');

		copyTo.removeChild(copyFrom);
	}
}

export default copyToClipboard;
