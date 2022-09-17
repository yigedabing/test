export interface IGetUserListParam {
  userId: string
}
export interface IGetUserListItem {
  userId: string
  id: string
  name: string
  age: number
}

export interface IAddUserInfoParam extends Omit<IGetUserListItem, 'id'> {}

export interface IDeleteUserByIdParam extends Pick<IGetUserListItem, 'id'> {}

export interface IUpdateUserInfoParam extends Pick<IGetUserListItem, 'age' | 'name'> {}
