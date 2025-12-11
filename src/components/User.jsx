import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const User = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const getData = async () => {
        const data = await fetch(apiUrl);
        const resp = await data.json();
        setFilterUsers(resp)
        setUsers(resp);
    }
    useEffect(() => {
        getData();
    }, []);
    const showUser = async (id) => {
        const data = await fetch(apiUrl + '/' + id);
        const resp = await data.json();
        setSelectedUser(resp);
        const modal = new window.bootstrap.Modal(document.getElementById('userModal'));
        modal.show();
    }
    const columns = [
        {
            name: '#',
            cell: (row) => (
                <input type="radio" name="r1" id="" onChange={() => showUser(row.id)} />
            )
        },
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Address',
            cell: (row) => (
                <>
                    <p>{row.address.street}, {row.address.suite}, {row.address.city}, {row.address.zipcode}</p>
                </>
            ),
        },
        {
            name: 'Phone',
            selector: row => row.phone
        }
    ];
    const handleChange = (e) => {
        const targetValue = e.target.value;
        setSearchValue(targetValue);
        if (targetValue == '') {
            setFilterUsers(users)
        }
        else {
            const filterData = users.filter((user) => (
                user.name.toLowerCase().includes(targetValue.toLowerCase())
            ))
            setFilterUsers(filterData);
        }

    }
    return (
        <div className='px-4 py-4'>
            <h2 className='text-center'>Show all users</h2>
            <div>
                <input type="text" name="r1" id="" placeholder='Search here....' className='form-control' value={searchValue} onChange={handleChange} />
                <DataTable
                    columns={columns}
                    data={filterUsers}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[10, 20, 30]}

                    noDataComponent={
                        <div className='fw-bold text-danger py-4'>
                            ❌ No Data Found
                        </div>
                    }
                />
                <div className="modal fade" id="userModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <p>User Name: {selectedUser?.name}</p>
                                <p>Email: {selectedUser?.email}</p>
                                <p>Address: {selectedUser?.address?.street}, {selectedUser?.address?.suite}, {selectedUser?.address?.city},{selectedUser?.address?.zipcode}</p>
                                <p>{selectedUser?.phone}</p>
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

export default User
