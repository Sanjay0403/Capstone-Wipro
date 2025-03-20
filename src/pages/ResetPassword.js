import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Please fill in both fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7144/api/auth/reset-password', { token, newPassword });
            setMessage('Password reset successfully! Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.');
        }
    };

    return (
        <Container className="reset-password-container">
            <Card className="reset-password-card">
                <Card.Body>
                    <h2 className="text-center">Reset Your Password</h2>
                    <p className="text-muted text-center">Enter a new password below.</p>
                    
                    {message && <Alert variant="success" className="text-center">{message}</Alert>}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mt-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="reset-password-btn mt-4 w-100">
                            Reset Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ResetPassword;
