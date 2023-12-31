/* eslint-disable */
// ***** Start **** //

displayUsers();

// ***** Fetch and display users **** //

/**
 * Call api
 */
function displayUsers() {
  Http.get("/api/users/all")
    .then((resp) => resp.json())
    .then((resp) => {
      const allUsers = resp.users;
      // Empty the anchor
      const allUsersAnchor = document.getElementById("all-users-anchor");
      allUsersAnchor.innerHTML = "";
      // Append users to anchor
      allUsers.forEach((user) => {
        allUsersAnchor.innerHTML += getUserDisplayEle(user);
      });
    });
}

/**
 * Get user display element
 */
function getUserDisplayEle(user) {
  return `<div class="user-display-ele">

      <div class="normal-view">
        <div>Name: ${user.name}</div>
        <div>Email: ${user.email}</div>
        <button class="edit-user-btn" data-user-id="${user.id}" data-user-role="${user.role}">
          Edit
        </button>
        <button class="delete-user-btn" data-user-id="${user.id}">
          Delete
        </button>
      </div>

      <div class="edit-view">
        <div>
          Name: <input class="name-edit-input" value="${user.name}">
        </div>
        <div>
          Email: <input class="email-edit-input" value="${user.email}">
        </div>
        <button class="submit-edit-btn" data-user-id="${user.id}">
          Submit
        </button>
        <button class="cancel-edit-btn" data-user-id="${user.id}">
          Cancel
        </button>
      </div>
    </div>`;
}

// **** Add, Edit, and Delete Users **** //

// Setup event listener for button click
document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    const ele = event.target;
    if (ele.matches("#add-user-btn")) {
      addUser();
    } else if (ele.matches(".edit-user-btn")) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches(".cancel-edit-btn")) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches(".submit-edit-btn")) {
      submitEdit(ele);
    } else if (ele.matches(".delete-user-btn")) {
      deleteUser(ele);
    } else if (ele.matches("#logout-btn")) {
      logoutUser();
    }
  },
  false,
);

/**
 * Add a new user.
 */
function addUser() {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const data = {
    user: {
      id: -1,
      name: nameInput.value,
      email: emailInput.value,
      role: 0,
    },
  };
  // Call api
  Http.post("/api/users/add", data).then(() => displayUsers());
}

/**
 * Show edit view.
 */
function showEditView(userEle) {
  const normalView = userEle.getElementsByClassName("normal-view")[0];
  const editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "none";
  editView.style.display = "block";
}

/**
 * Cancel edit.
 */
function cancelEdit(userEle) {
  const normalView = userEle.getElementsByClassName("normal-view")[0];
  const editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "block";
  editView.style.display = "none";
}

/**
 * Submit edit.
 */
function submitEdit(ele) {
  const userEle = ele.parentNode.parentNode;
  const nameInput = userEle.getElementsByClassName("name-edit-input")[0];
  const emailInput = userEle.getElementsByClassName("email-edit-input")[0];
  const id = ele.getAttribute("data-user-id");
  const role = ele.getAttribute("data-user-role");
  const data = {
    user: {
      id: Number(id),
      name: nameInput.value,
      email: emailInput.value,
      role: Number(role),
    },
  };
  Http.put("/api/users/update", data).then(() => displayUsers());
}

/**
 * Delete a user
 */
function deleteUser(ele) {
  const id = ele.getAttribute("data-user-id");
  Http.delete("/api/users/delete/" + id).then(() => displayUsers());
}

// **** Logout **** //

function logoutUser() {
  Http.get("/api/auth/logout").then(() => (window.location.href = "/"));
}
