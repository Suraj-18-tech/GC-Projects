import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Student = {
  id?: string;
  name: string;
  email: string;
};

export const getStudents = () =>
  axios.get(`${API_BASE_URL}/students`);

export const addStudent = (student: Student) =>
  axios.post(`${API_BASE_URL}/students`, student);

export const updateStudent = (id: string, student: Student) =>
  axios.put(`${API_BASE_URL}/students/${id}`, student);

export const deleteStudent = (id: string) =>
  axios.delete(`${API_BASE_URL}/students/${id}`);