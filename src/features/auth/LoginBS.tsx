import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import type { RootState, AppDispatch } from '../../store';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import api from '../../api/axios';

export default function LoginBS() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const { data: users } = await api.get(`/users?email=${email}`);
      if (users.length === 0 || users[0].password !== password) {
        dispatch(loginFailure('Email ou mot de passe incorrect'));
        return;
      }
      const { password: _, ...user } = users[0];
      const fakeToken = btoa(
        JSON.stringify({
          userId: user.id,
          email: user.email,
          role: 'admin',
          exp: Date.now() + 3600000,
        })
      );
      dispatch(loginSuccess({ user, token: fakeToken }));
      navigate('/dashboard', { replace: true });
    } catch {
      dispatch(loginFailure('Erreur serveur'));
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height:'100vh', backgroundColor:'#f0f0f0' }}>
      <Card style={{ maxWidth: 400, width: '100%', padding: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Card.Body className="d-flex flex-column gap-3">
          <Card.Title className="text-center fw-bold fs-3" style={{ color: '#1B8C3E' }}>TaskFlow</Card.Title>
          <p className="text-center text-secondary mb-0">Connectez-vous pour continuer</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mot de passe" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              className="w-100 border-0" 
              disabled={loading}
              style={{ backgroundColor: '#1B8C3E' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
