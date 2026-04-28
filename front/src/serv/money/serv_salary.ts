import type { MSalaryType, MSalaryTypeCreate, MSalaryTypeQuery, MSalaryTypeUpdate } from "@/app/zodsys/money/zod_money_salary_type";
import { bkd } from "@/tool/http/http";
import net_tool from "@/tool/http/net_tool";

//
export const serv_money_salary_type_pag = 
async (params: MSalaryTypeQuery): Promise<IPage<MSalaryType>> => {
  const src: NET_RES = await bkd.get('salary_type', null, params);
  return net_tool.ser_result_ipages(src, params)
}
export const serv_money_salary_type_add = 
async (data: MSalaryTypeCreate): Promise<MSalaryType> => {
  const src: NET_RES = await bkd.pos('salary_type', null, data)
  return net_tool.ser_result_T(src)
}
export const serv_money_salary_type_upd = 
async (id: string, data: MSalaryTypeUpdate): Promise<MSalaryType> => {
  const src: NET_RES = await bkd.put('salary_type', id, data)
  return net_tool.ser_result_T(src)
}
export const serv_money_salary_type_del = 
async (id: string): Promise<MSalaryType> => {
  const src: NET_RES = await bkd.del('salary_type', id, { })
  return net_tool.ser_result_T(src)
}
