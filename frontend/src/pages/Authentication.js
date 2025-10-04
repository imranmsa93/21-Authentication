import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function authAction({ request, params }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('mode') || 'login';
  if(mode !== 'login' && mode !== 'signup') {
    throw new Error('Unsupported mode');
  }
  const requestData = await request.formData();
  const authData = Object.fromEntries(requestData);
  if(
    !authData.email ||
    !authData.password ||
    authData.password.trim().length < 7
  ) {
    return { message: 'Invalid input - password must be at least 7 characters long.'};
  } 
   const response = await fetch('http://localhost:8080/' + (mode === 'login' ? 'login' : 'signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  if(response.status === 422 || response.status === 401) {
   
    const errorData = await response.json();
     console.log('in 422 ==> ',errorData); 
    return errorData;
  }
  if(!response.ok) {
    throw new Error('Could not authenticate user.');
  }
  const resData = await response.json();
  console.log(resData);
  localStorage.setItem('token', resData.token);
  localStorage.setItem('expiration', resData.expiration);
  
  return redirect('/');
}