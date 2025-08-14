import { useNavigate, Link } from "react-router-dom"; // ✅ Link added
import { useState } from "react";
import axios from "axios";
import '../css/login.css';
import Container from "react-bootstrap/esm/Container";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5009/login", {
                email,
                pass,
            });

            localStorage.setItem("token", response.data.token);
            alert("Login Successful");
            navigate("/home");
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                alert("Invalid email or password");
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };

    const finalLogin = (e) => {
        e.preventDefault();

        if (!email || !pass) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        if (pass.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        handleLogin();
    };

    return (
        <Container id="login-container" fluid>
            <form id="Form2" onSubmit={finalLogin}>
                <h1 id="log">Login</h1>

                <input
                    id="int"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />

                <input
                    id="int"
                    type="password"
                    name="pass"
                    value={pass}
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <br /><br />

                <input id="sub" type="submit" value="Login" />

                <p id="navigate">Don't have an account? <Link to="/">Sign up here</Link></p>

            </form>
        </Container>
    );
}

export default Login;
