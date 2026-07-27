
const key = "notes";

const form = document.getElementById('form-note');
const note = document.querySelector("#note");
const count = document.getElementById("count");
const imgEmpty = document.querySelector('.img-empty');

myEvents();


function myEvents() {
    form.addEventListener('submit', addNote);
}


function addNote(e) {
    e.preventDefault();

    const noteValue = note.value;
    
    if(noteValue != '') {
        addNoteToLocaleStorage(noteValue, (status) => {
            if(status) {

            }
        });
    } else {
    
    }

    this.reset();
}

function addNoteToLocaleStorage(noteValue, callBack) {
    const notes = fetchNotes();

    if(!notes.find(n => n === noteValue)) {
        notes.push(noteValue);

        saveNotes(notes);

        callBack(true);
    }
}

function fetchNotes() {
    const notes = localStorage.getItem(key);

    if(notes) {
        return JSON.parse(notes);
    } else {
        return [];
    }
}

function saveNotes(notes) {
    localStorage.setItem(key, JSON.stringify(notes));

    count.innerHTML = notes.length;

    imageEmpty(notes.length);
}

function imageEmpty(length) {
    if(length > 0) {
        imgEmpty.style.display = 'none';
    } else {
        imgEmpty.style.display = 'block';
    }
}