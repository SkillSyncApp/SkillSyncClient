import { Toaster } from 'react-hot-toast';
import {
  RouterProvider
} from "react-router-dom";
import {
  RecoilRoot,
} from 'recoil';
import { router } from './routes/router.tsx';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
      <Toaster />
    </RecoilRoot>
  )
}

export default App;
