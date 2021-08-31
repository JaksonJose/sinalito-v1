import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Header } from '../../component/Header';
import { Certification } from '../../component/Certification';

export function Certifications(){
  const [showCertModal, setShowCertModal] = useState<Boolean>();
  const [courseInfo, setCourseInfo] = useState<Object>();

  const ToggleCertificationModal = () => {
    setShowCertModal(!showCertModal) //change true to false...
    setCourseInfo({});
  }
  return (
    <div className="course-container">
      <Header />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr style={{backgroundColor: 'teal', color: 'white'}}>
              <th scope="col">Curso</th>
              <th scope="col">Horas Completadas</th>
              <th scope="col">Certificado</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td data-label="Course">Curso de Libras Básico</td>
                <td data-label="Hours">107</td>
                <td data-label="Certificate">
                    <button className="action" onClick={() => ToggleCertificationModal()}>
                      <FiSearch color='#FFF' size={17} />
                  </button>
                </td>
                <td data-label="#"> </td>
             </tr>
          </tbody>
        </table>
      </div>
      {showCertModal && (
        <Certification Info={courseInfo} isModalOpened={ToggleCertificationModal} />
      )}
    </div>
  )
}