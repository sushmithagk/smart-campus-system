// ================= STUDENT REGISTRATION =================

function registerStudent() {

    // Getting registration form values
    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("regEmail").value;

    const password =
    document.getElementById("regPassword").value;

    // Sending data to backend API
    fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        // Converting data into JSON format
        body: JSON.stringify({
            name,
            email,
            password
        })

    })

    // Getting response from backend
    .then(res => res.text())

    .then(data => {

        // Showing success message
        alert(data);

        // Redirecting to login page
        window.location.href =
        "student-login.html";

    });

}



// ================= STUDENT LOGIN =================

function studentLogin() {

    // Getting login credentials
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    // Sending login request to backend
    fetch("http://localhost:5000/student-login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    })

    // Receiving JSON response
    .then(res => res.json())

    .then(data => {

        // If login successful
        if(data.success){

            // Storing student name in browser storage
            localStorage.setItem(
                "studentName",
                data.student.name
            );

            // Redirecting to student dashboard
            window.location.href = "student.html";

        }
        else{

            // Showing error message
            alert(data.message);

        }

    });

}



// ================= COMPLAINT SUBMISSION =================

function submitComplaint() {

    // Getting student name from local storage
    const student_name =
    localStorage.getItem("studentName");

    // Getting complaint details
    const issue =
    document.getElementById("issue").value;

    const location =
    document.getElementById("location").value;

    // Sending complaint data to backend
    fetch("http://localhost:5000/complaint", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            student_name,
            issue,
            location
        })

    })

    // Receiving response
    .then(res => res.text())

    .then(data => {

        // Showing success message
        alert(data);

        // Clearing input fields
        document.getElementById("issue").value = "";

        document.getElementById("location").value = "";

    });

}



// ================= ADMIN LOGIN =================

function adminLogin() {

    // Getting admin credentials
    const username =
    document.getElementById("adminUsername").value;

    const password =
    document.getElementById("adminPassword").value;

    // Sending login request to backend
    fetch("http://localhost:5000/admin-login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    })

    // Receiving JSON response
    .then(res => res.json())

    .then(data => {

        // If login successful
        if(data.success){

            // Redirecting to admin dashboard
            window.location.href = "admin.html";

        }
        else{

            // Showing error message
            alert(data.message);

        }

    });

}



// ================= DISPLAY COMPLAINTS IN ADMIN DASHBOARD =================

// Checking whether current page is admin dashboard
if(window.location.pathname.includes("admin.html")){

    // Fetching all complaints from backend
    fetch("http://localhost:5000/complaints")

    .then(res => res.json())

    .then(data => {

        let output = "";

        // Looping through each complaint
        data.forEach((item) => {

            // Creating complaint card dynamically
            output += `

            <div class="card">

                <h3>${item.student_name}</h3>

                <p>
                    <b>Issue:</b> ${item.issue}
                </p>

                <p>
                    <b>Location:</b> ${item.location}
                </p>

                <p>
                    <b>Status:</b> ${item.status}
                </p>

                <select id="status${item.id}">

                    <option value="--status--">
                        -- Select Status --
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Resolved">
                        Resolved
                    </option>

                </select>

                <button onclick="updateStatus(${item.id})">
                    Update
                </button>

            </div>

            `;

        });

        // Displaying all complaint cards
        document.getElementById("complaintsData")
        .innerHTML = output;

    });

}


// ================= UPDATE COMPLAINT STATUS =================

function updateStatus(id){

    // Getting selected status value
    const status =
    document.getElementById(`status${id}`).value;

    // Sending update request to backend
    fetch(`http://localhost:5000/update-status/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            status
        })

    })

    .then(res => res.text())

    .then(data => {

        // Showing success message
        alert(data);

        // Refreshing page after update
        location.reload();

    });

}

// ================= TRACK STUDENT COMPLAINTS =================

// Checking whether current page is track page
if(window.location.pathname.includes("track.html")){

    // Fetching all complaints
    fetch("http://localhost:5000/complaints")

    .then(res => res.json())

    .then(data => {

        // Getting logged in student name
        const studentName =
        localStorage.getItem("studentName");

        let output = "";

        // Filtering only current student's complaints
        data.forEach((item) => {

            if(item.student_name === studentName){

                output += `

                <div class="card">

                    <h3>${item.issue}</h3>

                    <p>
                        <b>Location:</b> ${item.location}
                    </p>

                    <p>
                        <b>Status:</b> ${item.status}
                    </p>

                </div>

                `;

            }

        });

        // Displaying complaints
        document.getElementById("trackData")
        .innerHTML = output;

    });

}

// ================= LOGOUT FUNCTION =================

function logout(){

    // Clear stored student data
    localStorage.clear();

    // Redirect to home page
    window.location.href = "student-login.html";

}

// ================= ADMIN LOGOUT =================

function adminLogout(){

    // Redirecting to home page
    window.location.href = "admin-login.html";

}