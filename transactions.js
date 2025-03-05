document.addEventListener('DOMContentLoaded', () => {
    // Sample transactions data
    let transactions = [
        {
            id: 1,
            type: 'income',
            amount: 2500,
            account: 'primary',
            category: 'salary',
            date: '2024-03-01',
            description: 'Monthly Salary'
        },
        {
            id: 2,
            type: 'expense',
            amount: 45.50,
            account: 'primary',
            category: 'food',
            date: '2024-03-05',
            description: 'Grocery Shopping'
        }
    ];

    // Chart instances
    let categoryChart, cashflowChart;

    // DOM Elements
    const transactionsContainer = document.getElementById('transactions-container');
    const addTransactionBtn = document.getElementById('add-transaction');
    const transactionModal = document.getElementById('transactionModal');
    
    // Initialize the app
    function init() {
        renderTransactions();
        initCharts();
        setupEventListeners();
    }

    // Render transactions list
    function renderTransactions(filteredTransactions = transactions) {
        transactionsContainer.innerHTML = filteredTransactions.map(transaction => `
            <div class="transaction-item ${transaction.type}">
                <div class="transaction-icon">
                    <i class="fas fa-${transaction.type === 'income' ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-meta">
                        <span class="transaction-account">${formatAccount(transaction.account)}</span>
                        <span class="transaction-category">${formatCategory(transaction.category)}</span>
                        <span class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                    <div class="transaction-description">${transaction.description}</div>
                </div>
                <div class="transaction-amount">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    // Initialize charts
    function initCharts() {
        // Category Chart
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Salary', 'Food', 'Transport'],
                datasets: [{
                    data: [2500, 345, 120],
                    backgroundColor: ['#4CAF50', '#FF5722', '#2196F3']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });

        // Cash Flow Chart
        const cashflowCtx = document.getElementById('cashflowChart').getContext('2d');
        cashflowChart = new Chart(cashflowCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Cash Flow',
                    data: [2000, 2200, 2500, 2300, 2400],
                    borderColor: '#4CAF50',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Event Listeners
    function setupEventListeners() {
        // Add Transaction Modal
        addTransactionBtn.addEventListener('click', () => {
            transactionModal.style.display = 'block';
        });

        // Close Modal
        document.querySelectorAll('.modal-close, .cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                transactionModal.style.display = 'none';
            });
        });

        // Form Submission
        document.getElementById('transactionForm').addEventListener('submit', e => {
            e.preventDefault();
            const newTransaction = {
                id: transactions.length + 1,
                type: document.querySelector('.type-btn.active').dataset.type,
                amount: parseFloat(document.getElementById('transactionAmount').value),
                account: document.getElementById('transactionAccount').value,
                category: document.getElementById('transactionCategory').value,
                date: document.getElementById('transactionDate').value,
                description: 'New Transaction'
            };
            transactions.push(newTransaction);
            renderTransactions();
            transactionModal.style.display = 'none';
        });

        // Type Toggle
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Sync Transactions
        document.getElementById('sync-transactions').addEventListener('click', async () => {
            const btn = document.getElementById('sync-transactions');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            btn.innerHTML = '<i class="fas fa-sync"></i> Sync Complete';
            setTimeout(() => btn.innerHTML = '<i class="fas fa-sync"></i> Sync Now', 2000);
        });
    }

    // Helper functions
    function formatAccount(account) {
        return {
            primary: 'Primary Account (••••1234)',
            savings: 'Savings Account (••••5678)'
        }[account];
    }

    function formatCategory(category) {
        return {
            salary: 'Salary',
            food: 'Food & Dining',
            transport: 'Transportation'
        }[category];
    }

    // Initialize the application
    init();
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
