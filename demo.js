import React, { useState, useEffect } from 'react';
import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const fetchData = async (studentIds) => {
    const studentPromises = studentIds.map((studentId) => fetchStudentData(studentId));

    try {
      const fetchedStudentsData = await Promise.all(studentPromises);
      setStudentsData(fetchedStudentsData);

      const schoolIds = fetchedStudentsData.map((studentData) => studentData.schoolId);
      const legalguardianIds = fetchedStudentsData.map((studentData) => studentData.legalguardianId);

      const schoolPromises = schoolIds.map((schoolId) => fetchSchoolData(schoolId));
      const legalguardianPromises = legalguardianIds.map((legalguardianId) =>
        fetchLegalguardianData(legalguardianId)
      );

      const fetchedSchoolsData = await Promise.all(schoolPromises);
      setSchoolsData(fetchedSchoolsData);

      const fetchedLegalguardiansData = await Promise.all(legalguardianPromises);
      setLegalguardiansData(fetchedLegalguardiansData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onStudentsPick = (studentIds) => {
    fetchData(studentIds);
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default StudentsDataComponent;
