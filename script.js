document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    
    // // Sidebar Collapse
    // const collapseSidebar = document.getElementById('collapse-sidebar');
    // const sidebar = document.querySelector('.sidebar');
    
    // collapseSidebar.addEventListener('click', function() {
    //   sidebar.classList.toggle('collapsed');
    //   localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    // });
    
    // // Check for saved sidebar state
    // const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    // if (sidebarCollapsed) {
    //   sidebar.classList.add('collapsed');
    // }
    
    // Profile Dropdown
    const profileBtn = document.querySelector('.profile-btn');
    const profileMenu = document.getElementById('profile-menu');
    
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      profileMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      profileMenu.classList.remove('show');
    });
    
    // Notifications Panel
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const closeNotifications = document.querySelector('.close-notifications');
    
    notificationsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationsPanel.classList.toggle('show');
    });
    
    closeNotifications.addEventListener('click', function() {
      notificationsPanel.classList.remove('show');
    });
    
    // Close notifications panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!notificationsPanel.contains(e.target) && e.target !== notificationsBtn) {
        notificationsPanel.classList.remove('show');
      }
    });
    
    // Modal Functions
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Add Money Modal
    const addMoneyBtn = document.getElementById('add-money-btn');
    const addMoneyModal = document.getElementById('add-money-modal');
    const cancelAddMoney = document.getElementById('cancel-add-money');
    const confirmAddMoney = document.getElementById('confirm-add-money');
    
    addMoneyBtn.addEventListener('click', function() {
      addMoneyModal.classList.add('show');
    });
    
    cancelAddMoney.addEventListener('click', function() {
      addMoneyModal.classList.remove('show');
    });
    
    confirmAddMoney.addEventListener('click', function() {
      const amount = document.getElementById('amount').value;
      if (amount) {
        // Update account balance (in a real app, this would be an API call)
        const totalBalance = document.querySelector('.total-balance');
        const checkingBalance = document.querySelector('.accounts-list .account-item:first-child .account-balance');
        
        const currentTotal = parseFloat(totalBalance.textContent.replace('$', '').replace(',', ''));
        const currentChecking = parseFloat(checkingBalance.textContent.replace('$', '').replace(',', ''));
        
        const newChecking = currentChecking + parseFloat(amount);
        const newTotal = currentTotal + parseFloat(amount);
        
        checkingBalance.textContent = '$' + newChecking.toFixed(2);
        totalBalance.textContent = '$' + newTotal.toFixed(2);
        
        // Show success message
        alert('Successfully added $' + amount + ' to your account!');
        
        // Reset form and close modal
        document.getElementById('amount').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('expiry').value = '';
        document.getElementById('cvv').value = '';
        addMoneyModal.classList.remove('show');
      } else {
        alert('Please enter an amount');
      }
    });
    
    // Send Money Modal
    const sendMoneyBtn = document.getElementById('send-money-btn');
    const sendMoneyModal = document.getElementById('send-money-modal');
    const cancelSendMoney = document.getElementById('cancel-send-money');
    const confirmSendMoney = document.getElementById('confirm-send-money');
    
    sendMoneyBtn.addEventListener('click', function() {
      sendMoneyModal.classList.add('show');
    });
    
    cancelSendMoney.addEventListener('click', function() {
      sendMoneyModal.classList.remove('show');
    });
    
    confirmSendMoney.addEventListener('click', function() {
      const amount = document.getElementById('send-amount').value;
      const fromAccount = document.getElementById('from-account').value;
      const recipient = document.getElementById('recipient').value;
      
      if (amount && recipient) {
        // Update account balance (in a real app, this would be an API call)
        const totalBalance = document.querySelector('.total-balance');
        let accountBalance;
        
        if (fromAccount === 'checking') {
          accountBalance = document.querySelector('.accounts-list .account-item:nth-child(1) .account-balance');
        } else if (fromAccount === 'savings') {
          accountBalance = document.querySelector('.accounts-list .account-item:nth-child(2) .account-balance');
        } else {
          accountBalance = document.querySelector('.accounts-list .account-item:nth-child(3) .account-balance');
        }
        
        const currentTotal = parseFloat(totalBalance.textContent.replace('$', '').replace(',', ''));
        const currentAccount = parseFloat(accountBalance.textContent.replace('$', '').replace(',', ''));
        
        const newAccount = currentAccount - parseFloat(amount);
        const newTotal = currentTotal - parseFloat(amount);
        
        accountBalance.textContent = '$' + newAccount.toFixed(2);
        totalBalance.textContent = '$' + newTotal.toFixed(2);
        
        // Show success message
        alert('Successfully sent $' + amount + ' to ' + recipient + '!');
        
        // Reset form and close modal
        document.getElementById('send-amount').value = '';
        document.getElementById('recipient').value = '';
        sendMoneyModal.classList.remove('show');
      } else {
        alert('Please fill in all fields');
      }
    });
    
    // Request Money Modal
    const requestMoneyBtn = document.getElementById('request-money-btn');
    const requestMoneyModal = document.getElementById('request-money-modal');
    const cancelRequestMoney = document.getElementById('cancel-request-money');
    const confirmRequestMoney = document.getElementById('confirm-request-money');
    
    requestMoneyBtn.addEventListener('click', function() {
      requestMoneyModal.classList.add('show');
    });
    
    cancelRequestMoney.addEventListener('click', function() {
      requestMoneyModal.classList.remove('show');
    });
    
    confirmRequestMoney.addEventListener('click', function() {
      const amount = document.getElementById('request-amount').value;
      const requestFrom = document.getElementById('request-from').value;
      
      if (amount && requestFrom) {
        // Show success message
        alert('Successfully requested $' + amount + ' from ' + requestFrom + '!');
        
        // Reset form and close modal
        document.getElementById('request-amount').value = '';
        document.getElementById('request-from').value = '';
        document.getElementById('request-note').value = '';
        requestMoneyModal.classList.remove('show');
      } else {
        alert('Please fill in all fields');
      }
    });
    
    
    // Pay Bill Modal
    const payBillBtns = document.querySelectorAll('.pay-bill-btn');
    const payBillModal = document.getElementById('pay-bill-modal');
    const cancelPayBill = document.getElementById('cancel-pay-bill');
    const confirmPayBill = document.getElementById('confirm-pay-bill');
    
    // Bill data (in a real app, this would come from an API)
    const bills = [
      { id: 1, name: 'Electricity Bill', amount: 85, dueDate: '2023-07-15' },
      { id: 2, name: 'Internet Service', amount: 60, dueDate: '2023-07-18' },
      { id: 3, name: 'Credit Card Payment', amount: 500, dueDate: '2023-07-25' },
      { id: 4, name: 'Water Bill', amount: 45, dueDate: '2023-07-30' }
    ];
    
    let currentBill;
    
    payBillBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const billId = parseInt(this.getAttribute('data-bill-id'));
        currentBill = bills.find(bill => bill.id === billId);
        
        document.getElementById('bill-name').textContent = currentBill.name;
        document.getElementById('bill-amount').textContent = currentBill.amount;
        document.getElementById('bill-due-date').textContent = currentBill.dueDate;
        
        payBillModal.classList.add('show');
      });
    });
    
    cancelPayBill.addEventListener('click', function() {
      payBillModal.classList.remove('show');
    });
    
    confirmPayBill.addEventListener('click', function() {
      const paymentMethod = document.getElementById('payment-method').value;
      
      // Update account balance (in a real app, this would be an API call)
      const totalBalance = document.querySelector('.total-balance');
      let accountBalance;
      
      if (paymentMethod === 'checking') {
        accountBalance = document.querySelector('.accounts-list .account-item:nth-child(1) .account-balance');
      } else if (paymentMethod === 'savings') {
        accountBalance = document.querySelector('.accounts-list .account-item:nth-child(2) .account-balance');
      } else {
        // Credit card payment doesn't affect account balance
        alert('Successfully paid ' + currentBill.name + ' with your credit card!');
        
        // Remove the bill from the list
        const billElement = document.querySelector(`.pay-bill-btn[data-bill-id="${currentBill.id}"]`).closest('.bill-item');
        billElement.remove();
        
        payBillModal.classList.remove('show');
        return;
      }
      
      const currentTotal = parseFloat(totalBalance.textContent.replace('$', '').replace(',', ''));
      const currentAccount = parseFloat(accountBalance.textContent.replace('$', '').replace(',', ''));
      
      const newAccount = currentAccount - currentBill.amount;
      const newTotal = currentTotal - currentBill.amount;
      
      accountBalance.textContent = '$' + newAccount.toFixed(2);
      totalBalance.textContent = '$' + newTotal.toFixed(2);
      
      // Show success message
      alert('Successfully paid ' + currentBill.name + '!');
      
      // Remove the bill from the list
      const billElement = document.querySelector(`.pay-bill-btn[data-bill-id="${currentBill.id}"]`).closest('.bill-item');
      billElement.remove();
      
      payBillModal.classList.remove('show');
    });
    
    // Close all modals when clicking the close button
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
      });
    });
    
    // Close modals when clicking outside
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('show');
        }
      });
    });
    
    // Financial Chart
    const ctx = document.getElementById('financial-chart').getContext('2d');
    
    const financialChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Income',
            data: [2000, 2200, 2400, 2600, 2800, 3000],
            borderColor: '#8884d8',
            backgroundColor: 'rgba(136, 132, 216, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Expenses',
            data: [1800, 1900, 2000, 2200, 2400, 2600],
            borderColor: '#82ca9d',
            backgroundColor: 'rgba(130, 202, 157, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
    
    // Update chart when theme changes
    themeToggle.addEventListener('click', function() {
      const isDarkMode = document.body.classList.contains('dark-mode');
      
      financialChart.options.scales.x.ticks.color = isDarkMode ? '#94a3b8' : '#64748b';
      financialChart.options.scales.y.ticks.color = isDarkMode ? '#94a3b8' : '#64748b';
      financialChart.options.plugins.legend.labels.color = isDarkMode ? '#f8fafc' : '#0f172a';
      
      financialChart.update();
    });
  });