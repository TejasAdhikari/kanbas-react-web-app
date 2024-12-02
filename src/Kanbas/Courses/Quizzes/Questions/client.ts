import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const deleteQuestion = async (qustionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${qustionId}`);
    return response.data;
};
export const updateQuestion = async (question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return data;
};

