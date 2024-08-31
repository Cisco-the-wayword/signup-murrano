document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('http://localhost:5005/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
          alert('Login successful!');
          // Save token to localStorage or sessionStorage
          localStorage.setItem('token', data.token);
          // Redirect to home page or dashboard
          window.location.href = 'register.html';
      } else {
          alert(data.msg);
      }
  } catch (error) {
      console.error('Error:', error);
  }
});
