document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('http://localhost:5005/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
          alert('Registration successful!');
          // Redirect to login page or home page
          window.location.href = 'login.html';
      } else {
          alert(data.msg);
      }
  } catch (error) {
      console.error('Error:', error);
  }
});
