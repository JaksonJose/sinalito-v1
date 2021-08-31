import { Form } from '@unform/web';
import Modal from 'react-modal';
import { Button } from '../../component/Button';
import Input from '../../component/Form/Input.tsx';
import Mask from '../../component/Form/InputMask';
import './profilemodal.scss'

const customStyles = {
  content: {
    margin: 'auto',
    width: '60%',
    height: '100%'
  },
};


export function ProfileModal({isModalOpened} : any){
  const HandleForm = () => {}

  return (
    <Modal isOpen={isModalOpened} style={customStyles}>
      <h1>Preencha os seus dados</h1>
  
      <Form onSubmit={HandleForm}>
        <div className="input-wrapper">
          <Input type="text" name="firstName" label="primeiro nome" />
          <Input type="text" name="lastName" label="ultimo nome" />
        </div>
        <div className="input-wrapper">
          <div className="medium-wrapper">
            <Input type="date" name="bornDate" label="Data de Nascimento" />
          </div>
          <div className="medium-wrapper">
              <Mask name="cpf" mask="999.999.999-99" label="CPF" /> 
          </div>
          <div className="medium-wrapper">
            <Mask name="telephone" mask="(99) 9 9999-9999" label="Telefone" />
          </div>

        </div>
        <div className="input-wrapper">
          <Input type="email" name="email" label="Email" />
          <Input type="email" name="email" label="Confirmar Email" />
        </div>
        <div className="input-wrapper">
          <Input type="text" name="profession" label="Ocupação" />
          <Input type="text" name="company" label="Instituição" />
        </div>
        <div className="input-wrapper">
          <Mask name="CEP" mask="99999-999" label="CEP" />
          <div className="address-wrapper">
             <Input type="text" name="address" label="Endereço" />
          </div>
          <div className="number-wrapper">
            <Input type="number" name="number" label="Numero" />
          </div>
        </div>
        <div className="input-wrapper">
          <select className="medium-wrapper">
            <option value="Uberaba">Cidade</option>
          </select>
          <select>
            <option value="MG">UF</option>
          </select>
        </div>
        <div className="button-wrapper">
          <Button type="submit">Enviar</Button>
        </div>
        
      </Form>
    </Modal>
  )
}