import { useState } from 'react';
import UserModal from './UserModal';
import Logo from './blank.webp';

const UserList = ({ userList, loadData }) => {

    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState(null);
    const [operation, setOperation] = useState(null);
    const [error, setError] = useState(null);

    const editUser = (data) => {
        setUserData(data);
        setOperation('Edit');
        setShow(true);
    }

    const deleteUser = (data) => {
        fetch('http://localhost:4000/resource/delete', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: data._id })
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                if (data.status == 'Success') {
                    setError(null);
                    loadData()
                }
                else {
                    throw Error('could not fetch the data for that resource');
                }
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
    }

    const showModal = (showModal) => {
        setShow(showModal);
    }

    const updateUserList = (data) => {
        setShow(false);
        loadData();
    }

    const addUser = () => {
        setOperation('Add');
        setShow(true);
    }

    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <input placeholder="Search (press enter to search)" className="form-control" />
                </div>
                <div className="col-md-6">
                    <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#usermodal" onClick={addUser}> <i className="fas fa-plus"></i> Add User</button>
                </div>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="pointer-tr">Name</th>
                        <th scope="col" className="pointer-tr">Email</th>
                        <th scope="col" className="pointer-tr">Mobile No.</th>
                        <th scope="col" className="pointer-tr">Designation</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user._id}>
                            <td></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobileNo}</td>
                            <td>{user.designation}</td>
                            <td scope="col"><img src={user.image || Logo} height="50" width="50" /></td>
                            <td scope="col float-right"><i className="far fa-edit btn btn-warning" data-toggle="modal" data-target="#usermodal" onClick={() => { editUser(user) }}></i><i className="ml-3 fas fa-trash-alt btn btn-danger" onClick={() => { deleteUser(user) }}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {show && <UserModal userData={userData} show={show} showModal={showModal} updateUserList={updateUserList} operation={operation} />}
        </div>
    )
}

export default UserList;