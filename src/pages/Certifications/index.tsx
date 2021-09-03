import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Header } from '../../component/Header';
import { Certification } from '../../component/Certification';
import Translation from '../../resources/translation.json';

export function Certifications(){
  const [showCertModal, setShowCertModal] = useState<Boolean>();
  const [courseInfo, setCourseInfo] = useState({});

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
              <th scope="col">{Translation['Cerfifications.Course']}</th>
              <th scope="col">{Translation['Cerfifications.Completed-Hours']}</th>
              <th scope="col">{Translation['Cerfifications.Certificates']}</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td data-label={Translation['Cerfifications.Course']}>Curso de Libras Básico</td>
                <td data-label={Translation['Cerfifications.Completed-Hours']}>107</td>
                <td data-label={Translation['Cerfifications.Certificates']}>
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
        <Certification content={courseInfo} isModalOpened={ToggleCertificationModal} />
      )}
    </div>
  )
}