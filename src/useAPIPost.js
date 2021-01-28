import { useState, useEffect } from 'react';

const useAPIPost = (url,data) => {

    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    
    useEffect(() => {
        fetch(url,{
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
            if(data.status == 'Success'){
                setIsSuccess(true);
                setError(null);
            }
            else{
                throw Error('could not fetch the data for that resource');
            }
          })
          .catch(err => {
            setError(err.message);
          })
       
    }, [])

    return  { error , isSuccess};
}

export default useAPIPost;