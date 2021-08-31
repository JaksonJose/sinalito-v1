import Modal from 'react-modal';
import Translation from '../../resources/translation.json'
import illustration from '../../assets/images/illustration.svg';
import { useAuth } from '../../hookies/useAuth';
import './certification.scss';

const customStyles = {
  content: {
    margin: 'auto',
    width: '90%',
    height: '90%',
    overflow: 'none',
  },
};


export function Certification({isModalOpened, Info} : any){
  const { user } = useAuth();

  return (
    <Modal isOpen={isModalOpened} style={customStyles} preventScroll={false} 
    onRequestClose={isModalOpened}  shouldCloseOnOverlayClick={true}>
    <div className="certification-container">
      <div className="certificate-wrapper">
        <div className="logo-img">
          <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
          <strong>{Translation['Common.libras-course-online']}</strong>
          <p>Interaja e Receba certificados</p>
        </div>
        <div className="certification-title">        
          <h1>Certificado de Conclusão</h1>
        </div>
        <div className="certification-content">
          <p>Certificamos que:</p>
          <h2>{user?.firstName}</h2>
          <p>concluiu com sucesso o curso online de Libras Básico</p>
          <p>{Translation['Common.TotalHours']} 107 horas</p>
        </div>
        <div className="signature-wrapper">
            <div>
              <p>Juliana Silva</p>
              <span>Coordenadora</span>
            </div>
            <div>
              <p>David de Souza</p>
              <span>Instrutor de Libras</span>
            </div>
        </div>
      </div>
    </div>
    </Modal>
  )
}