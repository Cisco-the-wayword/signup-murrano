document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
        console.log('Submitting registration form...');
        const response = await fetch('http://localhost:5005/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
  
        console.log('Response received:', response);
  
        const data = await response.json(); // Parse response from the server.
  
        if (response.ok) {
            console.log('Registration successful!');
            alert('Registration successful!');
            // Redirect based on the response
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } else {
            console.log('Registration failed:', data.msg);
            alert(data.msg); // Show error message if registration fails
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again.');
    }
  });
  