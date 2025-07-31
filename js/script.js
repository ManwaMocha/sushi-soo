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

// START OF NEW GLOBAL VARIABLE FOR LOGIN STATUS
let isLoggedIn = false; // Simple client-side flag for demonstration
// END OF NEW GLOBAL VARIABLE FOR LOGIN STATUS

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
            <div id="menuItems" class="menu-grid">
                <p>Loading menu...</p>
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
    // START OF NEW ROUTES FOR ADMIN
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
                </div>
        </section>
    `,
    'manage-menu': `
        <section class="container admin">
            <h2>Manage Menu Items</h2>
            <button class="btn" onclick="navigate('admin-dashboard')">Back to Dashboard</button>
            <p>This is where you would add, edit, or delete menu items. (Feature under development)</p>
        </section>
    `,
    'manage-reservations': `
        <section class="container admin">
            <h2>Manage Reservations</h2>
            <button class="btn" onclick="navigate('admin-dashboard')">Back to Dashboard</button>
            <p>This is where you would view, approve, or cancel reservations. (Feature under development)</p>
        </section>
    `
    // END OF NEW ROUTES FOR ADMIN
};

/* Navigation function to load content and set random background */
function navigate(page) {
    const content = document.getElementById('content');

    // START OF NEW ADMIN ACCESS CONTROL LOGIC
    // Prevent direct access to admin-dashboard or management pages if not logged in
    const adminPages = ['admin-dashboard', 'manage-menu', 'manage-reservations'];
    if (adminPages.includes(page) && !isLoggedIn) {
        alert('Access Denied. Please log in to view this page.');
        page = 'admin'; // Redirect to the admin login page
    }
    // END OF NEW ADMIN ACCESS CONTROL LOGIC

    content.innerHTML = routes[page] || routes['home'];

    /* Set random background image for main */
    const main = document.querySelector('main');
    // You might want specific backgrounds for admin pages or no background
    if (page !== 'admin' && !adminPages.includes(page)) {
        main.style.backgroundImage = `url(${getRandomBackground()})`;
    } else {
        main.style.backgroundImage = 'none'; // No random background for admin pages
    }


    /* Page-specific logic */
    if (page === 'menu') {
        fetch('http://localhost:3000/menu')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const menuContainer = document.getElementById('menuItems');
                menuContainer.innerHTML = '';
                if (data.length === 0) {
                    menuContainer.innerHTML = '<p>No menu items available at the moment. Please check back later!</p>';
                } else {
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'menu-item';
                        div.innerHTML = `
                            <h3>${item.name}</h3>
                            <img src="${item.image || 'assets/images/placeholder.jpg'}" alt="${item.name}">
                            <p>${item.description}</p>
                            <p>Price: KES ${item.price}</p>
                        `;
                        menuContainer.appendChild(div);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
                const menuContainer = document.getElementById('menuItems');
                menuContainer.innerHTML = '<p>Could not load menu. Please try again later.</p>';
            });
    } else if (page === 'reservation') {
        const form = document.getElementById('reservationForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const reservation = {
                    name: document.getElementById('name').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    guests: document.getElementById('guests').value
                };
                fetch('http://localhost:3000/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reservation)
                }).then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                }).then(() => {
                    alert('Reservation submitted successfully!');
                    form.reset();
                    navigate('my-reservations');
                }).catch(error => {
                    console.error('Error submitting reservation:', error);
                    alert('Failed to submit reservation. Please try again.');
                });
            });
        }
    } else if (page === 'my-reservations') {
        fetch('http://localhost:3000/reservations')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
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
                            const id = e.target.dataset.id;
                            if (confirm('Are you sure you want to cancel this reservation?')) {
                                cancelReservation(id);
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
                const reservationsList = document.getElementById('reservationsList');
                reservationsList.innerHTML = '<p>Could not load reservations. Please try again later.</p>';
            });
    // START OF NEW ADMIN LOGIN LOGIC
    } else if (page === 'admin') {
        const loginForm = document.getElementById('adminLoginForm');
        const loginMessage = document.getElementById('loginMessage');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent default form submission
                const usernameInput = document.getElementById('username').value;
                const passwordInput = document.getElementById('password').value;

                fetch('http://localhost:3000/admin') // Fetch admin credentials from db.json
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.json();
                    })
                    .then(adminUsers => {
                        // Find a matching user
                        const adminUser = adminUsers.find(
                            user => user.username === usernameInput && user.password === passwordInput
                        );

                        if (adminUser) {
                            isLoggedIn = true; // Set login flag to true
                            loginMessage.textContent = ''; // Clear any previous messages
                            navigate('admin-dashboard'); // Navigate to the dashboard
                        } else {
                            isLoggedIn = false;
                            loginMessage.textContent = 'Invalid username or password.';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching admin data:', error);
                        loginMessage.textContent = 'Login failed. Please try again later.';
                    });
            });
        }
    }
    // END OF NEW ADMIN LOGIN LOGIC
}

/* Function to cancel a reservation */
function cancelReservation(id) {
    fetch(`http://localhost:3000/reservations/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                // If json-server returns 200 OK for DELETE but no content, check status
                if (response.status === 200 || response.status === 204) { // 204 No Content is also common for successful DELETE
                    return {}; // Return an empty object or handle as successful no-content
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            alert('Reservation cancelled!');
            navigate('my-reservations'); // Refresh the list
        })
        .catch(error => {
            console.error('Error cancelling reservation:', error);
            alert('Failed to cancel reservation. Please try again.');
        });
}

// START OF NEW LOGOUT FUNCTION
function logout() {
    isLoggedIn = false; // Reset login status
    alert('You have been logged out.');
    navigate('home'); // Redirect to home page
}
// END OF NEW LOGOUT FUNCTION

/* Initialize page on load */
document.addEventListener('DOMContentLoaded', () => {
    navigate('home');
});