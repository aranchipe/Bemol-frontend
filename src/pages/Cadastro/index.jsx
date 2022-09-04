import './style.css'
import CadastroClienteModal from '../../components/CadastroClienteModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [cadastroFeito, setCadastroFeito] = useState(false)
    const navigate = useNavigate()
    return (
        <div className='container-signup'>
            <div className='signup-left'>
                {!cadastroFeito ? <CadastroClienteModal setCadastroFeito={setCadastroFeito} /> :
                    <div>
                        <h1>Seja bem vindo!</h1>
                        <h2 style={{ cursor: 'pointer', color: '#00A1E5' }} onClick={() => navigate('/login')}>Fazer Login</h2>
                    </div>
                }

            </div>

            <div className='signup-right'>

            </div>
        </div>
    )
}

export default Cadastro