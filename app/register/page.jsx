'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { countries } from 'countries-list';
import styles from './Register.module.css';
import axios from 'axios';




function Register() {
 
  useEffect(() => {
    let auth = localStorage.getItem('auth');
    if(auth)
    {
              router.push('/todo');     
    }
  }, []);


  const router = useRouter();
  const initialFormData = {
    name: '',
    email: '',
    mobile: '',
    gender: '',
    country: '',
    password: '',
    hobbies: ['']
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

  

    try {
      // Send a POST request to your backend server
      const response = await axios.post('http://localhost:4000/register', formData);

      console.log('User data posted successfully:');
      router.push('/login');
    } catch (error) {
      console.error('Error posting user data:', error);
      alert(error.response.data.message);
      console.log('User data posted successfully:', error.message);
    }

    setFormData(initialFormData);
  };

  const handleHobbyChange = (index, value) => {
    const newHobbies = [...formData.hobbies];
    newHobbies[index] = value;
    setFormData({
      ...formData,
      hobbies: newHobbies
    });
  };

  const addHobby = () => {
    if (formData.hobbies.length < 2) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, '']
      });
    }
  };

  const removeHobby = (index) => {
    const newHobbies = [...formData.hobbies];
    newHobbies.splice(index, 1);
    setFormData({
      ...formData,
      hobbies: newHobbies
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.lab}>Registration</label>
        <label className={styles.label} htmlFor="name">Name:</label>
        <input
        className={styles.inputField}
          type="text"
          id="name"
          pattern="[A-Za-z]+"
          title="Name should not contain numbers or special characters"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />



        <label className={styles.label} htmlFor="email">Email:</label>
        <input
        className={styles.inputField}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email ID"
          required
        />

      <label className={styles.label} htmlFor="mobile">Mobile No:</label>
        <input
        className={styles.inputField}
          type="tel"
          id="mobile"
          name="mobile"
          pattern="[0-9]+"
          title="Mobile number must contain only numeric characters"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          required
        />

        
        <label className={styles.label} htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className={styles.inputField}
        >
          <option value="">Please select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        
        <label className={styles.label} htmlFor="country">Country:</label>
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          className={styles.inputField}
          required
        >
          {Object.keys(countries).map((code) => (
            <option key={code} value={code}>
              {countries[code].name}
            </option>
          ))}
        </select>

        <label className={styles.label} htmlFor="password">Password:</label>
        <input
        className={styles.inputField}
          type="password"
          id="password"
          name="password"
          pattern="(?=.*[A-Z]).{8,}"
          title="Password must contain at least 8 characters and at least 1 uppercase letter"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {formData.hobbies.map((hobby, index) => (
          <div key={index} className={styles.hobbyContainer}>
            <label className={styles.label} htmlFor={`hobby-${index}`}>{`Hobby ${index + 1}:`}</label>
            
            <input
            className={styles.inputField}
              type="text"
              id={`hobby-${index}`}
              value={hobby}
              onChange={(e) => handleHobbyChange(index, e.target.value)}
              placeholder="Enter hobby"
              pattern="[a-zA-Z]+"
              title="Should not contain numbers or special characters"
              required
            />
            {index > 0 && (
              <button
                type="button"
                className={styles.button}
                onClick={() => removeHobby(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {formData.hobbies.length < 2 && (
          <button type="button" className={styles.button} onClick={addHobby}>
            Add Hobby
          </button>
        )}
        <button type="submit"   className={styles.button}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Register;