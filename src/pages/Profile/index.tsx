import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Header } from '../../component/Header';
import { Input } from '../../component/Form/Input.tsx';
import { Mask } from '../../component/Form/InputMask';
import { Button } from '../../component/Button';
import avatar from '../../assets/images/avatar.png';
import './profile.scss';


type AvatarType = {
    avatarURL: any | undefined;
}

export function Profile(){
  const [avatarURL, setAvatarURL] = useState<AvatarType>();
  
  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="content">
          <Form className="form-profile" onSubmit={() => {}}>
            <div className="photo-container">
              <label className="label-avatar">
                <span>
                  <FiUpload color="#FFF" size={25} />
                </span>
                <input type="file" accept="image/*" onChange={() => {}} /><br/>
                { avatarURL === null ?
                <img src={avatar} alt="foto de perfil do usuario" />
                :
                <img src={avatar} alt="foto de perfil do usuario" />
                }
              </label>

              <div className="button-wrapper button-wrapper-aside">
                <Button type="submit">Editar Perfil</Button>
              </div>
            </div>

            <div className="input-container">
              <h3>Minhas Informações</h3>
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
              <div className="button-wrapper button-wrapper-end">
                <Button type="submit">Salvar Atlerações</Button>
              </div>
            </div>
          </Form>
        </div>
    </div>
  </div>
  )
}