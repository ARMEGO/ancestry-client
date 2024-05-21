import { useState } from "react";
import { styled } from "styled-components";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "../../custom-hooks/useAuth";
import { BASE_URL, Path } from '../../routePath';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LoginContainer = styled.div`
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
`;

/**
 * Accepts username and password
 * @returns login component
 */
function Login() {
	// const dispatch = useAppDispatch();
	const username = useSelector(state => state.user);

	const emptyCredentials = {
		username,
		password: '',
	}

	const [credential, setCredential] = useState(emptyCredentials);

	const { login } = useAuth();

	const handleCredential = (obj) => {
		setCredential({ ...credential, ...obj });
	};

	const handleLogin = async (event) => {
		event.preventDefault(); // prevent form from refreshing page
		const response = await axios.post(BASE_URL + "login", credential);
		if (response.status === 200) {
			await login({ username: credential.username, token: response.data.data.token });
		} else {
			// TODO: show errors
		}
	};

	// detemine if a field is empty
	const isLoginBtn = Object.values(credential).includes('');

	return (
		<LoginContainer>
			<Form onSubmit={handleLogin}>
				<InputText
					autoFocus // set focus when comp is active
					type="text"
					value={credential.username}
					onChange={e => handleCredential({ username: e.target.value })}
					placeholder="Username"
					style={{ marginBottom: "16px" }}
				/>
				<InputText
					type="password"
					value={credential.password}
					onChange={e => handleCredential({ password: e.target.value })}
					placeholder="Password"
					style={{ marginBottom: "16px" }}
				/>
				<ButtonContainer>
					<Link to={Path.CREATE_USER}>Create User</Link>
					<Button label="Log in" type="submit" disabled={isLoginBtn} />
				</ButtonContainer>
			</Form>
		</LoginContainer>
	);
}

export default Login;
