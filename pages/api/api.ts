import useSWR from "swr";
import axios from 'axios'
import { planDetails, plansType } from "./types";

import config from '../../config/config.json'

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(`${config.Api.url}/${url}`);

    return response.data;
  } catch (error) {
    throw new Error('Falha ao buscar os dados.');
  }
};

export function useData(endpoint: string) {
  const { data, error } = useSWR(endpoint, fetcher, {
    refreshInterval: 600000,
  });

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
}

export function useTotalPlanValues(): {
  data: {
    sixMonthsEarnings: string,
    twelveMonthsEarnings: string,
    plans: plansType[]
  };
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useData(config.Api.endpoints.plansDetails);

  if (isLoading) {
    return {
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  if (isError) {
    return {
      data: null,
      isLoading: false,
      isError: true,
    };
  }

  const { twelveMonthsEarnings, sixMonthsEarnings } = fetchTotalPlanValues(data);
  const { plans } = data.res
  return {
    data: {
      sixMonthsEarnings: formatCurrencyBRL(sixMonthsEarnings),
      twelveMonthsEarnings: formatCurrencyBRL(twelveMonthsEarnings),
      plans
    },
    isLoading: false,
    isError: false,
  };
}

function fetchTotalPlanValues(data: planDetails): {
  sixMonthsEarnings: number,
  twelveMonthsEarnings: number
} {

  const { plans } = data.res

  const plansValues = {
    sixMonthsEarnings: 0,
    twelveMonthsEarnings: 0,
  }
  const { planCost } = config.Api

  for (const plan of plans) {
    const planName = plan.description.toLowerCase()
    if (plan.totalRaw) {
      plansValues.sixMonthsEarnings += plan.totalRaw * planCost[planName] * 6
      plansValues.twelveMonthsEarnings += plan.totalRaw * planCost[planName] * 12
    }
  }

  return plansValues
}

export function formatCurrencyBRL(number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(number);
}