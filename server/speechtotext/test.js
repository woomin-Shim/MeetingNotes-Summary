var text = 'Text to File'
var link = document.createElement('a');
link.download = 'file.text';
var blob = new Blob([script], {type: 'text/plain'});
link.href = window.URL.createObjectURL(blob);
link.click();