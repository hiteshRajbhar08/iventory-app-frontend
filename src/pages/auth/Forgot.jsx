import { AiOutlineMail } from 'react-icons/ai';
import Card from '../../components/card/Card';
import './Auth.modules.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  forgotPassword,
  validateEmail,
} from '../../redux/features/auth/authService';

const Forgot = () => {
  const [email, setEmail] = useState('');

  const fortgotHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Email  Required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail('');
  };

  return (
    <div className="container auth">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={fortgotHandler}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Password Email
            </button>
            <div className="links">
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
