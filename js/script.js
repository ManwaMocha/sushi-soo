

/* Array of background images for rotation */
const backgroundImages = [
  'assets/images/bg1.jpg',
  'assets/images/bg2.jpg',
  'assets/images/bg3.jpg',
  'assets/images/bg4.jpg',
  'assets/images/bg5.jpg'
];

/* Function to get a random background image */
function getRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}

/* Tracks admin login status */
let isLoggedIn = false;

/* Routes for each page’s content */
const routes = {
  'home': `
    <section class="homepage" style="background-image: url(${getRandomBackground()});">
      <div class="homepage-content">
        <h1>Sushi Soo Awaits You!</h1>
        <p>Discover the best sushi in Kileleshwa, Nairobi.</p>
        <a href="#" onclick="navigate('reservation')" class="btn">Book Your Table</a>
      </div>
    </section>
  `,
  'menu': `
    <section class="container menu">
      <h2>Our Menu</h2>
      <div id="menuImages" class="menu-gallery">
        <p>Loading menu images...</p>
      </div>
    </section>
  `,
  'reservation': `
    <section class="container reservation">
      <h2>Make a Reservation</h2>
      <form id="reservationForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" required>
        </div>
        <div class="form-group">
          <label for="time">Time:</label>
          <input type="time" id="time" required>
        </div>
        <div class="form-group">
          <label for="guests">Number of Guests:</label>
          <input type="number" id="guests" min="1" required>
        </div>
        <button type="submit" class="btn">Submit Reservation</button>
      </form>
    </section>
  `,
  'my-reservations': `
    <section class="container reservations">
      <h2>My Reservations</h2>
      <div id="reservationsList">
        <p>Loading reservations...</p>
      </div>
    </section>
  `,
  'contact': `
    <section class="container contact">
      <h2>Contact Us</h2>
      <p><strong>Email:</strong> info@sushisoo.com</p>
      <p><strong>Phone:</strong> +254 123 456 789</p>
      <p><strong>Address:</strong> Kileleshwa, Nairobi, Kenya</p>
    </section>
  `,
  'admin': `
    <section class="container admin">
      <h2>Admin Login</h2>
      <form id="adminLoginForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" autocomplete="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" autocomplete="current-password" required>
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <div id="loginMessage" style="color: red; margin-top: 10px;"></div>
    </section>
  `,
  'admin-dashboard': `
    <section class="container admin">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Administrator!</p>
      <button class="btn" onclick="navigate('manage-menu')">Manage Menu</button>
      <button class="btn" onclick="navigate('manage-reservations')">Manage Reservations</button>
      <button class="btn" onclick="logout()">Logout</button>
      <div id="adminContent" style="margin-top: 20px;">
        <table id="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="reservation-list"></tbody>
        </table>
      </div>
    </section>
  `,
  'manage-menu': `
    <section class="container admin">
      <h2>Manage Menu Images</h2>
      <button class="btn" onclick="navigate('admin-dashboard')">Back to Dashboard</button>
      <form id="menuImageForm" style="margin-top: 20px;" enctype="multipart/form-data">
        <div class="form-group">
          <label for="menuImageFile">Upload Menu Image (JPG only):</label>
          <input type="file" id="menuImageFile" accept="image/jpeg" required>
        </div>
        <button type="submit" class="btn">Add Menu Image</button>
      </form>
      <div id="menuMessage" style="color: green; margin-top: 10px;"></div>
      <h3>Current Menu Images</h3>
      <div id="currentMenuImages" class="menu-gallery">
        <p>Loading menu images...</p>
      </div>
    </section>
  `,
  'manage-reservations': `
    <section class="container admin">
      <h2>Manage Reservations</h2>
      <button class="btn" onclick="navigate('admin-dashboard')">Back to Dashboard</button>
      <div id="adminContent">
        <table id="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="reservation-list"></tbody>
        </table>
      </div>
    </section>
  `
};

