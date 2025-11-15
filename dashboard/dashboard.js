document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '../login/login.html';
  }

  try {
    const response = await fetch('http://localhost:3000/data/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const salesData = await response.json();
      // Process and display the sales data here
      console.log(salesData);
    } else {
      window.location.href = '../login/login.html';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
