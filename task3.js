const socket = io(); // establish a connection

const editor = document.getElementById('editor');

// Send changes to the server
editor.addEventListener('input', () => {
    socket.emit('documentChanged', { text: editor.value });
});

// Receive changes from other clients
socket.on('updateDocument', (data) => {
    editor.value = data.text; // update the textarea with the new content
});
