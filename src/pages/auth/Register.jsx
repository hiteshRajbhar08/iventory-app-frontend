import { TiUserAddOutline } from 'react-icons/ti';
import Card from '../../components/card/Card';
import './Auth.modules.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  registerUser,
  validateEmail,
} from '../../redux/features/auth/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loading from '../../components/loading/Loading';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error('All Fields are Required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container auth">
      {isLoading && <Loading />}
      <Card>
        <div className="form">
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={registerHandler}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className="register">
            <Link to="/">Home</Link>
            <p> &nbsp; Have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
