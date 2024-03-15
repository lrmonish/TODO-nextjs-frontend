'use client';
import React, { useState } from 'react';
import styles from './modal.module.css';
import axios from 'axios';

 const Modal = ({ closeModal, variableProp, currentObj, fetchData, id }) => {
   
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  let showDiv = false;


  // Optional: Add leading zeros for single-digit values

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  const currentTime = `${formattedHours}:${formattedMinutes}`;
  


    
    
    const [obj, setObj] = useState(currentObj);


    if(variableProp === 'Create New')
    {
       showDiv = false;
    }
    else if(variableProp === 'Update Todo')
    {
      showDiv = true;
    }
    
    let handleChange=(event)=>
    {
        const { name, value } = event.target;
        setObj({     
          ...obj,
          [name]: value,
        });

        
    }

    let handleTask =async (e, variableProp2)=>
    {
      e.preventDefault();
    let test = {
      name:obj.name,
      description:obj.description,
      time:currentTime,
      status:obj.status
    }

      if(variableProp2 === "Create New")
      {
        try {
          const response = await axios.post('http://localhost:4000/task',test);
           fetchData();
           closeModal();
        } catch (error) {
          console.error('Error fetching data:', error);
          alert(error.response.data.message)
        }
      }  

      else
      {
        try {
          const response = await axios.put(`http://localhost:4000/updatetask/${id}`,test);
           fetchData();
           closeModal();
        } catch (error) {
          console.error('Error fetching data:', error);
          alert(error.response.data.message)
        }

      }
    }
   
  return (
    
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{variableProp}</h2>

<form>
        
        <label htmlFor="name" className={styles.lab}>Name</label>
        <input type='text' name='name' className={styles.input} onChange={handleChange} value={obj.name} placeholder='Name' required />
        
        <label htmlFor="description" className={styles.lab} >Description</label>
        
        <input type='text' name='description' className={styles.input} onChange={handleChange} value={obj.description} placeholder='Description' required/>
    
     <div>
      {showDiv && (<div>
     <label htmlFor="status" className={styles.lab} >Status</label>
        <select name="status" id="status" className={styles.input} onChange={handleChange} value={obj.status}>
          <option value="">Please select...</option>
          <option value="in Progress">in Progress</option>
          <option value="Completed">Completed</option>
        </select>

     </div>)}
    </div>


        <button onClick={(e)=>handleTask(e,variableProp)} type='submit' className={styles.closeButton}>{variableProp}</button>
        <button onClick={closeModal} className={styles.alterButton}>Close</button>

        </form>
      </div>
    </div>
  );
};


export default Modal