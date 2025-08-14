import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import '../css/signup.css';
import Container from "react-bootstrap/esm/Container";

function SignUp() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const finalSubmit = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !email || !pass) {
            alert("Please fill out all details.");
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            alert("Mobile must be exactly 10 digits.");
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

        const userData = { name, mobile, email, pass };

        try {
            await axios.post("http://localhost:5009/coffeesignupdata", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("User Data Passed");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Error. Please Try Again");
        }
    };

    return (
        <Container id="signup-container" fluid>
            <form id="Form1" onSubmit={finalSubmit}>
                <h1 id="sin">Sign Up</h1>
                <h6 id="cap">Kindly Fill The Details</h6>

                <input
                    id="inp1"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <input
                    id="inp2"
                    type="tel"
                    name="mobile"
                    value={mobile}
                    placeholder="Mobile"
                    onChange={(e) => setMobile(e.target.value)}
                />
                <br /><br />

                <input
                    id="inp2"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />

                <input
                    id="inp2"
                    type="password"
                    name="pass"
                    value={pass}
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <br /><br />

                <input id="sign" type="submit" value="SUBMIT" />

                <p id="navigate">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </Container>
    );
}

export default SignUp;
