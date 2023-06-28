import axios from 'axios';
import queryString from 'query-string';
import { DietaryPlanInterface, DietaryPlanGetQueryInterface } from 'interfaces/dietary-plan';
import { GetQueryInterface } from '../../interfaces';

export const getDietaryPlans = async (query?: DietaryPlanGetQueryInterface) => {
  const response = await axios.get(`/api/dietary-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDietaryPlan = async (dietaryPlan: DietaryPlanInterface) => {
  const response = await axios.post('/api/dietary-plans', dietaryPlan);
  return response.data;
};

export const updateDietaryPlanById = async (id: string, dietaryPlan: DietaryPlanInterface) => {
  const response = await axios.put(`/api/dietary-plans/${id}`, dietaryPlan);
  return response.data;
};

export const getDietaryPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dietary-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDietaryPlanById = async (id: string) => {
  const response = await axios.delete(`/api/dietary-plans/${id}`);
  return response.data;
};
