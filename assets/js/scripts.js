
const key = "notes";

const form = document.getElementById('form-note');
const note = document.querySelector("#note");
const count = document.getElementById("count");
const imgEmpty = document.querySelector('.img-empty');
const statusNote = document.querySelector('#status-note');
const listNotes = document.getElementById("list-notes");

myEvents();


function myEvents() {
    form.addEventListener('submit', addNote);
    window.addEventListener('load', initialNotes);
    listNotes.addEventListener('click', removeNote);
}


function addNote(e) {
    e.preventDefault();

    const noteValue = note.value;
    
    if(noteValue != '') {
        addNoteToLocaleStorage(noteValue, (status) => {
            if(status) {
                createNoteElement(noteValue);
                showStatusNotes(true);
            }
        });
    } else {
        showStatusNotes(false);
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

function removeNote(e) {
   if(e.target.id.includes('remove-note')) {
    const parentLi = e.target.parentElement;
    const note = parentLi.firstElementChild;
    
    const noteValue = note.innerHTML;

    removeNoteFromLocalStorage(noteValue);

    parentLi.remove();
   }
}

function initialNotes() {
    const notes = fetchNotes();

    notes.forEach((note) => {
        createNoteElement(note);
    });

    count.innerHTML = notes.length;
    imageEmpty(notes.length);
}

function removeNoteFromLocalStorage(note){
    const notes = fetchNotes();

    const notesFilters = notes.filter(n => n !== note);

    saveNotes(notesFilters);
}

function createNoteElement(note) {
    const li = document.createElement('li');
    li.classList.add("note");

    const span = document.createElement('span');
    span.innerHTML = note;
    // span.id = 'note';

    const i = document.createElement('i');
    i.classList = 'fa fa-2x fa-trash';
    i.id = 'remove-note';

    li.appendChild(span);
    li.appendChild(i);

    listNotes.appendChild(li);
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

function showStatusNotes(status) {
    if(status) {
        statusNote.innerHTML = "یادداشت اضافه شد";

        statusNote.classList = "label-note-success";

    } else {
        statusNote.innerHTML = "یادداشت اضافه نشد";

        statusNote.classList = "label-note-unsuccess";
    }

    setTimeout(() => {
        statusNote.innerHTML = "";
    }, 4000);
}