import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const Comments = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
    const [comment, setComment] = useState([]);
    const [allComment, setAllComment] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);

    const getData = async () => {
        let data = await fetch(apiUrl);
        let resp = await data.json();
        setAllComment(resp);
        setComment(resp)
    }
    useEffect(() => {
        getData();
    }, [])
    const showComment = async (id) => {
        console.log(id);
        const data = await fetch(apiUrl + '/' + id);
        const resp = await data.json();
        console.log(resp);
        setSelectedComment(resp);
        const modal = new window.bootstrap.Modal(document.getElementById('commentModal'));
        modal.show();

    }
    const columns = [
        {
            name: '#',
            cell: (row) => (
                <input type="radio" name='r1' onChange={() => showComment(row.id)} />)
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Comment',
            selector: row => row.body,
            sortable: true,
        },
    ];
    const handleChange = (e) => {
        let searchTarget = e.target.value;
        setSearchItem(searchTarget);
        if (searchTarget == '') {
            setComment(allComment);
        }
        else {
            const filteredData = allComment.filter((comment) => (
                comment.email.toLowerCase().includes(searchTarget.toLowerCase())
            ))
            setComment(filteredData);

        }
    }
    return (
        <div className='px-4 py-4'>
            <h2 className='text-center'>Show All Commennts</h2>
            <div>
                <input type="text" name="search" id="" className='form-control' onChange={handleChange} value={searchItem} placeholder='Search Here......' />
                <DataTable
                    columns={columns}
                    data={comment}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    noDataComponent={
                        <div className='py-4 fw-bold text-danger'>
                            ❌ No Data Found
                        </div>
                    }
                />

                <div className="modal fade" id="commentModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Comment Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedComment?.name}</p>
                                <p><strong>Email:</strong> {selectedComment?.email}</p>
                                <p><strong>Comment:</strong> {selectedComment?.body}</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Comments
