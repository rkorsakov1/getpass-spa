const copyToClipboard = (text: string) => {
	var copyFrom = document.createElement("textarea");
	var copyTo = document.getElementById("clipboard");
	copyFrom.textContent = text;

	copyTo!.appendChild(copyFrom);

	copyFrom.select();
	document.execCommand('copy');

	copyTo!.removeChild(copyFrom);
}

export default copyToClipboard;
