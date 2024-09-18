const argon2 = require('argon2');

const testPassword = 'testpassword123';  // The password to hash

(async () => {
    try {
        // Generate a new hash
        const hash = await argon2.hash(testPassword);
        console.log('Generated Hash:', hash);

        // Verify the password against the newly generated hash
        const match = await argon2.verify(hash, testPassword);
        console.log(`Password match with newly generated hash: ${match}`);
    } catch (err) {
        console.error('Error:', err);
    }
})();