/* Navigation function to load content and set random background */
function navigate(page) {
  const content = document.getElementById('content');
  // Restrict access to admin pages if not logged in
  const adminPages = ['admin-dashboard', 'manage-menu', 'manage-reservations'];
  if (adminPages.includes(page) && !isLoggedIn) {
    alert('Access Denied. Please log in to view this page.');
    page = 'admin';
  }
  content.innerHTML = routes[page] || routes['home'];
  // Set background image, skip for admin pages
  const main = document.querySelector('main');
  if (page !== 'admin' && !adminPages.includes(page)) {
    main.style.backgroundImage = `url(${getRandomBackground()})`;
  } else {
    main.style.backgroundImage = 'none';
  }

  // Handle page-specific logic
  if (page === 'menu') {
  const menuContainer = document.getElementById('menuImages');
  menuContainer.innerHTML = '';

  const images = [
    "assets/images/menu1.png",
    "assets/images/menu2.png",
    "assets/images/menu3.png",
    "assets/images/menu4.png",
    "assets/images/menu5.png"
  ];

  images.forEach((src, index) => {
    const div = document.createElement('div');
    div.className = 'menu-image-item';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Menu Image ${index + 1}`;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    div.appendChild(img);
    menuContainer.appendChild(div);
  });
}

   else if (page === 'reservation') {
    // Handle reservation form submission
    const form = document.getElementById('reservationForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const reservation = {
          name: document.getElementById('name').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          guests: parseInt(document.getElementById('guests').value)
        };
        fetch('http://localhost:3000/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservation)
        })
          .then(response => {
            if (!response.ok) throw new Error(`Reservation submission failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
            return response.json();
          })
          .then(data => {
            console.log('Reservation created:', data);
            alert('Reservation submitted successfully!');
            form.reset();
            navigate('my-reservations');
          })
          .catch(error => {
            console.error('Error submitting reservation:', error.message);
            alert('Failed to submit reservation: ' + error.message);
          });
      });
    }
  } else if (page === 'my-reservations') {
    // Fetch and display user reservations
    fetch('http://localhost:3000/reservations')
      .then(response => {
        if (!response.ok) throw new Error(`Reservations fetch failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
        return response.json();
      })
      .then(data => {
        console.log('Reservations fetched:', data);
        const reservationsList = document.getElementById('reservationsList');
        reservationsList.innerHTML = '';
        if (data.length === 0) {
          reservationsList.innerHTML = '<p>You have no reservations.</p>';
        } else {
          data.forEach(reservation => {
            const div = document.createElement('div');
            div.className = 'reservation-item';
            div.innerHTML = `
              <p><strong>Name:</strong> ${reservation.name}</p>
              <p><strong>Date:</strong> ${reservation.date}</p>
              <p><strong>Time:</strong> ${reservation.time}</p>
              <p><strong>Guests:</strong> ${reservation.guests}</p>
              <button class="btn cancel-btn" data-id="${reservation.id}">Cancel</button>
            `;
            reservationsList.appendChild(div);
          });
          document.querySelectorAll('.cancel-btn').forEach(button => {
            button.addEventListener('click', (e) => {
              const id = e.target.dataset.id; // Keep as string
              console.log(`Attempting to cancel reservation ID: ${id}`);
              if (confirm('Are you sure you want to cancel this reservation?')) {
                cancelReservation(id);
              }
            });
          });
        }
      })
      .catch(error => {
        console.error('Error fetching reservations:', error.message);
        document.getElementById('reservationsList').innerHTML = '<p>Could not load reservations: ' + error.message + '</p>';
      });
  } else if (page === 'admin') {
    // Handle admin login form submission
    const loginForm = document.getElementById('adminLoginForm');
    const loginMessage = document.getElementById('loginMessage');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        // Fetch admin credentials from db.json
        fetch('http://localhost:3000/admin')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Admin fetch failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000, port 3000 is free, and db.json has write permissions (chmod 664 db.json). Check terminal for json-server errors (e.g., "Failure writing output to destination").`);
            }
            return response.json();
          })
          .then(adminUsers => {
            const adminUser = adminUsers.find(user => user.username === usernameInput && user.password === passwordInput);
            if (adminUser) {
              isLoggedIn = true;
              loginMessage.textContent = '';
              navigate('admin-dashboard');
              loadReservations(); // Load reservations on dashboard
            } else {
              isLoggedIn = false;
              loginMessage.textContent = 'Invalid username or password.';
            }
          })
          .catch(error => {
            console.error('Error fetching admin data:', error.message);
            loginMessage.textContent = 'Login failed: Server not responding. Check console for details.';
          });
      });
    }
  } else if (page === 'manage-menu') {
    // Handle menu image file upload
    const menuImageForm = document.getElementById('menuImageForm');
    const menuMessage = document.getElementById('menuMessage');
    if (menuImageForm) {
      menuImageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('menuImageFile');
        const file = fileInput.files[0];
        console.log(`Attempting to upload file: ${file ? file.name : 'No file selected'}`);
        if (!file) {
          menuMessage.textContent = 'Please select a JPG file.';
          menuMessage.style.color = 'red';
          return;
        }
        if (!file.type.startsWith('image/jpeg')) {
          console.error('Invalid file type: Must be JPG');
          menuMessage.textContent = 'Please select a valid JPG file.';
          menuMessage.style.color = 'red';
          return;
        }
        const formData = new FormData();
        formData.append('image', file);
        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`File upload failed with status ${response.status}: ${response.statusText}. Ensure json-server is running with upload.js middleware on port 3000 and public/images/ is writable (chmod 775).`);
            }
            return response.json();
          })
          .then(data => {
            console.log('File uploaded successfully:', data);
            menuMessage.textContent = 'Menu image uploaded successfully!';
            menuMessage.style.color = 'green';
            menuImageForm.reset();
            loadMenuImages(); // Refresh menu images
          })
          .catch(error => {
            console.error('Error uploading file:', error.message);
            menuMessage.textContent = 'Failed to upload menu image: ' + error.message;
            menuMessage.style.color = 'red';
          });
      });
    }
    loadMenuImages(); // Load current menu images
  } else if (page === 'admin-dashboard' || page === 'manage-reservations') {
    // Load reservations for admin dashboard or manage-reservations page
    loadReservations();
  }
}

