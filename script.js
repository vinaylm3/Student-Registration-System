// Select the form and student list elements
const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Load data from localStorage and store in students array
let students = JSON.parse(localStorage.getItem("students")) || []; 

function updateStudentList() {
    studentList.innerHTML = ''; // Clear the current list
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        studentList.appendChild(row);
    });

    // If no students, show a message
    if (students.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="no-students">No students registered yet.</td>';
        studentList.appendChild(row);
    }

    // Add vertical scroll if there are more than 5 students
    const table = document.querySelector('.display-section');
    table.style.maxHeight = students.length > 5 ? '300px' : 'auto'; // Set max height for the table
    table.style.overflowY = students.length > 5 ? 'scroll' : 'auto'; // Add scroll if more than 5 students
}

// Form Submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validation for name, studentId, email, and contact
    if (!name || !studentId || !email || !contact) {
        alert("All fields are required.");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Student Name must contain only letters.");
        return;
    }
    if (!/^\d+$/.test(studentId)) {
        alert("Student ID must be numbers only.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email address.");
        return;
    }
    if (!/^\d{10,}$/.test(contact)) {
        alert("Contact number must have at least 10 digits.");
        return;
    }

    const student = { name, studentId, email, contact };
    students.push(student); // Add student to the list
    localStorage.setItem("students", JSON.stringify(students)); // Save to localStorage
    alert("Student registered successfully!"); // Alert user
    updateStudentList(); // Update the displayed list
    form.reset();
});

// Edit Student
function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    students.splice(index, 1); // Remove the student from the list for editing
    localStorage.setItem("students", JSON.stringify(students)); // Save to localStorage
    updateStudentList();
}

// Delete Student
function deleteStudent(index) {
    if(confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1); // Remove student from the list
        localStorage.setItem("students", JSON.stringify(students)); // Save to localStorage
        alert("Student deleted successfully!"); // Alert user
        updateStudentList();
    }
}

// Initial call to display students
updateStudentList();