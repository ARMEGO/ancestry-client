import { useAuth } from "../custom-hooks/useAuth";
import { styled } from "styled-components";
import { Button } from "primereact/button";
import { Divider } from 'primereact/divider';

const StyledHeader = styled.header`
    max-height: 40px;
    width: 100vw;
    display: flex;
	justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

function Header() {
    const { user, logout } = useAuth();

    return (
        <div>
            <StyledHeader>
                <h1>Ancestry</h1>
                {user && <span><Button onClick={logout}>Logout</Button></span>}
            </StyledHeader>
            <Divider />
        </div>
    )
}

export default Header;