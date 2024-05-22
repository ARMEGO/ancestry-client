
import { useState } from "react";
import { styled } from "styled-components";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";
import { BASE_URL, Path } from '../../routePath';
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from '../../store/authUserSlice';
import axios from "axios";
import { useAuth } from "../../custom-hooks/useAuth";
import Image from "../../components/Image";

const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const Form = styled.form`
	margin: auto;
	display: flex;
	flex-direction: column;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
    margin-top: 24px;
`;

const emptyUser = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    address: '',
    paymentOption: '',
}

const marginBtm16px = { marginBottom: "16px" };

const headers = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    }
}

/**
 * Accepts user detail
 * @returns CreateUser component
 */
function CreateUser() {
    const [user, setUser] = useState(emptyUser);
    const [usernameExists, setUsernameExists] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [image, setImage] = useState(null);

    const common = useSelector(state => state.common);
    const { login } = useAuth();

    const dispatch = useDispatch();

    const handleUser = (obj) => {
        // check password confirmation
        if (obj.hasOwnProperty('confirmPassword')) {
            // enable password mismatch error
            setPasswordMismatch(obj.confirmPassword !== user.password);
        } else setUser({ ...user, ...obj });
    };

    const handleUsernameCheck = async () => {
        // call API to check username
        const response = await axios.post(BASE_URL + "username-exists", { username: user.username });
        console.log(response);
        if (response.status === 200) {
            const status = response.data.status;
            setUsernameExists(status);
            if (status) dispatch(setAuthUser({ username: user.username, token: null }));
        }
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        handleUser({ image: img.data.name });
        setImage(img);
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', image.data);
        await axios.post(BASE_URL + "image", formData, headers);
    }

    const createUser = async (event) => {
        event.preventDefault(); // prevent form from refreshing page
        // upload image if available
        if (image) {
            uploadImage();
        }
        const response = await axios.post(BASE_URL + 'signup', user);
        if (response.status === 200) {
            // save user and token
            const { token } = response.data.data;
            dispatch(setAuthUser({ username: user.username, token }));
            await login({ username: user.username, token });
        }
    };

    // disable button based on below conditions
    const isCreateUserBtn = Object.values(user).includes('') || usernameExists || passwordMismatch;

    return (
        <Container>
            <Form onSubmit={createUser} encType="multipart/form-data">
                <div className="card flex justify-content-center" style={marginBtm16px}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                {image && <Image path={image.preview} />}
                <InputText
                    autoFocus // set focus when comp is active
                    type="text"
                    value={user.username}
                    onChange={e => handleUser({ username: e.target.value })}
                    onBlur={handleUsernameCheck}
                    placeholder="Username"
                    style={marginBtm16px}
                />
                {usernameExists && <span style={marginBtm16px}>Username already exists. <Link to={Path.LOGIN}>Log in</Link></span>}
                <InputText
                    type="text"
                    value={user.firstName}
                    onChange={e => handleUser({ firstName: e.target.value })}
                    placeholder="First name"
                    style={marginBtm16px}
                />
                <InputText
                    type="text"
                    value={user.lastName}
                    onChange={e => handleUser({ lastName: e.target.value })}
                    placeholder="Last name"
                    style={marginBtm16px}
                />

                <Dropdown
                    value={user.address}
                    onChange={(e) => handleUser({ address: e.value })}
                    options={common.cities}
                    optionLabel={option => option}
                    optionValue={option => option}
                    placeholder="Select a City"
                    className="w-full md:w-14rem"
                    style={marginBtm16px}
                />

                <Dropdown
                    value={user.paymentOption}
                    onChange={(e) => handleUser({ paymentOption: e.value })}
                    options={common.paymentOptions}
                    optionLabel={option => option}
                    optionValue={option => option}
                    placeholder="Select a payment option"
                    className="w-full md:w-14rem"
                    style={marginBtm16px}
                />

                <InputText
                    type="password"
                    value={user.password}
                    onChange={e => handleUser({ password: e.target.value })}
                    placeholder="Password"
                    style={marginBtm16px}
                    invalid={passwordMismatch}
                />
                <InputText
                    type="password"
                    value={user.confirmPassword}
                    onChange={e => handleUser({ confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    invalid={passwordMismatch}
                    aria-describedby="password-help"
                />
                {passwordMismatch && <small id="password-help">Passwords do not match.</small>}
                <ButtonContainer>
                    <Link to={Path.LOGIN}>Log in</Link>
                    <Button label="Create user" type="submit" disabled={isCreateUserBtn} />
                </ButtonContainer>
            </Form>
        </Container>
    );
}

export default CreateUser;
