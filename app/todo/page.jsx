'use client';
import React, { useState, useEffect } from 'react';
import styles from './todo.module.css';
import Modal from './modal/pages';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Todo = () => {

  const router = useRouter();

  useEffect(() => {
    let auth = localStorage.getItem('auth');
    fetchData();
    setFilteredItems(items);

    if(!auth)
    {
              router.push('/login');      
    }
  }, []);


  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clickBtn, setClickBtn] = useState('');
  const [obj, setObj] = useState({});
  let [filteredItems, setFilteredItems] = useState([]); 
  let [items, setItems] = useState([]);
  let [upid, setupid] = useState('');

    
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/gettask');
      setItems(items=response.data);
      setFilteredItems(filteredItems=response.data);

    } catch (error) {
      alert(error.response.data.message)
      console.error('Error fetching data:', error);
    }
  };


  const deleteTask = async(id) =>
  {
    try {
      const response = await axios.delete(`http://localhost:4000/deletetask/${id}`);
       console.log(response.data);
       fetchData();
    } catch (error) {
      alert(error.response.data.message)
      console.error('Error fetching data:', error);
    }
  }


 
  

  

  const openModalN = () => {
    setShowModal(true);
    setClickBtn("Create New");
  };

  const openModalU = (item) => {
    setObj(item);
    setShowModal(true);
    setupid(upid=item.id);
    setClickBtn("Update Todo");
  };

  const closeModal = () => {
    setShowModal(false);
    setClickBtn('');
  };


  const handleFilter = (event) => 
  {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    if(selectedStatus === "Show All Task")
    {
      let newFilteredItems = items;
      setFilteredItems(newFilteredItems);
    }
    else{
      let newFilteredItems = selectedStatus ? items.filter(item => item.status === selectedStatus) : items;
      setFilteredItems(newFilteredItems);
    }
    
  };

  return (
    <div className={styles.listContainer}>
      <h2>List of Items</h2>
      <button onClick={openModalN} className={styles.cb}>Create New</button>
      <label htmlFor="status" className={styles.lab}>Filter By</label>
      <select name="status" id="status" className={styles.input} onChange={handleFilter} value={statusFilter} required>
        <option value="Show All Task">Show All Task</option>
        <option value="in Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>


      <ul className={styles.itemList}>
        {filteredItems.map((item, index) => (
          <li key={index} className={styles.item}>
            <div>
              <strong>Name</strong> {item.name}
            </div>
            <div>
              <strong>Description</strong> {item.description}
            </div>
            <div>
              <strong>Time</strong> {item.time}
            </div>
            <div>
              <strong>Status</strong> {item.status}
            </div>
            <button onClick={() => openModalU(item)} className={styles.ub} >Update Task</button>
            <button onClick={() => deleteTask(item.id)} className={styles.db} >Delete Task</button>
          </li>
        ))}
      </ul>
      {showModal && <Modal closeModal={closeModal} variableProp={clickBtn} currentObj={obj} fetchData={fetchData} id = {upid}/>}
    </div>
  );
};

export default Todo;
