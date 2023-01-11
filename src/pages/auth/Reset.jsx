import { MdPassword } from 'react-icons/md';
import Card from '../../components/card/Card';
import './Auth.modules.scss';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { resetPassword } from '../../redux/features/auth/authService';

const initialState = {
  password: '',
  confirmPassword: '',
};

const Reset = () => {
  const [formData, setformData] = useState(initialState);
  const { password, confirmPassword } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const resetHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password,
      confirmPassword,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container auth">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={resetHandler}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
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

export default Reset;
