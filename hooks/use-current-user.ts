import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import { User } from "../typings/User"

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User>(null as unknown as User)

  const setUser = (user: User) => {
    const { addr } = user || {}
    const wallet = addr ? `${addr.substring(0,5)}...${addr.substring(addr.length -4, addr.length)}` : null
    setCurrentUser({
      ...user,
      wallet
    })
  }
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  return currentUser as unknown as User
}
