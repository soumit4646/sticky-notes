const notes_container = document.querySelector("#app-container");
const add_note_btn = document.querySelector(".add-note");

get_notes().forEach((note) => {
  const noteElement = create_note_element(note.id, note.content);
  notes_container.insertBefore(noteElement, add_note_btn);
});

add_note_btn.addEventListener("click", () => {
  add_note();
});

function get_notes() {
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function save_notes(notes) {
  localStorage.setItem("sticky-notes", JSON.stringify(notes));
}

function create_note_element(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";
  element.addEventListener("change", () => {
    update_note(id, element.value);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure ?");
    if (doDelete) {
      delete_note(id, element);
    }
  });
  return element;
}

function add_note() {
  const existing_notes = get_notes();
  const note_object = {
    id: Math.floor(Math.random() * 100000000),
    content: "",
  };
  const noteElement = create_note_element(note_object.id, note_object.content);
  notes_container.insertBefore(noteElement, add_note_btn);
  existing_notes.push(note_object);
  save_notes(existing_notes);
}

function update_note(id, new_content) {
  // console.log("Updating note...");
  const notes = get_notes();
  const target_note = notes.filter((note) => note.id == id)[0];
  target_note.content = new_content;
  save_notes(notes);
}

function delete_note(id, element) {
  const notes = get_notes().filter((note) => note.id != id);
  save_notes(notes);
  notes_container.removeChild(element);
}
