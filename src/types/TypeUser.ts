export type TypeUser = {
  username?: string,
  email?: string,
  password?: string,
  checkPass?: string
}

export type TypeUserResponse = {
  token: string,
  data: {
    username?: string,
    email: string,
    password: string,
    checkPass?: string,
    id?: number
  }
}