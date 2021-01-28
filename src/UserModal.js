import { useState } from 'react';

const UserModal = ({ userData, show, showModal, updateUserList, operation }) => {

    const [id, setId] = useState(userData ? userData._id : '');
    const [name, setName] = useState(userData ? userData.name : '');
    const [email, setEmail] = useState(userData ? userData.email : '');
    const [mobileNo, setMobileNo] = useState(userData ? userData.mobileNo : '');
    const [designation, setDesignation] = useState(userData ? userData.designation : ''); 
    const [error, setError] = useState(false);

    const addorupdateUser = (operation) => {
        const user = operation == 'Edit' ? {id,name,email,mobileNo,designation} : {name,email,mobileNo,designation};
        const url = operation == 'Edit' ? 'http://localhost:4000/resource/update' : 'http://localhost:4000/resource/add'; 

        //const { error, isSuccess } = useAPIPost('http://localhost:4000/resource/update', user);
        fetch(url,{
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify(user)
        })
        .then((res) => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data)=>{
            if(data.status == 'Success'){
                setError(null);
                updateUserList()
            }
            else{
                throw Error('could not fetch the data for that resource');
            }
        })
        .catch(err => {
            console.log(err);
            setError(err.message);
        })
    }

    return show ? (
        <div className="modal" id="usermodal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{operation} User</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => showModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="form-group" >
                            <label className="col-form-label">Name:</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                         </div>
                        <div className="form-group">
                            <label className="col-form-label">Email:</label>
                            <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Mobile No:</label>
                            <input type="text" className="form-control" value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Designation:</label>
                            <input type="text" className="form-control" value={designation} onChange={(e)=>{setDesignation(e.target.value)}}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => showModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {addorupdateUser(operation)}}>{operation} User</button>
                    </div>
                    {error && <p className="text-center text-danger">{error}</p>}
                </div>
            </div>
        </div>
    )
    : null
}

export default UserModal;