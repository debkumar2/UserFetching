import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const Todo = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const [allTodos, setAllTodos] = useState([]);
    const [filterTodo, setFilterTodo] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const getData = async () => {
        const data = await fetch(apiUrl);
        const resp = await data.json();
        setAllTodos(resp);
        setFilterTodo(resp);
    }
    useEffect(() => {
        getData();
    }, []);
    const showTodo = async (id) => {
        const data = await fetch(apiUrl + '/' + id);
        const resp = await data.json();
        setSelectedTodo(resp);
        const modal = new window.bootstrap.Modal(document.getElementById('todoModal'));
        modal.show();
    }
    const columns = [
        {
            name: '#',
            cell: (row) => (
                <input type="radio" name="r1" id="" onChange={() => showTodo(row.id)} />
            )
        },
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Completed',
            selector: row => row.completed ? 'Yes' : 'No',
        },
    ];
    const handleChange = (e) => {
        const dataSearch = e.target.value;
        setSearchValue(dataSearch);
        if (dataSearch == '') {
            setFilterTodo(allTodos);
        }
        else {
            const filterData = allTodos.filter((item) => (
                item.title.toLowerCase().includes(dataSearch.toLowerCase())
            ))
            setFilterTodo(filterData);
        }
    }
    return (
        <div className='p-4'>
            <h2 className='text-center'>Show all todos</h2>
            <input type="text" name="" id="" placeholder='Search here....' value={searchValue} onChange={handleChange} className='form-control' />
            <DataTable
                columns={columns}
                data={filterTodo}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                noDataComponent={
                    <div className='fw-bold py-4 text-danger'>
                        ❌ No Data Found
                    </div>
                }
            />
            <div className="modal fade" id="todoModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Todo Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <p><strong>Todo:</strong> {selectedTodo?.title}</p>
                            <p><strong>Completed:</strong> {selectedTodo?.completed ? 'Yes': 'No'}</p>
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
    )
}

export default Todo
