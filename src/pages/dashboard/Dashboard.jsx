import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import useRedirectLoggedOutUser from '../../customHook/userRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';

const Dashboard = () => {
  useRedirectLoggedOutUser('/login');

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isLoggedIn, message]);

  return (
    <>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </>
  );
};

export default Dashboard;
