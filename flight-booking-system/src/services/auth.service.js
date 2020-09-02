export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('inside authHeader');
    if (user && user.accessToken) {
      // for Node.js Express back-end
      console.log(user.accessToken);
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }