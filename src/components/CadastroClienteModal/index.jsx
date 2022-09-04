import './style.css'
import clientsIcon from '../../assets/clients.svg'
import { useState } from 'react'
import axios from '../../services/axios'
import { notifyError, notifySucess } from '../../utils/toast';
import MaskedInput from '../../utils/MaskedInput'
import { useNavigate } from 'react-router-dom';
import IconPassword from '../../assets/icon-password.svg';
import IconPasswordOpen from '../../assets/icon-password-open.svg'

function CadastroClienteModal({ setCadastroFeito }) {
    const [typePassword, setTypePassword] = useState(false);
    const [typeConfPassword, setTypeConfPassword] = useState(false);

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        telefone: '',
        rua: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        estado: '',
        senha: '',
        confSenha: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.name || !form.email || !form.cpf || !form.telefone || !form.senha) {
            return notifyError('Informe todos os campos obrigatórios.');
        }

        if (form.senha !== form.confSenha) {
            return notifyError('Senhas não conferem.')
        }

        if (form.cpf.length !== 11) {
            return notifyError('Informe um CPF de tamanho válido. Ex: "11122233345"');
        }

        if (form.cep && form.cep.length !== 8) {
            return notifyError('Digite um CEP válido! Ex: "55544489"');
        }

        if (form.telefone.length !== 11) {
            return notifyError('Informe seu número com DDD Ex: "99999999999".');
        }

        try {
            await axios.post('/cadastro',
                {
                    nome: form.name,
                    email: form.email,
                    cpf: form.cpf,
                    telefone: form.telefone,
                    rua: form.rua,
                    complemento: form.complemento,
                    cep: form.cep,
                    bairro: form.bairro,
                    cidade: form.cidade,
                    estado: form.estado,
                    senha: form.senha
                }
            )

            setCadastroFeito(true)
            return notifySucess('Cliente registrado com sucesso!');
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }

    }

    async function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleCep() {

        try {
            if (form.cep.length === 8) {
                const resposta = await fetch(
                    `https://viacep.com.br/ws/${form.cep}/json/`
                );
                await resposta.json().then((data) => {

                    if (data.erro) {
                        return notifyError('Informe um CEP válido.');
                    }
                    setForm({
                        ...form,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                        rua: data.logradouro
                    })
                })
            }

        } catch (error) {
            return notifyError('Digite um CEP válido.');
        }
    }

    function handleChangeCep(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className='container-cadastro'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='register-client-header'>
                    <img src={clientsIcon} alt='clientsIcon' />
                    <h1 style={{ color: 'white' }}>Cadastre-se</h1>
                </div>


                <label for='name'>Nome*</label>
                <input
                    id='name'
                    name='name'
                    placeholder='Digite o nome'
                    onChange={handleChangeInput}
                    value={form.name}
                />
                <label for='email'>E-mail*</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Digite o e-mail'
                    onChange={handleChangeInput}
                    value={form.email}
                />
                <div className='cpf-telefone'>
                    <div className='cpf'>
                        <label>CPF*</label>
                        <MaskedInput
                            name='cpf'
                            mask='999.999.999-99'
                            value={form.cpf}
                            onChange={handleChangeInput}
                            placeholder='Digite seu CPF'
                        />
                    </div>
                    <div className='telefone'>
                        <label id='telefone'>Telefone*</label>
                        <MaskedInput
                            name='telefone'
                            mask='(99)9.9999-9999'
                            value={form.telefone}
                            onChange={handleChangeInput}
                            placeholder='Digite seu telefone'
                        />
                    </div>
                </div>
                <label for='rua'>Endereço</label>
                <input
                    id='rua'
                    name='rua'
                    placeholder='Digite o endereço'
                    onChange={handleChangeInput}
                    value={form.rua}
                />
                <label for='complemento'>Complemento</label>
                <input
                    id='complemento'
                    name='complemento'
                    placeholder='Digite o complemento'
                    onChange={handleChangeInput}
                    value={form.complemento}
                />
                <div className='cep-bairro'>
                    <div className='cep'>
                        <label for='cep'>CEP</label>
                        <input
                            id='cep'
                            name='cep'
                            type='number'
                            placeholder='Digite o CEP'
                            onChange={handleChangeCep}
                            value={form.cep}
                            onKeyUp={handleCep}
                        />
                    </div>
                    <div className='bairro'>
                        <label for='bairro'>Bairro</label>
                        <input
                            id='bairro'
                            name='bairro'
                            placeholder='Digite o bairro'
                            onChange={handleChangeInput}
                            value={form.bairro}
                        />
                    </div>
                </div>
                <div className='cidade-estado'>
                    <div className='cidade'>
                        <label for='cidade'>Cidade</label>
                        <input
                            id='cidade'
                            name='cidade'
                            placeholder='Digite a cidade'
                            onChange={handleChangeInput}
                            value={form.cidade}
                        />
                    </div>
                    <div className='estado'>
                        <label for='estado' id='estado'>UF</label>
                        <input
                            id='estado'
                            name='estado'
                            placeholder='Digite a UF'
                            onChange={handleChangeInput}
                            value={form.estado}
                        />
                    </div>
                </div>
                <div className='senha'>
                    <div>

                        <label id='senha'>Senha</label>
                        <input
                            id='senha'
                            name='senha'
                            placeholder='Digite a Senha'
                            onChange={handleChangeInput}
                            value={form.senha}
                            type={typePassword ? 'text' : 'password'}
                        />
                    </div>
                    <div>
                        <label id='senha' for='confSenha'>Repita a Senha</label>
                        <input
                            id='senha'
                            name='confSenha'
                            placeholder='Digite a Senha'
                            onChange={handleChangeInput}
                            value={form.confSenha}
                            type={typeConfPassword ? 'text' : 'password'}

                        />
                        <img
                            className='senha1'
                            src={typePassword ? IconPasswordOpen : IconPassword}
                            onClick={() => setTypePassword(!typePassword)}
                            alt='icon-password' />
                        <img
                            className='senha2'
                            src={typeConfPassword ? IconPasswordOpen : IconPassword}
                            onClick={() => setTypeConfPassword(!typeConfPassword)}
                            alt='icon-password' />

                    </div>
                </div>
                <div className='botoes'>
                    <button className='btn-aplicar'>Cadastrar</button>
                    <span style={{ cursor: 'pointer', color: 'white' }} onClick={() => navigate('/login')}>Já tenho uma <span style={{ color: '#E12622', fontWeight: 'bold' }}>conta</span></span>
                </div>
            </form>
        </div>
    )
}

export default CadastroClienteModal