import { useState, useEffect } from 'react';
import './styles.css';
import IconPassword from '../../assets/icon-password.svg';
import IconPasswordOpen from '../../assets/icon-password-open.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { setItem, getItem } from '../../utils/storage';
import { notifyError } from '../../utils/toast';
import bemol_logo from '../../assets/bemol-logo.png'


function Login() {
    const navigate = useNavigate();
    const [tipoSenha, setTipoSenha] = useState(false);
    const [form, setForm] = useState({
        email: '',
        senha: '',
    })

    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/main')
        }
    }, [])

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.email || !form.senha) {
            return notifyError('Informe o email e a senha.')
        }

        try {
            const response = await axios.post('/login', {
                "email": form.email,
                "senha": form.senha
            });

            if (response.status > 204) {
                return notifyError(response.data.mensagem);
            }

            const { usuario, token } = response.data;
            setItem('token', token);
            setItem('name', usuario.nome);
            setItem('email', usuario.email);
            navigate('/main')
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }

    return (
        <div className="signin">
            <div className="left-signin">
                <img src={bemol_logo} alt="" />
            </div>
            <div className="right-signin">
                <div className='formulario'>
                    <h2 className="title-signin">Faça seu login!</h2>
                    <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
                        <label>
                            E-mail
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChangeForm}
                                placeholder="Digite seu e-mail"
                            />
                        </label>

                        <label className="password-signin">
                            Senha
                            <input
                                type={tipoSenha ? 'text' : 'password'}
                                name="senha"
                                value={form.senha}
                                onChange={handleChangeForm}
                                placeholder="Digite sua senha"
                            />
                            <Link to="/login" className="forgot-password">Esqueceu a senha?</Link>
                            <img
                                src={tipoSenha ? IconPasswordOpen : IconPassword}
                                onClick={() => setTipoSenha(!tipoSenha)}
                                alt='icon-password' />
                            <div className="area-button-signin">
                                <button
                                    className="btn-pink-small" onClick={() => handleSubmit()}
                                >Entrar</button>
                            </div>
                        </label>
                    </form>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p >Ainda não possui uma conta? <span className="links"><Link to="/cadastro">Cadastre-se</Link></span></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;