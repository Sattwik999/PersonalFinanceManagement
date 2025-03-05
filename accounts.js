// Sample account data
let accounts = [
    { id: 1, name: 'Main Checking', type: 'checking', balance: 5230.45 },
    { id: 2, name: 'High-Yield Savings', type: 'savings', balance: 12450.00 },
    { id: 3, name: 'Travel Rewards Credit Card', type: 'credit', balance: -1540.30 }
];

// Function to display accounts
function displayAccounts() {
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';

    accounts.forEach(account => {
        const row = accountList.insertRow();
        row.innerHTML = `
            <td>${account.name}</td>
            <td>${account.type.charAt(0).toUpperCase() + account.type.slice(1)}</td>
            <td class="${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}">
                $${account.balance.toFixed(2)}
            </td>
            <td>
                <button class="btn btn-primary btn-sm mr-2" onclick="editAccount(${account.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAccount(${account.id})">Delete</button>
            </td>
        `;
    });
}

// Function to add a new account
function addAccount(event) {
    event.preventDefault();

    const name = document.getElementById('accountName').value;
    const type = document.getElementById('accountType').value;
    const balance = parseFloat(document.getElementById('initialBalance').value);

    const newAccount = {
        id: accounts.length + 1,
        name: name,
        type: type,
        balance: balance
    };

    accounts.push(newAccount);
    displayAccounts();
    event.target.reset();
}

// Function to edit an account (placeholder)
function editAccount(id) {
    alert(`Edit account with ID: ${id}`);
    // Implement edit functionality
}

// Function to delete an account
function deleteAccount(id) {
    if (confirm('Are you sure you want to delete this account?')) {
        accounts = accounts.filter(account => account.id !== id);
        displayAccounts();
    }
}

// Event listeners
document.getElementById('addAccountForm').addEventListener('submit', addAccount);

// Initial display of accounts
displayAccounts();

// Toggle sidebar on mobile (same as in dashboard.js)
const sidebar = document.getElementById('sidebar');
const toggleSidebar = () => {
    sidebar.classList.toggle('active');
};

document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isSidebarActive = sidebar.classList.contains('active');
    if (!isClickInsideSidebar && isSidebarActive) {
        toggleSidebar();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const toggleDarkMode = document.getElementById("theme-toggle");

    // Check local storage for mode preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Save the theme preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});