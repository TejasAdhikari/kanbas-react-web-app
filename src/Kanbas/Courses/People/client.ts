import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const PEOPLE_API = `${REMOTE_SERVER}/api/people`;


export const fetchAllPeople = async (courseId: any) => {
    const response = await axios.get(`${PEOPLE_API}/${courseId}`);
    console.log(response.data);
    return response.data;
};

export const enrollPersonInCourse = async (courseId: string, userId: any) => {
    const response = await axios.post(`${PEOPLE_API}/${courseId}/${userId}`);
    return response.data;
};

export const unenrollPersonFromCourse = async (courseId: any, userId: any) => {
    console.log(userId);
    const response = await axios.delete(`${PEOPLE_API}/${courseId}/${userId}`);
    return response.data;
};
