import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Header } from '../../component/Header';
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
          <form className="form-profile" onSubmit={() => {}}>
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
          </form>
        </div>
    </div>
  </div>
  )
}