import { useCallback, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUser } from '../../store/usersSlice';
import axios from 'axios';
import { BASE_URL } from '../../routePath';
import { useLocalStorage } from '../../custom-hooks/useLocalStorage';
import { addErrors } from "../../store/errorsSlice";
import { useAuth } from '../../custom-hooks/useAuth';
import { Avatar } from 'primereact/avatar';
import Image from "../../components/Image";

export default function UserDetails() {
    const users = useSelector(state => state.users);
    const [user] = useLocalStorage("user", null);
    const { logout } = useAuth();

    const dispatch = useDispatch();

    const headers = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    const fetchUsers = useCallback(async () => {
        const response = await axios.get(BASE_URL + "user/all", headers);
        return response;
    }, [])

    useEffect(() => {
        // fetch users from API
        fetchUsers().then(res => {
            if (res.status === 200) dispatch(addUsers(res.data.data));
        }).catch(error => {
            console.error(error);
            dispatch(addErrors({ name: 'Error', message: error.response.data.error, code: error.code }));
            if (error.response.status === 403) logout();
        });
    }, [fetchUsers]); // eslint-disable-line react-hooks/exhaustive-deps

    const updateUserDetail = async ({ firstName, lastName, address, paymentOption }, id) => {
        const newUserData = { firstName, lastName, address, paymentOption };
        const response = await axios.patch(BASE_URL + "user", newUserData, headers);
        if (response.status === 200) {
            dispatch(updateUser({ id, ...newUserData }));
        }
    }

    const onRowEditComplete = (e) => {
        let _users = [...users];
        let { newData, index } = e;
        _users[index] = newData;
        // call update API
        updateUserDetail(newData, newData.id);
    };

    const imageBodyTemplate = (user) => {
        if (user.image) return <Image path={BASE_URL + "images/" + user.image} />;
        else return <Avatar icon="pi pi-user" size="xlarge" />;
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const allowEdit = (rowData) => {
        return rowData;
    };

    return (
        <div className="card p-fluid">
            <DataTable value={users} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="username" header="Username" ></Column>
                <Column field="firstName" header="First Name" editor={(options) => textEditor(options)}></Column>
                <Column field="lastName" header="Last Name" editor={(options) => textEditor(options)}></Column>
                <Column field="address" header="Address" editor={(options) => textEditor(options)}></Column>
                <Column field="paymentOption" header="Payment option"></Column>
                <Column rowEditor={allowEdit} header="Action"></Column>
            </DataTable>
        </div>
    );
}

