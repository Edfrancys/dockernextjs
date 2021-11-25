import { GetServerSideProps } from "next"
import prisma from "../lib/prisma"


export default function Home({ users }: any) {

  console.log("todos", users);


  return (
    <div>
      {users.map((user: any) => (
        <div key={user.key}>
          {user.name}
          {
            user.enderecos.map((enderecos: any) => (
              <div key={enderecos.key}>
                - {enderecos.rua} <br />
              </div>
            ))
          }

        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const getUsers = await prisma.users.findMany({
    include: {
      enderecos: true
    }
  })

  const users = JSON.parse(JSON.stringify(getUsers))

  return {
    props: { users }
  }
}