import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  const tokenData = useLoaderData();
  const submit = useSubmit();
 useEffect(() => {
  if(!tokenData){
    return;
  }
  if(tokenData === 'EXPIRED'){
    submit(null, { action: '/logout', method: 'post' });   
    return;
  }
  const duration = getTokenDuration();
   console.log('Token duration (ms): ', duration);
  setTimeout(() => {
    submit(null, { action: '/logout', method: 'post' });   
  }, duration); // 1 hour
}, [tokenData,submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
