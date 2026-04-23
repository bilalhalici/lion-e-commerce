import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import { AppContainer } from "./App.styles.jsx";

const Home = lazy(() => import("./routes/home/home.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner/>}>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      </AppContainer>
    </Suspense>
  );
};

export default App;