import UserList from './userlist';
import useFetch from './useFetch';
import { useState } from 'react';


const Home = () => {
    const [refreshList, setRefreshList] = useState(false);
    console.log(refreshList);
    const { error, isPending, data: userList } = useFetch('http://localhost:4000/resource/getAll?skip=0&sortColumn=name&sortOrder=1&searchText', refreshList)

    const loadData = () => {
        setRefreshList(!refreshList);
    }
    return (
        <div className="container">
            <h1 className='text-center mt-5'>User Management</h1>
            { error && <div>{error}</div>}
            { isPending && <div>Loading...</div>}
            { userList && <UserList userList={userList} loadData={loadData} />}

        </div >
    )
}

export default Home;