import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const Post = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const [posts, setPosts] = useState([]);
    const [allPost, setAllPost] = useState([]);
    const [filterText, setFilterText] = useState('');

    const getData = async () => {
        try {
            const data = await fetch(apiUrl);
            const resp = await data.json();
            setPosts(resp);
            setAllPost(resp);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.body,
            sortable: true,
        },
    ];
    const handleChange = (e) => {
        let searchedData = e.target.value;
        setFilterText(searchedData);
        if (searchedData == '') {
            setPosts(allPost);
        }
        else {
            const filteredData = allPost.filter((post) => (
                post.title.toLowerCase().includes(searchedData.toLowerCase())
            ))
            setPosts(filteredData);
        }
    }
    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold">📄 All Posts</h2>
            <div className="table-responsive shadow-lg rounded-3">
                <input type="text" name="searchData" id="" placeholder='Search here.....' className='form-control' onChange={handleChange} value={filterText} />
                <DataTable columns={columns} data={posts} pagination paginationPerPage={10} paginationRowsPerPageOptions={[10, 20, 30]}
                    noDataComponent={
                        <div className="py-4 fw-bold text-danger">
                            ❌ No Data Found
                        </div>
                    }
                />
                
            </div>
        </div>
    );
};

export default Post;