/* Function to load current menu images on manage-menu page */
function loadMenuImages() {
  fetch('http://localhost:3000/menuImages')
    .then(response => {
      if (!response.ok) throw new Error(`Menu images fetch failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
      return response.json();
    })
    .then(data => {
      console.log('Menu images fetched:', data);
      const menuContainer = document.getElementById('currentMenuImages');
      menuContainer.innerHTML = '';
      if (data.length === 0) {
        menuContainer.innerHTML = '<p>No menu images available.</p>';
      } else {
        data.forEach((item, index) => {
          const div = document.createElement('div');
          div.className = 'menu-image-item';
          const img = document.createElement('img');
          img.src = item.url;
          img.alt = `Menu Image ${index + 1}`;
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          img.onload = () => console.log(`Image loaded successfully: ${item.url}`);
          img.onerror = () => {
            console.error(`Failed to load image: ${item.url}`);
            img.src = 'assets/images/placeholder.jpg';
            img.alt = 'Image failed to load';
          };
          div.appendChild(img);
          const deleteButton = document.createElement('button');
          deleteButton.className = 'btn';
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = () => deleteMenuImage(item.id);
          div.appendChild(deleteButton);
          menuContainer.appendChild(div);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching menu images:', error.message);
      document.getElementById('currentMenuImages').innerHTML = '<p>Could not load menu images: ' + error.message + '</p>';
    });
}

/* Function to delete a menu image */
function deleteMenuImage(id) {
  console.log(`Attempting to delete menu image ID: ${id}`);
  if (confirm('Are you sure you want to delete this menu image?')) {
    fetch(`http://localhost:3000/menuImages/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok && response.status !== 204) {
          throw new Error(`Delete menu image failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
        }
        return response.text();
      })
      .then(() => {
        alert('Menu image deleted successfully!');
        loadMenuImages(); // Refresh menu images
      })
      .catch(error => {
        console.error('Error deleting menu image:', error.message);
        alert('Failed to delete menu image: ' + error.message);
      });
  }
}

/* Function to cancel a reservation */
function cancelReservation(id) {
  console.log(`Attempting to cancel reservation ID: ${id}`);
  // Send DELETE request to remove user reservation
  fetch(`http://localhost:3000/reservations/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok && response.status !== 204) {
        throw new Error(`Delete reservation failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
      }
      return response.text();
    })
    .then(() => {
      alert('Reservation cancelled!');
      navigate('my-reservations');
    })
    .catch(error => {
      console.error('Error cancelling reservation:', error.message);
      alert('Failed to cancel reservation: ' + error.message);
    });
}

/* Function to delete a reservation (for admin) */
function deleteReservation(id) {
  console.log(`Attempting to delete reservation ID: ${id}`);
  // Send DELETE request to remove reservation from database
  fetch(`http://localhost:3000/reservations/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok && response.status !== 204) {
        throw new Error(`Delete reservation failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
      }
      return response.text();
    })
    .then(() => {
      alert('Reservation deleted successfully!');
      loadReservations(); // Refresh reservation table
    })
    .catch(error => {
      console.error('Error deleting reservation:', error.message);
      alert('Failed to delete reservation: ' + error.message);
    });
}

/* Function to load reservations for admin dashboard */
function loadReservations() {
  // Fetch all reservations from json-server
  fetch('http://localhost:3000/reservations')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Reservations fetch failed with status ${response.status}: ${response.statusText}. Ensure json-server is running in Sushi-soo/ with db.json on port 3000 and has write permissions (chmod 664 db.json).`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Reservations fetched for admin:', data);
      const reservationList = document.getElementById('reservation-list');
      if (reservationList) {
        reservationList.innerHTML = '';
        if (data.length === 0) {
          reservationList.innerHTML = '<tr><td colspan="5">No reservations found.</td></tr>';
        } else {
          data.forEach(res => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${res.name}</td>
              <td>${res.date}</td>
              <td>${res.time}</td>
              <td>${res.guests}</td>
              <td><button class="btn delete-reservation-btn" data-id="${res.id}">Delete</button></td>
            `;
            reservationList.appendChild(row);
          });
          document.querySelectorAll('.delete-reservation-btn').forEach(button => {
            button.addEventListener('click', (e) => {
              const id = e.target.dataset.id; // Keep as string
              console.log(`Attempting to delete reservation ID: ${id}`);
              if (confirm('Are you sure you want to delete this reservation?')) {
                deleteReservation(id);
              }
            });
          });
        }
      }
    })
    .catch(error => {
      console.error('Error fetching reservations:', error.message);
      const reservationList = document.getElementById('reservation-list');
      if (reservationList) {
        reservationList.innerHTML = '<tr><td colspan="5">Could not load reservations: ' + error.message + '</tr>';
      }
    });
}

/* Function to log out admin */
function logout() {
  // Reset login status and redirect to home
  isLoggedIn = false;
  alert('You have been logged out.');
  navigate('home');
}

/* Initialize page on load */
document.addEventListener('DOMContentLoaded', () => {
  navigate('home');
});
