export interface iGetProfileResponse {
  Id: string
  Firstname: string
  Lastname: string
  Email: string
  Username: string
  Institution?: string | null
  IsAdmin: boolean
}
