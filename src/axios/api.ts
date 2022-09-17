import { httpService } from './http-service'
import type { IAddUserInfoParam, IDeleteUserByIdParam, IGetUserListItem, IGetUserListParam, IUpdateUserInfoParam } from './types'

type TObject = Record<string, any>

export function getUserList(param: IGetUserListParam) {
  return httpService.get<IGetUserListItem[]>('/api/v1/getUserList', { params: param })
}

export function addUserInfo(param: IAddUserInfoParam) {
  return httpService.post<TObject>('/api/v1/addUserInfo', param)
}

export function deleteUserById(param: IDeleteUserByIdParam) {
  return httpService.delete<TObject>(`/api/v1/deleteUserById/${param.id}`)
}

export function updateUserInfo(param: IUpdateUserInfoParam) {
  return httpService.post<TObject>('/api/v1/updateUserInfo', param)
}

export function uploadFile(file: any) {
  return httpService.post('/api/v1/upload/images', file)
}
